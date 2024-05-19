<?php


function collect_who_to_notify_data() {
    if (!can_user_publish_unskippable_notif()) {
        return; // Exit if the user does not have permission to save notifications
    }

    // Get all notifications
    $args = array(
        'post_type' => 'unskippable_notif',
        'posts_per_page' => -1
    );
    $custom_posts = get_posts($args);

    // Prepare an array to hold the notification data
    $notification_data = array();

    foreach ($custom_posts as $post) {
        // Get the user IDs and roles specified in the post meta
        $user_ids = get_post_meta($post->ID, 'notify_users_field', true);
        $roles = get_post_meta($post->ID, 'notify_roles_field', true);

        // Deserialize the data
        $user_ids = maybe_unserialize($user_ids);
        $roles = maybe_unserialize($roles);

        // Initialize arrays to hold valid users and roles
        $valid_user_ids = array();
        $valid_roles = array();

        // Check if users exist based on ID
        foreach ($user_ids as $user) {
            if (get_userdata($user['value'])) {
                $valid_user_ids[] = $user['value'];
            } else {
                // Remove non-existent user from post_meta
                delete_post_meta($post->ID, 'notify_users_field', $user);
            }
        }

        // Check if roles exist
        global $wp_roles;
        foreach ($roles as $role) {
            if (isset($wp_roles->roles[$role['value']])) {
                $valid_roles[] = $role['value'];
            } else {
                // Remove non-existent role from post_meta
                delete_post_meta($post->ID, 'notify_roles_field', $role);
            }
        }

        // Add to the notification data array
        $notification_data[$post->ID] = array(
            'users' => $valid_user_ids,
            'roles' => $valid_roles
        );
    }

    // Save the result as a transient
    set_transient('unskippable_notif_data_who_to_notify', $notification_data, 12 * HOUR_IN_SECONDS);
}
