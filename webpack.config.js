module.exports = {
  entry: './demo/first.ts',
  output: {
      filename: './dist/bundle.js'
  },
  resolve: {
      // Add `.ts` and `.tsx` as a resolvable extension.
      extensions: ['', '.webpack.js', '.web.js', '.ts', '.js']
  },
  module: {
      loaders: [
          // all files with a `.ts` or `.tsx` extension will be handled by `ts-loader`
          { test: /\.tsx?$/, loader: 'ts-loader' }
      ]
  }
}
