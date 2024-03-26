const path = require('path');
const CopyPlugin = require("copy-webpack-plugin");
const webpack = require('webpack');
const pkg = require('./package.json');
const fs = require('fs');
var coreCSS="/*not generated yet*/"


const env = process.env.NODE_ENV;

const econfig = {
  mode: env || 'development'
}



module.exports = function (env, argv) {

  let builddir = argv.mode== 'production' ? 'docs' : 'test';

  return {
    watch: argv.mode != 'production',
    target: 'web',
    optimization: {


    },


    mode: argv.mode,
    entry: {
      "demo": './src/demo.js',
      "baremde_web":{import:  './src/baremde_web'},
      "BareMDE": { 
           import: './src/components/BareMDE/index.js',
           library: {
              type: "umd",
              name: "BareMDE",
           }
           }
    },
    externals: function({ context, request }, callback){
         if(request.endsWith("/BareMDE/index.js")){ return callback( null , 'preact' )}
         return "";
    },
    devtool: argv.mode != "production" ? 'inline-source-map' : false, 
    devServer: argv.mode != "production" ? {contentBase: 'docs'} : {contentBase: 'test'},

    output: {
      path: path.resolve(__dirname, builddir, "")
    },

    module: {
      rules: [
        {
          test: /\.svg$/,
          resourceQuery: /raw/,
          type: 'asset/source'
        },

        {
          test: /\.svg$/,
          resourceQuery: { not: [/raw/] },
          type: 'asset/inline'
        },

        {
          test: /\.(less|css|scss)$/,
          use: [
            'style-loader' ,
            'css-loader',
            'sass-loader'
          ],
        },
        {
          test: /\.(woff|ttf)$/,
          use: [{
            loader: 'file-loader',
            options: {
              name: 'fonts/[name].[ext]'
            }
          }
          ],
        }
      ]

    },
    plugins: [
      new CopyPlugin({
        patterns: [
          { from: "src/demo_html/*.*" , to( {context , absoluteFilename} ){
            return "[name][ext]"
          } },
        ],
      }),
      new webpack.DefinePlugin({
        // Definitions...
        'VERSION': JSON.stringify(pkg.version)
      }),
    ],
  };
}
