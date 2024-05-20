/**
 * External Dependencies
 */
const path = require( 'path' );

/**
 * WordPress Dependencies
 */
const defaultConfig = require( '@wordpress/scripts/config/webpack.config.js' );

module.exports = {
    ...defaultConfig,
    ...{
        entry: {
            admin: path.resolve( process.cwd(), 'src', 'admin.js' ),
            "frontend-style": path.resolve( process.cwd(), 'src', 'frontend.scss' ),
            "frontend": path.resolve( process.cwd(), 'src', 'frontend.js' ),
            "blocks": path.resolve( process.cwd(), 'src', 'blocks.js' ),
        },
    }
}