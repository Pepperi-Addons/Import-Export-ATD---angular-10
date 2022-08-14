const { shareAll, share, withModuleFederationPlugin } = require('@angular-architects/module-federation/webpack');
const filename = `import_export_atd`;

const webpackConfig = withModuleFederationPlugin({
    name: filename,
    filename: `${filename}.js`,
    exposes: {
        './WebComponents': './src/bootstrap.ts',
    },
    shared: {
        ...shareAll({ strictVersion: true, requiredVersion: 'auto' }),
    }
});

module.exports = {
    ...webpackConfig,
    output: {
        ...webpackConfig.output,
        uniqueName: filename,
    },
};

// const ModuleFederationPlugin = require("webpack/lib/container/ModuleFederationPlugin");
// const singleSpaAngularWebpack = require('single-spa-angular/lib/webpack').default;
// const { merge } = require('webpack-merge');
// // const deps = require('./package.json').dependencies;
// const webpack = require('webpack');

// module.exports = (angularWebpackConfig, options) => {
//     const mfConfig = {
//         output: {
//           uniqueName: "import_export_atd",
//           publicPath: "auto"
//         },
//         optimization: {
//           // Only needed to bypass a temporary bug
//           runtimeChunk: false
//         },
//         externals: {
//         //   'react': 'React'
//         },
//         plugins: [
//         //   new webpack.DefinePlugin({
//         //     'process.env.NODE_ENV': JSON.stringify('development')
//         // }),
//           new ModuleFederationPlugin({
//             remotes: {},
//             name: "import_export_atd",
//             filename: "import_export_atd.js",
//             exposes: {
//              './ImportAtdModule': './src/app/import-atd/index.ts',
//               './ImportAtdComponent': './src/app/import-atd/index.ts',
//               './ExportAtdModule': './src/app/export-atd/index.ts',
//               './ExportAtdComponent': './src/app/export-atd/index.ts'
//             },
//             shared: {
//               // ...deps,
//               "@angular/core": { singleton: true,  strictVersion: false  },
//               "@angular/common": {singleton: true,strictVersion: false   },
//               "rxjs": { singleton: true,strictVersion: false   },
//               "@ngx-translate/core": { singleton: true, strictVersion: false   }

//             }
//           }),
//         ],
//       };

//     const merged = merge(angularWebpackConfig, mfConfig);
//     const singleSpaWebpackConfig = singleSpaAngularWebpack(merged, options);
//     return singleSpaWebpackConfig;
// };
