YUI.add("moodle-atto_panel-button",function(e,t){var n="atto_panel",r="panel_link",i={INPUTSUBMIT:"atto_media_urlentrysubmit",INPUTCANCEL:"atto_media_urlentrycancel",CONTENTCONTROL:"CONTENTCONTROL"},s={CONTENTCONTROL:".CONTENTCONTROL"},o='<form class="atto_form"><div id="{{elementid}}_{{innerform}}" class="mdl-align"><label for="{{elementid}}_{{CONTENTCONTROL}}">{{get_string "content" component}}</label><input class="{{CSS.CONTENTCONTROL}}" id="{{elementid}}_{{CONTENTCONTROL}}" name="{{elementid}}_{{CONTENTCONTROL}}" value="{{defaultcontent}}" /><br /><br /><button class="{{CSS.INPUTSUBMIT}}">{{get_string "insert" component}}</button></div></form>';e.namespace("M.atto_panel").Button=e.Base.create("button",e.M.editor_atto.EditorPlugin,[],{initializer:function(){if(this.get("disabled"))return;this.addButton({icon:"icon",iconComponent:"atto_panel",callback:this._displayDialogue})},_getCONTENTCONTROLName:function(){return this.get("host").get("elementid")+"_"+r},_displayDialogue:function(t){t.preventDefault();var r=400,i=this.getDialogue({headerContent:M.util.get_string("dialogtitle",n),width:r+"px",focusAfterHide:!0});i.width!==r+"px"&&i.set("width",r+"px");var s=this._getFormContent(),o=e.Node.create("<div></div>");o.append(s),i.set("bodyContent",o),i.show(),this.markUpdated()},_getFormContent:function(){var t=e.Handlebars.compile(o),s=e.Node.create(t({elementid:this.get("host").get("elementid"),CSS:i,CONTENTCONTROL:r,component:n}));return this._form=s,this._form.one("."+i.INPUTSUBMIT).on("click",this._doInsert,this),s},_doInsert:function(e){e.preventDefault(),this.getDialogue({focusAfterHide:null}).hide();var t=this._form.one(s.CONTENTCONTROL),n=t.get("value");n=this.get("starttag")+n+this.get("endtag"),this.editor.focus(),this.get("host").insertContentAtFocusPoint(n),this.markUpdated()}},{ATTRS:{starttag:{value:""},endtag:{value:""}}})},"@VERSION@",{requires:["moodle-editor_atto-plugin"]});