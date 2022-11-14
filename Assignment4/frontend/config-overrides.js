const webpack = require('webpack');
module.exports = {
  webpack: function override(config) {
                const fallback = config.resolve.fallback || {};
                Object.assign(fallback, {
                  "crypto": require.resolve("crypto-browserify"),
                  "stream": require.resolve("stream-browserify"),
                  "http": require.resolve("stream-http"),
                  "https": require.resolve("https-browserify"),
                  "os": require.resolve("os-browserify"),
                  "buffer": require.resolve("buffer"),
                  "timers": require.resolve("timers-browserify"),
                  "path": require.resolve("path-browserify"),
                  "https": require.resolve("https-browserify"),
                  "fs": require.resolve("browserify-fs"),
                  "process": require.resolve("process/browser"),
                })
    config.resolve.fallback = fallback;
    config.plugins = (config.plugins || []).concat([
        new webpack.ProvidePlugin({
          process: 'process/browser',
          Buffer: ['buffer', 'Buffer']
        })
    ])

    config.module.rules.push({
      test: /\.m?js/,
      resolve: {
          fullySpecified: false
      }
    })

    return config;
  },
  devServer: function(configFunction) {
    // Return the replacement function for create-react-app to use to generate the Webpack
    // Development Server config. "configFunction" is the function that would normally have
    // been used to generate the Webpack Development server config - you can use it to create
    // a starting configuration to then modify instead of having to create a config from scratch.
    return function(proxy, allowedHost) {
      // Create the default config by calling configFunction with the proxy/allowedHost parameters
      const config = configFunction(proxy, allowedHost);

      // Return your customised Webpack Development Server config.
      return config;
    };
  },
}
