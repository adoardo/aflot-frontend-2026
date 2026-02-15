module.exports = {
    apps: [
        {
            name: 'Aflot-dev',
            port: '3000', // Optional: PM2 will use this port
            exec_mode: 'cluster', // Optional: Run multiple instances
            instances: 'max', // Optional: Max instances based on CPU cores
            script: './.output/server/index.mjs',
        },
    ],
};