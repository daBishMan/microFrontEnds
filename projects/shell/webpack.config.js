const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin');
const mf = require('@angular-architects/module-federation/webpack');
const path = require('path');
const share = mf.share;

const sharedMappings = new mf.SharedMappings();
sharedMappings.register(path.join(__dirname, '../../tsconfig.json'), [
    /* mapped paths to share */
]);

module.exports = {
    output: {
        uniqueName: 'shell',
        publicPath: 'auto'
    },
    optimization: {
        runtimeChunk: false
    },
    resolve: {
        alias: {
            ...sharedMappings.getAliases()
        }
    },
    plugins: [
        new ModuleFederationPlugin({
            remotes: {
                admin: "admin@http://localhost:3000/remoteEntry.js",
                dashboard: "dashboard@http://localhost:4000/remoteEntry.js"
            },

            shared: share({
                '@angular/core': { singleton: true, strictVersion: true },
                '@angular/common': { singleton: true, strictVersion: true },
                '@angular/common/http': { singleton: true, strictVersion: true },
                '@angular/router': { singleton: true, strictVersion: true },

                ...sharedMappings.getDescriptors()
            })
        }),
        sharedMappings.getPlugin()
    ]
};
