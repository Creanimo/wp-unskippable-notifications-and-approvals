import { __ } from "@wordpress/i18n";
import { buildNotificationList } from "./frontend_notification-list";

const { registerBlockType } = wp.blocks;

registerBlockType('plugin/notification-block', {
    title: 'Notification List',
    icon: 'megaphone', // Use a WordPress Dashicon or custom SVG
    category: 'layout',
    edit: function (props) {
        // This is where you define the editor interface
        return (
            <>
                <h2>{__('Current Notifications', 'unskippable-notifications')}</h2>
                <div class="mode--light unskippable-notif__list-block" className={props.className}>
                    <div id="unskippable-notif__list">
                        <p>{__('A list of all notifications will be displayed here.', 'unskippable-notifications')}</p>
                    </div>
                </div>
            </>
        );
    },
    save: function (props) {
        // This is what gets saved and output on the frontend
        return (
            <>
                <h2>{__('Current Notifications', 'unskippable-notifications')}</h2>
                <div class="mode--light unskippable-notif__list-block" className={props.className}>
                    <div id="unskippable-notif__list">
                        <div class="unskippable-notif__loading-message">{__('Loading Notifications...', 'unskippable-notifications')}</div>
                    </div>
                </div>
            </>
        );
    }
});

let list = document.getElementById("unskippable-notif__list")
if (list) {
    buildNotificationList(list);
}