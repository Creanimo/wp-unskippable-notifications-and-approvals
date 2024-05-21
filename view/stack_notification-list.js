import { buildNotificationList } from "./frontend_notification-list";

document.addEventListener('DOMContentLoaded', async () => {
    // Create the hidden container for notifications
    let hiddenNotificationStack = document.createElement('div');
    hiddenNotificationStack.id = 'unskippable-notif__hidden-stack';
    hiddenNotificationStack.style.display = 'none';

    buildNotificationList(hiddenNotificationStack, 'mark-as-read');

    document.body.appendChild(hiddenNotificationStack);
});

// Function to create and show the modal with the top notification
function showModalWithNotification() {
    let hiddenStack = document.getElementById('unskippable-notif__hidden-stack');

    let modal = document.createElement('div');
    modal.id = 'unskippable-notif__alert-modal';

    let modalContent = document.createElement('div');
    modalContent.id = 'unskippable-notif__alert-modal__content';

    // Get the top notification from the stack
    let topNotification = hiddenStack.firstChild;
    if (topNotification) {
        // Show the notification in the modal
        modalContent.innerHTML = '';
        modalContent.appendChild(topNotification.cloneNode(true));
        modal.style.display = 'block';

        // Event listener for the "Mark as Read" button
        markAsReadButton.onclick = function() {
            // Remove the notification from the stack and the modal
            hiddenStack.removeChild(topNotification);
            modalContent.innerHTML = '';

            // Check if there are more notifications
            if (hiddenStack.firstChild) {
                showModalWithNotification(); // Show the next notification
            } else {
                modal.style.display = 'none'; // Hide the modal if no notifications are left
            }
        };
    } else {
        // No notifications to show
        modal.style.display = 'none';
    }
}

// Call this function when you want to start showing notifications
showModalWithNotification();
