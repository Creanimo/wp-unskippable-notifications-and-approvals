<?php
function mark_notification_as_read($post_id) {
    $current_user_id = get_current_user_id();
    if ($current_user_id) {
        // Get the existing array of user IDs who have read the notification
        $read_by_users = get_post_meta($post_id, 'read_by_users', true);
        if (empty($read_by_users)) {
            $read_by_users = array();
        }
        
        // Add the current user ID to the array if not already present
        if (!in_array($current_user_id, $read_by_users)) {
            $read_by_users[] = $current_user_id;
            // Update the post meta
            update_post_meta($post_id, 'read_by_users', $read_by_users);
        }
    }
}