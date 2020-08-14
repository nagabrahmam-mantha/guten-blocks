const defaultConfig = require("@wordpress/scripts/config/webpack.config");
const path = require('path');

var gulpConfig = require('./gulp-config.json');
if (!gulpConfig.wp_content_dir) {
	console.log('error: wp_content_dir is not defined in gulp-config.json');
	process.exit(1);
}

var wpcontent = path.resolve(gulpConfig.wp_content_dir);

module.exports = {
	...defaultConfig,
	entry: {
		'block-big-sampleblock': './guten-blocks/block-big-sampleblock.js'
	},
	output: {
		path: path.join(gulpConfig.wp_content_dir + '/wp-content/themes/blocks/assets/gutenberg'),
		filename: '[name].js'
	}
}
