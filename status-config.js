module.exports = {
    AUTH_KEY: process.env.SLACK_KEY,
    STATUS: {
        DURATION: 2, // Duration in minutes. Set 0 for 'Don't Clear'
        MESSAGE: "AFK",
        SLACK_EMOJI: ':afk:',
        isAway: false,
        mode: 'set',    // 'set' or 'reset'
    },
};