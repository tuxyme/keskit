
/**
 * DOM helper
 */
var doc = (function() {
    var me = {};
    var cbReadies = [];

    me.whenReady = function(cbReady){
        cbReadies.push(cbReady);
    };

    me.find = function(query) {
        var element = document.querySelector(query);

        if (!element)
            console.log('doc.find cannot find element ' + query);
        else {
            // add show and hide methods
            element.show = function () { element.classList.add('show') };
            element.hide = function () { element.classList.remove('show') };
        }

        return element;
    };

    document.addEventListener("DOMContentLoaded", function () {
        cbReadies.forEach(function(cbReady) {
            cbReady();
        });
    });

    return me;
}.call(this));



/**
 * store for json data
 *
 * to store data    : store.set(name, data)
 * to retrieve data : data = store.get(name)
 * to remove data   : store.del(name)
 */
var store = (function() {
    var _store = {};
    var storage = window['localStorage'] || console.log('error: no localStorage');

    _store.set = function(name, data) {
        storage && storage.setItem(name, JSON.stringify(data));
    };

    _store.del = function(name) {
        storage && storage.removeItem(name);
    };

    _store.get = function(name) {
        var jsonData = null;
        try {
            jsonData = JSON.parse(storage.getItem(name));
        } catch(e) {
            console.log('failed to get data for storage key ' + name);
        }
        return jsonData;
    };

    return _store;

}.call(this));
