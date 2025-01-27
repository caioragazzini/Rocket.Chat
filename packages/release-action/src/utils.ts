import { readFile, writeFile } from 'fs/promises';
import path from 'path';

import mdastToString from 'mdast-util-to-string';
import remarkParse from 'remark-parse';
import remarkStringify from 'remark-stringify';
import unified from 'unified';

export const BumpLevels = {
	dep: 0,
	patch: 1,
	minor: 2,
	major: 3,
} as const;

export function getChangelogEntry(changelog: string, version: string) {
	const ast = unified().use(remarkParse).parse(changelog);

	let highestLevel: number = BumpLevels.dep;

	const nodes = (ast as any).children as Array<any>;
	let headingStartInfo:
		| {
				index: number;
				depth: number;
		  }
		| undefined;
	let endIndex: number | undefined;

	for (let i = 0; i < nodes.length; i++) {
		const node = nodes[i];
		if (node.type === 'heading') {
			const stringified: string = mdastToString(node);
			const match = stringified.toLowerCase().match(/(major|minor|patch)/);
			if (match !== null) {
				const level = BumpLevels[match[0] as 'major' | 'minor' | 'patch'];
				highestLevel = Math.max(level, highestLevel);
			}
			if (headingStartInfo === undefined && stringified === version) {
				headingStartInfo = {
					index: i,
					depth: node.depth,
				};
				continue;
			}
			if (endIndex === undefined && headingStartInfo !== undefined && headingStartInfo.depth === node.depth) {
				endIndex = i;
				break;
			}
		}
	}
	if (headingStartInfo) {
		(ast as any).children = ((ast as any).children as any).slice(headingStartInfo.index + 1, endIndex);
	}
	return {
		content: unified().use(remarkStringify).stringify(ast),
		highestLevel,
	};
}

export async function readPackageJson(cwd: string) {
	const filePath = path.resolve(cwd, 'package.json');
	return JSON.parse(await readFile(filePath, 'utf-8'));
}

async function getUpdateFilesList(cwd: string): Promise<string[]> {
	const file = await readPackageJson(cwd);
	if (!file.houston) {
		return [];
	}
	const { houston } = file;

	if (!houston.updateFiles) {
		return [];
	}

	return houston.updateFiles;
}

export async function bumpFileVersions(cwd: string, oldVersion: string, newVersion: string) {
	const files = await getUpdateFilesList(cwd);

	await Promise.all(
		files.map(async (file) => {
			const filePath = path.join(cwd, file);

			const data = await readFile(filePath, 'utf8');

			await writeFile(filePath, data.replace(oldVersion, newVersion), 'utf8');
		}),
	);
}
