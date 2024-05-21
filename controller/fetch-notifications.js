export async function fetchNotifications() {
    try {
        const response = await fetch('/wp-json/unskippable-notif/v1/notifications/', {
            headers: {
                'X-WP-Nonce': notificationData.nonce
            }
        });
        return await response.json();
    } catch (error) {
        console.error('Error fetching notifications:', error);
        return [];
    }
}