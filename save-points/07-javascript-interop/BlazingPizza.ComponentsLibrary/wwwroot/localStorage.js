/**
 * Initializes a blazorLocalStorage object with methods to interact with localStorage.
 * This self-executing function creates a global blazorLocalStorage object with get, set, and delete methods.
 * 
 * @returns {Object} An object containing methods to interact with localStorage:
 *   - get: Retrieves and parses a JSON value from localStorage
 *   - set: Stringifies and stores a value in localStorage
 *   - delete: Removes an item from localStorage
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
