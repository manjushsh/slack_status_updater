const { WebClient } = require('@slack/web-api');
const CONFIGURATION = require('./status-config');
require('dotenv').config();

const slackOperations = async () => {
	const authKey = CONFIGURATION.AUTH_KEY;
	const web = new WebClient(authKey);
	const miliseconds = new Date();
	const newMiliseconds = miliseconds + (CONFIGURATION.STATUS.DURATION * 60 * 1000);
	const profileInfo = await web.users.profile.get();
	const profileStatusUpdate = await web.users.profile.set({
		...profileInfo,
		profile: {
			...profileInfo.profile,
			status_text: CONFIGURATION.STATUS.MESSAGE || "AFK",
			status_emoji: CONFIGURATION.STATUS.SLACK_EMOJI || ":afk:",
			status_expiration: newMiliseconds || 0,
		},
	})
		.catch(err => console.warn("Caught Error - Details: ", err));
}

const _init = async () => {
	console.warn('Slack Key ', process.env.SLACK_KEY);
};

_init();