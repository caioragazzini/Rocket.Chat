import { settingsRegistry } from '../../app/settings/server';

export const createTroubleshootSettings = () => {
	
	settingsRegistry.add('Troubleshoot_Disable_Notifications', false, {
		type: 'boolean',
		i18nDescription: 'Troubleshoot_Disable_Notifications_Alert',
	});

	
	settingsRegistry.add('Presence_broadcast_disabled', false, {
		type: 'boolean',
		public: true,
		readonly: true,
	});

	
	settingsRegistry.add('Troubleshoot_Disable_Presence_Broadcast', false, {
		type: 'boolean',
		i18nDescription: 'Troubleshoot_Disable_Presence_Broadcast_Alert',
		enableQuery: { _id: 'Presence_broadcast_disabled', value: false },
	});

	
	settingsRegistry.add('Troubleshoot_Disable_Instance_Broadcast', false, {
		type: 'boolean',
		i18nDescription: 'Troubleshoot_Disable_Instance_Broadcast_Alert',
	});
	settingsRegistry.add('Troubleshoot_Disable_Sessions_Monitor', false, {
		type: 'boolean',
		i18nDescription: 'Troubleshoot_Disable_Sessions_Monitor_Alert',
	});
	settingsRegistry.add('Troubleshoot_Disable_Livechat_Activity_Monitor', false, {
		type: 'boolean',
		i18nDescription: 'Troubleshoot_Disable_Livechat_Activity_Monitor_Alert',
	});
	settingsRegistry.add('Troubleshoot_Disable_Statistics_Generator', false, {
		type: 'boolean',
		i18nDescription: 'Troubleshoot_Disable_Statistics_Generator_Alert',
	});
	settingsRegistry.add('Troubleshoot_Disable_Data_Exporter_Processor', false, {
		type: 'boolean',
		i18nDescription: 'Troubleshoot_Disable_Data_Exporter_Processor_Alert',
	});
	settingsRegistry.add('Troubleshoot_Disable_Workspace_Sync', false, {
		type: 'boolean',
		i18nDescription: 'Troubleshoot_Disable_Workspace_Sync_Alert',
	});
};
