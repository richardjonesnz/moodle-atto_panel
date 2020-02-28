YUI.add('moodle-atto_panel-button', function (Y, NAME) {

// This file is part of Moodle - http://moodle.org/
//
// Moodle is free software: you can redistribute it and/or modify
// it under the terms of the GNU General Public License as published by
// the Free Software Foundation, either version 3 of the License, or
// (at your option) any later version.
//
// Moodle is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU General Public License for more details.
//
// You should have received a copy of the GNU General Public License
// along with Moodle.  If not, see <http://www.gnu.org/licenses/>.

/*
 * @package    atto_panel
 * @copyright  Richard Jones {@link http://richardnz.net/}
 * @license    http://www.gnu.org/copyleft/gpl.html GNU GPL v3 or later
 */

/**
 * @module moodle-atto_panel-button
 */

/**
 * Atto text editor panel plugin.
 *
 * @namespace M.atto_panel
 * @class button
 * @extends M.editor_atto.EditorPlugin
 */

var COMPONENTNAME = 'atto_panel';
var CONTENTCONTROL = 'panel_link';

var CSS = {
        INPUTSUBMIT: 'atto_media_urlentrysubmit',
        INPUTCANCEL: 'atto_media_urlentrycancel',
        CONTENTCONTROL: 'CONTENTCONTROL'
    },
    SELECTORS = {
        CONTENTCONTROL: '.CONTENTCONTROL'
    };

var TEMPLATE = '' +
    '<form class="atto_form">' +
        '<div id="{{elementid}}_{{innerform}}" class="mdl-align">' +
            '<label for="{{elementid}}_{{CONTENTCONTROL}}">' +
            '{{get_string "content" component}}</label>' +
            '<input class="{{CSS.CONTENTCONTROL}}" id="{{elementid}}_{{CONTENTCONTROL}}"' +
            ' name="{{elementid}}_{{CONTENTCONTROL}}" value="{{defaultcontent}}" />' +
            '<br /><br />' +
            '<button class="{{CSS.INPUTSUBMIT}}">{{get_string "insert" component}}</button>' +
        '</div>' +
    '</form>';

Y.namespace('M.atto_panel').Button = Y.Base.create('button', Y.M.editor_atto.EditorPlugin, [], {
    /**
     * Initialize the button
     *
     * @method Initializer
     */
    initializer: function() {
        // If we don't have the capability to view then give up.
        if (this.get('disabled')){
            return;
        }

        this.addButton({
            icon:'icon',
            iconComponent: 'atto_panel',
            callback: this._displayDialogue
        });
    },


    /**
     * Get the id of the text link control where we store the link text for the panel
     *
     * @method _getCONTENTCONTROLName
     * @return {String} the txt for the text link form field
     * @private
     */
    _getCONTENTCONTROLName: function(){
        return(this.get('host').get('elementid') + '_' + CONTENTCONTROL);
    },

     /**
     * Display the panel Dialogue
     *
     * @method _displayDialogue
     * @private
     */
    _displayDialogue: function(e) {
        e.preventDefault();
        var width=400;


        var dialogue = this.getDialogue({
            headerContent: M.util.get_string('dialogtitle', COMPONENTNAME),
            width: width + 'px',
            focusAfterHide: true
        });
        // Dialog doesn't detect changes in width without this
        // if you reuse the dialog, this seems necessary.
        if(dialogue.width !== width + 'px'){
            dialogue.set('width',width+'px');
        }

        // Append buttons.
        var buttonform = this._getFormContent();

        var bodycontent =  Y.Node.create('<div></div>');
        bodycontent.append(buttonform);

        //set to bodycontent
        dialogue.set('bodyContent', bodycontent);
        dialogue.show();
        this.markUpdated();
    },


     /**
     * Return the dialogue content for the tool, attaching any required
     * events.
     *
     * @method _getDialogueContent
     * @return {Node} The content to place in the dialogue.
     * @private
     */
    _getFormContent: function() {
        var template = Y.Handlebars.compile(TEMPLATE),
            content = Y.Node.create(template({
                elementid: this.get('host').get('elementid'),
                CSS: CSS,
                CONTENTCONTROL: CONTENTCONTROL,
                component: COMPONENTNAME
            }));

        this._form = content;
        this._form.one('.' + CSS.INPUTSUBMIT).on('click', this._doInsert, this);
        return content;
    },

    /**
     * Inserts the users input onto the page - or an error message
     * @method _getDialogueContent
     * @private
     */
    _doInsert : function(e){
        e.preventDefault();
        this.getDialogue({
            focusAfterHide: null
        }).hide();

        // Deal with the text.
        var contentcontrol = this._form.one(SELECTORS.CONTENTCONTROL);
        var content = contentcontrol.get('value');

        // Build panel content.
        content = this.get('starttag') + content + this.get('endtag');
        this.editor.focus();
        this.get('host').insertContentAtFocusPoint(content);
        this.markUpdated();

    }
}, { ATTRS: {

        starttag: {
        value: ''
        },
        endtag: {
        value: ''
        }
    }
});


}, '@VERSION@', {"requires": ["moodle-editor_atto-plugin"]});
