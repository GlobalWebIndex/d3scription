var path = require("path");

module.exports = {
  entry: {
    d3scription: ['./index.ts'],
    demo: './demo/first.ts'
  },
  output: {
    path: 'dist/',
    filename: "[name].js",
    library: ["d3scription", "[name]"]
  },
  resolve: {
    // Add `.ts` as a resolvable extension.
    extensions: ['', '.webpack.js', '.web.js', '.ts', '.js']
  },
  module: {
    loaders: [
      // all files with a `.ts` or `.tsx` extension will be handled by `ts-loader`
      { test: /\.ts/, loader: 'ts-loader' }
    ]
  }
}
