/**
 * Initializes a blazorLocalStorage object with methods to interact with localStorage.
 * This immediately invoked function expression (IIFE) creates a global blazorLocalStorage object
 * with get, set, and delete methods for managing data in localStorage.
 * 
 * @returns {Object} An object with the following methods:
 *   - get(key): Retrieves and parses a JSON value from localStorage
 *   - set(key, value): Stringifies and stores a value in localStorage
 *   - delete(key): Removes an item from localStorage
 * 
 * @example
 * // Get a value
 * const value = blazorLocalStorage.get('myKey');
 * 
 * // Set a value
 * blazorLocalStorage.set('myKey', { foo: 'bar' });
 * 
 * // Delete a value
 * blazorLocalStorage.delete('myKey');
 */
﻿(function () {
    window.blazorLocalStorage = {
        get: key => key in localStorage ? JSON.parse(localStorage[key]) : null,
        set: (key, value) => { localStorage[key] = JSON.stringify(value); },
        delete: key => { delete localStorage[key]; }
    };
})();
