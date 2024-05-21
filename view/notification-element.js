import { __ } from '@wordpress/i18n';

export function createNotificationElement(notification, buttonCase = 'none') {
    let containerDiv = document.createElement('div');
    containerDiv.classList.add('unskippable-notif__notification');

    let title = document.createElement('h3');
    title.classList.add('unskippable-notif_notification__title');
    title.textContent = notification.title;

    let content = document.createElement('div');
    content.classList.add('unskippable-notif_notification__content');
    content.innerHTML = notification.content;

    // Append title and content to the container
    containerDiv.appendChild(title);
    containerDiv.appendChild(content);

    // Check if buttonCase is not 'none'
    if (buttonCase !== 'none') {
        let buttonsContainer = document.createElement('div');
        buttonsContainer.classList.add('unskippable-notif__actions');
        switch (buttonCase) {
            case 'none':
                // No buttons to render
                break;
            case 'mark-as-read':
                let markAsReadButton = document.createElement('button');
                markAsReadButton.textContent = __('Mark as Read', 'unskippable-notifications');
                markAsReadButton.classList.add('unskippable-notif__mark-as-read');
                // TODO: Add event listener for markAsReadButton
                buttonsContainer.appendChild(markAsReadButton);
                break;
            case 'approval':
                let acceptButton = document.createElement('button');
                acceptButton.textContent = __('Accept', 'unskippable-notifications');
                acceptButton.classList.add('unskippable-notif__accept');
                // TODO: Add event listener for acceptButton
    
                let declineButton = document.createElement('button');
                declineButton.textContent = __('Decline', 'unskippable-notifications');
                declineButton.classList.add('unskippable-notif__decline');
                // TODO: Add event listener for declineButton
    
                buttonsContainer.appendChild(acceptButton);
                buttonsContainer.appendChild(declineButton);
                break;
        }
        containerDiv.appendChild(buttonsContainer);
    }
    return containerDiv;
}
