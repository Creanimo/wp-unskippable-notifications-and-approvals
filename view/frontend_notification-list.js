import { createNotificationElement } from "./notification-element";
import { fetchNotifications } from "../controller/fetch-notifications";

export function buildNotificationList(listElement, buttonCase = 'none') {
    fetchNotifications().then(data => {
        listElement.innerHTML = '';
        data.forEach(function (notification) {
            let notificationElement = createNotificationElement(notification, buttonCase);
            listElement.appendChild(notificationElement.cloneNode(true));
        });
    });
};