<?php
function unskippable_notifications_blocks_enqueue_style_script()
{

    $asset_file = plugin_dir_path(__FILE__) . '../build/blocks.asset.php';

    if (!file_exists($asset_file)) {
        return;
    }

    $asset = include $asset_file;

    wp_enqueue_script(
        'unskippable-notifications-blocks-script',
        plugins_url('../build/blocks.js', __FILE__),
        array('wp-blocks', 'wp-element', 'wp-i18n', 'wp-editor'),
        $asset['version'],
        true // in_footer
    );

    register_block_type('plugin/notification-block', array(
        'editor_script' => 'unskippable-notifications-blocks-script',
    ));
}

add_action('init', 'unskippable_notifications_blocks_enqueue_style_script');