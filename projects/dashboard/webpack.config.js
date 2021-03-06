const ModuleFederationPlugin = require("webpack/lib/container/ModuleFederationPlugin");
const mf = require("@angular-architects/module-federation/webpack");
const path = require("path");
const share = mf.share;

const sharedMappings = new mf.SharedMappings();
sharedMappings.register(
  path.join(__dirname, '../../tsconfig.json'),
  [/* mapped paths to share */]);

module.exports = {
    output: {
        uniqueName: 'dashboard',
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
            name: 'dashboard',
            filename: 'remoteEntry.js',
            exposes: {
                './Module': './projects/dashboard/src/app/app.module.ts'
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
