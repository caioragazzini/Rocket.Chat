import type { ReactElement } from 'react';
import React from 'react';

import { useRoomToolbox } from '../../contexts/RoomToolboxContext';
import Thread from './Thread';
import ThreadList from './ThreadList';

const Threads = (): ReactElement => {
	const { context: tmid } = useRoomToolbox();

	if (tmid) {
		return <Thread tmid={tmid} />;
	}

	return <ThreadList />;
};

export default Threads;
