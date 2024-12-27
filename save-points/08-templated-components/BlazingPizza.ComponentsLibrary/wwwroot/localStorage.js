/**
 * Initializes a blazorLocalStorage object on the window, providing methods to interact with localStorage.
 * This immediately-invoked function expression (IIFE) creates a closure to encapsulate the blazorLocalStorage object.
 * 
 * The blazorLocalStorage object contains three methods:
 * 1. get: Retrieves and parses a value from localStorage
 * 2. set: Stringifies and stores a value in localStorage
 * 3. delete: Removes a key-value pair from localStorage
 * 
 * @returns {void} This function doesn't return a value; it modifies the global window object.
 */
﻿(function () {
    window.blazorLocalStorage = {
        get: key => key in localStorage ? JSON.parse(localStorage[key]) : null,
        set: (key, value) => { localStorage[key] = JSON.stringify(value); },
        delete: key => { delete localStorage[key]; }
    };
})();
