/**
 * Initializes and exposes methods for interacting with localStorage through a global object.
 * This function creates a self-executing anonymous function that sets up the blazorLocalStorage object.
 * The object provides methods to get, set, and delete items in localStorage, with automatic JSON parsing/stringifying.
 * 
 * @returns {void} This function doesn't return a value; it sets up the global blazorLocalStorage object.
 * 
 * @property {Function} get - Retrieves an item from localStorage.
 * @param {string} key - The key of the item to retrieve.
 * @returns {*|null} The parsed value of the item if it exists, or null if it doesn't.
 * 
 * @property {Function} set - Stores an item in localStorage.
 * @param {string} key - The key under which to store the value.
 * @param {*} value - The value to store. This will be stringified before storage.
 * @returns {void}
 * 
 * @property {Function} delete - Removes an item from localStorage.
 * @param {string} key - The key of the item to remove.
 * @returns {void}
 */
﻿(function () {
    window.blazorLocalStorage = {
        get: key => key in localStorage ? JSON.parse(localStorage[key]) : null,
        set: (key, value) => { localStorage[key] = JSON.stringify(value); },
        delete: key => { delete localStorage[key]; }
    };
})();
