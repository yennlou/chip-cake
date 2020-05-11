const path = require('path')
const merge = require('webpack-merge')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')

const CommonConfig = {
  devtool: 'source-map',
  entry: {
    app: './src/index.ts'
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].[hash].js',
    chunkFilename: '[name].[hash].js',
    publicPath: '/'
  },
  optimization: {
    splitChunks: {
      chunks: 'all'
    }
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js']
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        loader: 'ts-loader',
        include: [path.resolve(__dirname, 'src')]
      },
      {
        test: /\.s[ac]ss$/i,
        use: ['style-loader', 'css-loader', 'sass-loader']
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html',
      filename: './index.html'
    })
  ]
}

const ModeMapping = {
  development: {},
  production: {
    plugins: [new CleanWebpackPlugin()]
  }
}

module.exports = (env, argv) => {
  return merge(CommonConfig, ModeMapping[argv.mode])
}
