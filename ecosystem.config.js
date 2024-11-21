module.exports = {
    apps: [
        {
            name: "bookshow",
            script: "dist/server.js",
            env: {
                PORT: 8003,
            },
        },
    ],
};