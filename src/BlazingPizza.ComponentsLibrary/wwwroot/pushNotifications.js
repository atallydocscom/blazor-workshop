/**
 * Requests a push notification subscription for the current user.
 * This method attempts to subscribe the user to push notifications using the browser's Push API.
 * If successful, it returns the subscription details needed for sending push notifications.
 * 
 * @returns {Promise<Object|undefined>} A promise that resolves to an object containing the subscription details:
 *   - url: The endpoint URL for sending push messages
 *   - p256dh: The public key for encrypting push messages
 *   - auth: The authentication secret for the subscription
 *   If the subscription fails or is denied by the user, the promise resolves to undefined.
 * 
 * @throws {Error} If there's an error during the subscription process that is not a user denial.
 */
﻿(function () {
    // Note: Replace with your own key pair before deploying
    const applicationServerPublicKey = 'BLC8GOevpcpjQiLkO7JmVClQjycvTCYWm6Cq_a7wJZlstGTVZvwGFFHMYfXt6Njyvgx_GlXJeo5cSiZ1y4JOx1o';

    window.blazorPushNotifications = {
        requestSubscription: async () => {
            const worker = await navigator.serviceWorker.getRegistration();
            const existingSubscription = await worker.pushManager.getSubscription();
            if (!existingSubscription) {
                const newSubscription = await subscribe(worker);
                if (newSubscription) {
                    return {
                        url: newSubscription.endpoint,
                        p256dh: arrayBufferToBase64(newSubscription.getKey('p256dh')),
                        auth: arrayBufferToBase64(newSubscription.getKey('auth'))
                    };
                }
            }
        }
    };

    async function subscribe(worker) {
        try {
            return await worker.pushManager.subscribe({
                userVisibleOnly: true,
                applicationServerKey: applicationServerPublicKey
            });
        } catch (error) {
            if (error.name === 'NotAllowedError') {
                return null;
            }
            throw error;
        }
    }

    function arrayBufferToBase64(buffer) {
        // https://stackoverflow.com/a/9458996
        var binary = '';
        var bytes = new Uint8Array(buffer);
        var len = bytes.byteLength;
        for (var i = 0; i < len; i++) {
            binary += String.fromCharCode(bytes[i]);
        }
        return window.btoa(binary);
    }
})();
