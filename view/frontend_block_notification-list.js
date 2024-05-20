document.addEventListener('DOMContentLoaded', function() {
    var notificationContainer = document.getElementById('unskippable-notif__list');

    fetch('/wp-json/unskippable-notif/v1/notifications/', {
        headers: {
            'X-WP-Nonce': notificationData.nonce
        }
    })
    .then(response => response.json())
    .then(data => {
        console.log(data);
        notificationContainer.innerHTML = '';
        data.forEach(function(notification) {
            var containerDiv = document.createElement('div'); // Create a container div
            containerDiv.classList.add('unskippable-notif__notification'); // Add a class for styling if needed

            var title = document.createElement('h3');
            title.classList.add('unskippable-notif_notification__title');
            title.textContent = notification.title;

            var content = document.createElement('div');
            content.classList.add('unskippable-notif_notification__content');
            content.innerHTML = notification.content; // Assuming 'content' is safe to use with innerHTML

            containerDiv.appendChild(title); // Append the title to the container
            containerDiv.appendChild(content); // Append the content to the container

            notificationContainer.appendChild(containerDiv); // Append the container div to the notificationContainer
        });
    })
    .catch(error => {
        console.error('Error fetching notifications:', error);
        notificationContainer.textContent = 'Failed to load notifications.';
    });
});
