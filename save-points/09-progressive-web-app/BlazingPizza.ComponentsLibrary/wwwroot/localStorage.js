/**
 * Initializes and exposes methods for interacting with localStorage through a global object.
 * This function creates a self-executing anonymous function that sets up the blazorLocalStorage object.
 * The blazorLocalStorage object provides methods to get, set, and delete items in localStorage,
 * with automatic JSON parsing and stringification.
 *
 * @returns {void} This function doesn't return a value; it sets up the global blazorLocalStorage object.
 *
 * @property {function} blazorLocalStorage.get - Retrieves a value from localStorage.
 * @param {string} key - The key of the item to retrieve from localStorage.
 * @returns {*|null} The parsed value if the key exists, or null if it doesn't.
 *
 * @property {function} blazorLocalStorage.set - Stores a value in localStorage.
 * @param {string} key - The key under which to store the value.
 * @param {*} value - The value to store. Will be stringified before storage.
 * @returns {void}
 *
 * @property {function} blazorLocalStorage.delete - Removes an item from localStorage.
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
