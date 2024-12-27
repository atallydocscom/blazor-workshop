/**
 * Initializes and manages push notification subscriptions for a Blazor application.
 * This function sets up the global blazorPushNotifications object with a method to request
 * push notification subscriptions.
 * 
 * @returns {undefined} This function does not return a value directly, but it sets up
 *                      a global object with a method that returns a Promise.
 * 
 * @example
 * // The function is self-invoking, so it runs automatically when loaded.
 * // To use the exposed functionality:
 * const subscription = await window.blazorPushNotifications.requestSubscription();
 * if (subscription) {
 *   // Use the subscription object
 *   console.log(subscription.url, subscription.p256dh, subscription.auth);
 * }
 * 
 * @throws {Error} If there's an error during the push manager subscription process
 *                 that is not a NotAllowedError.
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
