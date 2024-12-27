/**
 * Initializes and exposes methods for interacting with localStorage through the window.blazorLocalStorage object.
 * This immediately-invoked function expression (IIFE) sets up three methods: get, set, and delete.
 * 
 * @returns {void} This function doesn't return a value; it modifies the global window object.
 * 
 * @property {function} get - Retrieves a value from localStorage by key.
 * @param {string} key - The key to look up in localStorage.
 * @returns {any|null} The parsed value if the key exists, or null if it doesn't.
 * 
 * @property {function} set - Stores a value in localStorage.
 * @param {string} key - The key under which to store the value.
 * @param {any} value - The value to be stored. It will be stringified before storage.
 * @returns {void}
 * 
 * @property {function} delete - Removes a key-value pair from localStorage.
 * @param {string} key - The key to be removed from localStorage.
 * @returns {void}
 */
﻿(function () {
    window.blazorLocalStorage = {
        get: key => key in localStorage ? JSON.parse(localStorage[key]) : null,
        set: (key, value) => { localStorage[key] = JSON.stringify(value); },
        delete: key => { delete localStorage[key]; }
    };
})();
