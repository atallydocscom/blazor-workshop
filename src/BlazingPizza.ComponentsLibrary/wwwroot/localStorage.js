/**
 * Initializes a blazorLocalStorage object with methods to interact with localStorage.
 * This is an Immediately Invoked Function Expression (IIFE) that creates and assigns
 * methods to the window.blazorLocalStorage object for getting, setting, and deleting
 * items in localStorage.
 *
 * @returns {void} This function doesn't return a value; it sets up the blazorLocalStorage object.
 *
 * @property {Function} get - Retrieves a value from localStorage by key.
 * @param {string} key - The key to look up in localStorage.
 * @returns {any|null} The parsed value if found, or null if not found.
 *
 * @property {Function} set - Stores a value in localStorage.
 * @param {string} key - The key under which to store the value.
 * @param {any} value - The value to store, which will be stringified.
 * @returns {void}
 *
 * @property {Function} delete - Removes an item from localStorage by key.
 * @param {string} key - The key of the item to remove from localStorage.
 * @returns {void}
 */
﻿(function () {
    window.blazorLocalStorage = {
        get: key => key in localStorage ? JSON.parse(localStorage[key]) : null,
        set: (key, value) => { localStorage[key] = JSON.stringify(value); },
        delete: key => { delete localStorage[key]; }
    };
})();
