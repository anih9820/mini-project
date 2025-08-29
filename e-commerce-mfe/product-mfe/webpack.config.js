const { merge } = require("webpack-merge");
const singleSpaDefaults = require("webpack-config-single-spa-react");

module.exports = (webpackConfigEnv, argv) => {
  const defaultConfig = singleSpaDefaults({
    orgName: "sysco",
    projectName: "product-mfe",
    webpackConfigEnv,
    argv,
  });

  return merge(defaultConfig, {
    // modify the webpack config however you'd like to by adding to this object
    externals: [
      "@sysco/auth-mfe",
    ],
    devServer: {
      static: './dist',
      hot: true, // Enable HMR
      liveReload: true, // Ensure live reload is enabled
      watchFiles: ['src/**/*'], // Watch all files
    },
  });
};
