var path = require('path')
var webpack = require('webpack')

module.exports = {
  entry: './app/main.js',
  output: {
    path: path.resolve(__dirname, './dist'),
    filename: 'build.js'
  },
  module: {
    rules: [
        {
            test: /\.vue$/,
            loader: 'vue-loader'
        },
        {
            test: /\.js$/,
            loader: 'babel-loader',
            exclude: /node_modules/
        }
    ]
  },
  resolve: {
      alias: {
          vue: 'vue/dist/vue.js'
      },
  },
  plugins: [
        new webpack.ExternalsPlugin('commonjs', [
            'electron'
        ]),
        new webpack.LoaderOptionsPlugin({
            options: {
                babel: {
                    "presets": ["es2015"],
                    "plugins": ["transform-runtime"]
                },
            }
        })
    ]
}