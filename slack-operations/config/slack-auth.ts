import { WebClient } from "@slack/web-api";
const CONFIGURATION = require('./status-config');
require('dotenv').config();

const AuthService = {
	getSlackClientInstance: async ({ slackKey }: LoginParameters) => {
		const authKey = slackKey || CONFIGURATION.AUTH_KEY || process.env.SLACK_KEY;
		const web: WebClient = new WebClient(authKey);
		const profileInfo = await web.users.profile.get();
		if (profileInfo.ok) return web;
	}
};

export default AuthService;

interface LoginParameters {
	slackKey?: string;
};