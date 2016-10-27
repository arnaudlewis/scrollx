module.exports = {
     entry: './lib/scrollx.js',
     output: {
         path: './dist',
         filename: './scrollx.js'
     },
     module: {
         loaders: [{
             test: /\.js$/,
             exclude: /node_modules/,
             loader: 'babel-loader'
         }]
     }
 };
