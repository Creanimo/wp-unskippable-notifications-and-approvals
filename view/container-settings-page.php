<?php

/**
 * Javascript puts react interface into this placeholder
 */
function unskippable_notifications_settings_page_html()
{
    printf(
        '<div class="wrap" id="unskippable-notifications-settings">%s</div>',
        esc_html__('Loading…', 'unskippable-notifications')
    );
}