export function createNotificationElement(notification) {
    let containerDiv = document.createElement('div');
    containerDiv.classList.add('unskippable-notif__notification');

    let title = document.createElement('h3');
    title.classList.add('unskippable-notif_notification__title');
    title.textContent = notification.title;

    let content = document.createElement('div');
    content.classList.add('unskippable-notif_notification__content');
    content.innerHTML = notification.content;

    containerDiv.appendChild(title);
    containerDiv.appendChild(content);

    return containerDiv;
}