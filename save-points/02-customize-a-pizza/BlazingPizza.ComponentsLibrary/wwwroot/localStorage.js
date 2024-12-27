/**
 * Initializes a blazorLocalStorage object with methods to interact with the browser's localStorage.
 * This immediately invoked function expression (IIFE) creates a global blazorLocalStorage object
 * with get, set, and delete methods for managing key-value pairs in localStorage.
 * 
 * @returns {Object} An object with the following methods:
 *   - get(key): Retrieves and parses a value from localStorage
 *   - set(key, value): Stringifies and stores a value in localStorage
 *   - delete(key): Removes a key-value pair from localStorage
 * 
 * @example
 * // Get a value
 * const value = window.blazorLocalStorage.get('myKey');
 * 
 * // Set a value
 * window.blazorLocalStorage.set('myKey', { data: 'example' });
 * 
 * // Delete a value
 * window.blazorLocalStorage.delete('myKey');
 */
﻿(function () {
    window.blazorLocalStorage = {
        get: key => key in localStorage ? JSON.parse(localStorage[key]) : null,
        set: (key, value) => { localStorage[key] = JSON.stringify(value); },
        delete: key => { delete localStorage[key]; }
    };
})();
