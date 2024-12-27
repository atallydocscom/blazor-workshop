/**
 * Initializes the blazorLocalStorage object with methods for interacting with localStorage.
 * This function is immediately invoked to set up the blazorLocalStorage interface.
 * 
 * @returns {Object} An object containing methods to interact with localStorage:
 *   - get: Retrieves and parses a value from localStorage
 *   - set: Stores a stringified value in localStorage
 *   - delete: Removes an item from localStorage
 * 
 * @example
 * // To get a value
 * const value = window.blazorLocalStorage.get('myKey');
 * 
 * // To set a value
 * window.blazorLocalStorage.set('myKey', { foo: 'bar' });
 * 
 * // To delete a value
 * window.blazorLocalStorage.delete('myKey');
 */
﻿(function () {
    window.blazorLocalStorage = {
        get: key => key in localStorage ? JSON.parse(localStorage[key]) : null,
        set: (key, value) => { localStorage[key] = JSON.stringify(value); },
        delete: key => { delete localStorage[key]; }
    };
})();
