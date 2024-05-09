<?php

/**
 * Plugin Name: Unskippable Notifications & Approvals
 * Plugin URI: https://www.creanimo.net
 * Description: Force the confirmation of messages and approvals.
 * Version: 0.1
 * Author: Ferdinand Engländer
 * Author URI: https://www.creanimo.net
 **/

if (!function_exists('unskippable_notification_custom_post_type')) {

    /**
     * Register the Unskippable Notification custom post type
     * Thanks to GenerateWP for this very helpful generator: https://generatewp.com/post-type/
     */
    function unskippable_notification_custom_post_type()
    {

        $labels = array(
            'name'                  => _x('Unskippable Notifications', 'Post Type General Name', 'unskippable-notifications'),
            'singular_name'         => _x('Unskippable Notification', 'Post Type Singular Name', 'unskippable-notifications'),
            'menu_name'             => __('Unskippable Notfications', 'unskippable-notifications'),
            'name_admin_bar'        => __('Unskippable Notfication', 'unskippable-notifications'),
            'archives'              => __('Notfication Archives', 'unskippable-notifications'),
            'attributes'            => __('Notfication Attributes', 'unskippable-notifications'),
            'parent_item_colon'     => __('Parent Item:', 'unskippable-notifications'),
            'all_items'             => __('All Notfications', 'unskippable-notifications'),
            'add_new_item'          => __('Add New Notfication', 'unskippable-notifications'),
            'add_new'               => __('Add New', 'unskippable-notifications'),
            'new_item'              => __('New Notfication', 'unskippable-notifications'),
            'edit_item'             => __('Edit Notfication', 'unskippable-notifications'),
            'update_item'           => __('Update Notfication', 'unskippable-notifications'),
            'view_item'             => __('View Notfication', 'unskippable-notifications'),
            'view_items'            => __('View Notfications', 'unskippable-notifications'),
            'search_items'          => __('Search Notfication', 'unskippable-notifications'),
            'not_found'             => __('Not found', 'unskippable-notifications'),
            'not_found_in_trash'    => __('Not found in Trash', 'unskippable-notifications'),
            'featured_image'        => __('Featured Image', 'unskippable-notifications'),
            'set_featured_image'    => __('Set featured image', 'unskippable-notifications'),
            'remove_featured_image' => __('Remove featured image', 'unskippable-notifications'),
            'use_featured_image'    => __('Use as featured image', 'unskippable-notifications'),
            'insert_into_item'      => __('Insert into Notfication', 'unskippable-notifications'),
            'uploaded_to_this_item' => __('Uploaded to this Notfication', 'unskippable-notifications'),
            'items_list'            => __('Notfication list', 'unskippable-notifications'),
            'items_list_navigation' => __('Notfication list navigation', 'unskippable-notifications'),
            'filter_items_list'     => __('Filter Notfications list', 'unskippable-notifications'),
        );
        $args = array(
            'label'                 => __('Unskippable Notifications', 'unskippable-notifications'),
            'description'           => __('Users are forced to react to these Notifications and Approval Requests on the frontend. They are restricted from using the site until they interacted with every message assigned to them.', 'unskippable-notifications'),
            'labels'                => $labels,
            'supports'              => array('title', 'editor', 'comments', 'revisions', 'custom-fields'),
            'taxonomies'            => array('post_tag'),
            'hierarchical'          => false,
            'public'                => true,
            'show_ui'               => true,
            'show_in_menu'          => true,
            'menu_position'         => 5,
            'menu_icon'             => 'dashicons-welcome-comments',
            'show_in_admin_bar'     => false,
            'show_in_nav_menus'     => false,
            'can_export'            => true,
            'has_archive'           => true,
            'exclude_from_search'   => true,
            'publicly_queryable'    => true,
            'capability_type'       => 'page',
            'show_in_rest'          => true,
        );
        register_post_type('unskippable_notif', $args);
    }
    add_action('init', 'unskippable_notification_custom_post_type', 0);
}

/**
 * Set up a menu entry for the settings
 */
function unskippable_notifications_settings_page()
{
    add_submenu_page(
        'edit.php?post_type=unskippable_notif',
        __('Unskippable Notifications', 'unskippable-notifications'),
        __('Settings', 'unskippable-notifications'),
        'edit_posts',
        'unskippable_notifications',
        'unskippable_notifications_settings_page_html'
    );
}

add_action('admin_menu', 'unskippable_notifications_settings_page');

/**
 * Load html into settings page - javascript puts react interface into this placeholder
 */
function unskippable_notifications_settings_page_html()
{
    printf(
        '<div class="wrap" id="unskippable-notifications-settings">%s</div>',
        esc_html__('Loading…', 'unskippable-notifications')
    );
}

/**
 * Enqueue scripts for the settings page
 */
function unskippable_notifications_settings_page_enqueue_style_script($admin_page)
{
    if ('unskippable_notif_page_unskippable_notifications' !== $admin_page) {
        return;
    }

    $asset_file = plugin_dir_path(__FILE__) . 'build/index.asset.php';

    if (!file_exists($asset_file)) {
        return;
    }

    $asset = include $asset_file;

    // JS for building the react GUI
    wp_enqueue_script(
        'unskippable-notifications-script',
        plugins_url('build/index.js', __FILE__),
        $asset['dependencies'],
        $asset['version'],
        array(
            'in_footer' => true,
        )
    );

    // CSS Style for Wordpress Components
    wp_enqueue_style('wp-components');
}

add_action('admin_enqueue_scripts', 'unskippable_notifications_settings_page_enqueue_style_script');
