
/*
 * a javascript object related to the page_main element
 */
var page_main = (function() {
    "use strict";
    var page = {};

    var d_display_top;
    var d_display_main;
    var d_message;

    function onReady() {
        d_display_top = doc.find('#display_top');
        d_display_main = doc.find('#display_main');
        d_message = doc.find('#message');

        var lastResult = store.get('display');
        if (lastResult) {
            d_display_top.innerHTML = lastResult.old;
            d_display_main.innerHTML = lastResult.new;
        }

        doc.find('.keypad').onclick = function(click) {
            var displayData = d_display_main.innerHTML;
            var keyPressed = click.target.dataset.digit;

            if (click.target.className != 'keypad') {
                var result = main.newInput(displayData, keyPressed);
                store.set('display', result);
                d_display_top.innerHTML = result.old;
                d_display_main.innerHTML = result.new;
            }
        };

        d_message.onclick = function() {
            d_message.hide();
        };
    }

    // make sure onReady runs when the HTML document is loaded
    doc.whenReady(onReady);

    page.showMessage = function(message) {
        d_message.innerHTML = message;
        d_message.show();
    };

    return page;
}.call());

/*
 * a javascript object related to the page_about element
 */
var page_about = (function(){

    /* Nothing to do here.
     * Both link and button are handled in the app object below.
     */

}.call());


var app = (function(){
    var app = {};

    doc.whenReady(function(){

        doc.find('body').onclick = function(click) {
            if (click.target.className == "action") {
                if (click.target.dataset.action == "mainpage") {
                    doc.find('#page_main').show();
                    doc.find('#page_about').hide();
                }
                if (click.target.dataset.action == "aboutpage") {
                    doc.find('#page_main').hide();
                    doc.find('#page_about').show();
                }
            }
        };

    });

    return app;
}.call());

