/**
 * Requests a push notification subscription for the current user.
 * This method attempts to subscribe the user to push notifications using the browser's
 * Push API. It first checks for an existing subscription, and if none exists, it creates
 * a new one using the application's public key.
 *
 * @returns {Promise<Object|undefined>} A promise that resolves to an object containing
 * the subscription details (url, p256dh, and auth) if a new subscription is created,
 * or undefined if a subscription already exists or the user denies permission.
 * The object has the following structure:
 * {
 *   url: string,    // The endpoint URL for the push subscription
 *   p256dh: string, // The public key for the subscription in base64 format
 *   auth: string    // The auth secret for the subscription in base64 format
 * }
 *
 * @throws {Error} If there's an error during the subscription process that's not
 * related to user permission denial.
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
