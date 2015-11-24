
var main = (function() {
    "use strict";
    var main = {};

    /*
     * Function newInput is called from demo_gui.js when a calculator button is clicked.
     * The character in the data-digit attribute of the button is passed as parameter key.
     * The current expression in display is passed as parameter current.
     *
     * Function newInput returns a Javascript object with members 'old' and 'new'. These members
     * are values, and used by demo_gui.js to update the display. Old is in most cases the value
     * that was passed in parameter current, In these cases member new is the 'current'-value
     * appended with key or - if key equals '=' - the calculated value.
     *
     * The actual calculation is done by the Javascript built-in function 'eval'
     */
    main.newInput = function(current, key) {
        var old = current;

        switch (key) {
            case 'C' :
                current = '';
                old = '';
                break;
            case '+': case '-': case '/': case '*':
                current += ' ' + key + ' ';
                old = '';
                break;
            case '=':
                try {
                    current = eval(current);
                } catch(e) {
                    page_main.showMessage('fout');
                }
                if (current == 'Infinity')
                    page_main.showMessage('ongeldig');
                break;
            default:
                current += key;
                old = '';
        }

        return {old: old, new: current};
    };

    return main;
}.call());
