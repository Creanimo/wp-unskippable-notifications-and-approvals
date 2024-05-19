<?php
add_action('save_post_unskippable_notif', 'collect_who_to_notify_data');
add_action('deleted_user', 'collect_who_to_notify_data');
add_action('add_user_role', 'collect_who_to_notify_data');