import { createNotificationElement } from "./notification-element";
import { fetchNotifications } from "../controller/fetch-notifications";

export function buildNotificationList(listID) {
    listID = document.getElementById(listID)
    fetchNotifications().then(data => {
        data.forEach(function(notification) {
            var notificationElement = createNotificationElement(notification);
            listID.appendChild(notificationElement.cloneNode(true));
        });
    });
};