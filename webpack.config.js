const path = require('path');
const TerserPlugin = require('terser-webpack-plugin');
const CopyPlugin = require("copy-webpack-plugin");
const webpack = require('webpack');
const pkg = require('./package.json');


const env = process.env.NODE_ENV;




module.exports = function (env, argv) {

  let builddir = argv.mode== 'production' ? 'docs' : 'test';

  let baseConf =  {
    watch: argv.mode != 'production',
    target: 'web',
    optimization: {
      minimizer: [new TerserPlugin({
      extractComments: false,
      terserOptions: {
        format: {
          comments: false,
        },
    }})]
    },
    mode: argv.mode,
    entry: {
      "demo": './src/demo.js',
      "baremde_web":{import:  './src/baremde_web' },
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
        test: /\.m?js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: "babel-loader"
        }
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

  let libConf = Object.assign({} , baseConf);

// build the lib
  libConf.entry =  {
      "BareMDE": { 
           import: './src/components/BareMDE/index.js',
           library: {
              type: "umd",
              name: "BareMDE",
           }
        },
    };
  libConf.externalsType="umd";
  //do not bundle preact to the lib
  libConf.externals = 'preact';
  libConf.plugins = [
  new webpack.DefinePlugin({
        'VERSION': JSON.stringify(pkg.version)
      }),

  ];
 
 //do not need to output it to 'test'
    libConf.output= {
      path: path.resolve(__dirname, "dist", ""),
      filename: "BareMDE_v"+pkg.version+ ".umd.js"
    };

  return [ baseConf , libConf ] ;
}
