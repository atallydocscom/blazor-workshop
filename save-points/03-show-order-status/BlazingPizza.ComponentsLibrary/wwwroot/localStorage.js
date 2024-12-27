/**
 * Initializes a blazorLocalStorage object with methods for interacting with localStorage.
 * This is an Immediately Invoked Function Expression (IIFE) that creates and assigns
 * the blazorLocalStorage object to the window, making it globally accessible.
 *
 * @returns {void} This function doesn't return a value, but sets up the blazorLocalStorage object.
 *
 * @property {Function} get - Retrieves a value from localStorage by key.
 * @param {string} key - The key to look up in localStorage.
 * @returns {*|null} The parsed value if found, or null if not found.
 *
 * @property {Function} set - Stores a value in localStorage.
 * @param {string} key - The key under which to store the value.
 * @param {*} value - The value to store, which will be stringified.
 * @returns {void}
 *
 * @property {Function} delete - Removes a key-value pair from localStorage.
 * @param {string} key - The key to remove from localStorage.
 * @returns {void}
 */
﻿(function () {
    window.blazorLocalStorage = {
        get: key => key in localStorage ? JSON.parse(localStorage[key]) : null,
        set: (key, value) => { localStorage[key] = JSON.stringify(value); },
        delete: key => { delete localStorage[key]; }
    };
})();
