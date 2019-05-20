const webpack = require( 'webpack' );
const pkg = require( './package' );

const banner = `${ pkg.name } ${ pkg.version } - ${ pkg.description }\nCopyright (c) ${ new Date().getFullYear() } ${ pkg.author } - ${ pkg.homepage }\nLicense: ${ pkg.license }`;

const webpackConfig = {
	'context': __dirname + '/src',
	'entry': './index.js',
	'output': {
		'path': __dirname,
		'filename': `${ pkg.name }.min.js`,
		'library': 'markerAnimation',
		'libraryTarget': 'this',
	},
	'module': {
		'rules': [
			{
				'test': /\.js$/,
				'exclude': /node_modules/,
				'loader': 'babel-loader',
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
	'plugins': [
		new webpack.BannerPlugin( banner ),
	],
};

module.exports = webpackConfig;