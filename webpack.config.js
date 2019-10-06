const SpeedMeasurePlugin = require( 'speed-measure-webpack-plugin' );
const DuplicatePackageCheckerPlugin = require( 'duplicate-package-checker-webpack-plugin' );
const webpack = require( 'webpack' );
const pkg = require( './package' );
const path = require( 'path' );

const banner = `${ pkg.name } ${ pkg.version } - ${ pkg.description }\nCopyright (c) ${ new Date().getFullYear() } ${ pkg.author } - ${ pkg.homepage }\nLicense: ${ pkg.license }`;

const webpackConfig = {
	context: path.resolve( __dirname, 'src' ),
	entry: './index.js',
	output: {
		path: path.resolve( __dirname, 'build' ),
		filename: 'index.js',
		library: 'MarkerAnimation',
		libraryTarget: 'umd',
	},
	module: {
		rules: [
			{
				test: /\.js$/,
				exclude: /node_modules/,
				loader: 'babel-loader',
			},
		],
	},
	externals: {
		jquery: {
			root: 'jQuery',
			commonjs2: 'jquery',
			commonjs: 'jquery',
			amd: 'jquery',
		},
	},
	plugins: [
		new webpack.BannerPlugin( banner ),
		new DuplicatePackageCheckerPlugin(),
	],
};

module.exports = ( new SpeedMeasurePlugin() ).wrap( webpackConfig );