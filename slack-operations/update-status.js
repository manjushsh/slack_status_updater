import moment from 'moment';
import CONFIGURATION from './config/status-config';
import AuthService from './config/slack-auth';

const slackOperations = async () => {

    const web = await AuthService.getSlackClientInstance({ slackKey: process.env.SLACK_KEY });
    const durationTimestamp = moment().add(CONFIGURATION.STATUS.DURATION || 5, 'minutes').unix();

    const profileInfo = await web.users.profile.get();

    if (CONFIGURATION.STATUS.isAway) {
        updatePresence({ type: 'away', web });
    }

    const profileStatusUpdate = await web.users.profile.set({
        ...profileInfo,
        profile: {
            ...profileInfo.profile,
            status_text: CONFIGURATION.STATUS.MESSAGE || "AFK",
            status_emoji: CONFIGURATION.STATUS.SLACK_EMOJI || ":afk:",
            status_expiration: durationTimestamp || 0,
        },
    })
        .catch(err => console.warn("Caught Error - Details: ", err));
    if (profileStatusUpdate?.ok) console.log('Updated your status.');
}

const updatePresence = async ({ type = "auto", web }) => {
    const userPresence = await web.users.getPresence();
    const setAway = await web.users.setPresence({ ...userPresence, presence: type });
    if (setAway.ok) console.log(`Your presence set to ${type}.`);
};

// min and max included
// const randomIntFromInterval = (min = 0, max = 1) => Math.floor(Math.random() * (max - min + 1) + min);

const _init = async () => {
    while (true) {
        const duration = CONFIGURATION.STATUS.DURATION - (CONFIGURATION.STATUS.DURATION * 0.4);
        const interval = duration * 60 * 1000 || 300000;
        slackOperations();
        await new Promise(resolve => setTimeout(resolve, interval));
    };
};

export default _init;


// Presence

// presence: 'active',
//   online: true,
//   auto_away: false,
//   manual_away: false,
//   connection_count: 1,
//   last_activity: 1654263244,