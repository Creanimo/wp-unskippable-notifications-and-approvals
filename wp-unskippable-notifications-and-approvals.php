<?php

/**
 * Plugin Name: Unskippable Notifications & Approvals
 * Plugin URI: https://www.creanimo.net
 * Description: Force the confirmation of messages and approvals.
 * Version: 0.1
 * Author: Ferdinand Engländer
 * Author URI: https://www.creanimo.net
 **/

require_once(plugin_dir_path(__FILE__) . 'model/notifications-custom-post-type.php');
require_once(plugin_dir_path(__FILE__) . 'model/notification-custom-meta.php');
require_once(plugin_dir_path(__FILE__) . 'model/transient_who-to-notify.php');

require_once(plugin_dir_path(__FILE__) . 'controller/enqueue_admin_scripts_style.php');
require_once(plugin_dir_path(__FILE__) . 'controller/enqueue_blocks.php');
require_once(plugin_dir_path(__FILE__) . 'controller/enqueue_frontend_scripts_style.php');
require_once(plugin_dir_path(__FILE__) . 'controller/user-search_autocomplete-api.php');
require_once(plugin_dir_path(__FILE__) . 'controller/role-search_autocomplete-api.php');
require_once(plugin_dir_path(__FILE__) . 'controller/meta-box_save.php');
require_once(plugin_dir_path(__FILE__) . 'controller/check-permissions.php'); # TODO: not actually checking write permissions yet
require_once(plugin_dir_path(__FILE__) . 'controller/transient_build-who-to-notify.php');
require_once(plugin_dir_path(__FILE__) . 'controller/fetch-notifications-to-list.php');
require_once(plugin_dir_path(__FILE__) . 'controller/mark-as-read.php');

require_once(plugin_dir_path(__FILE__) . 'view/notification-post-meta.php');