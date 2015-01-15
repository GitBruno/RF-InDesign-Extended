#target "InDesign";
#targetengine 'main';
// $.level = 0;
#include "../../../Extendables/extendables.jsx";
// if (typeof(rflib) == 'undefined') {var rflib = require("rf_library");}
// if (typeof(rfidx) == 'undefined') {var rfidx = require("rockfaxidx");}
// var rfprefs = rflib.Prefs();

app.doScript ('main();', undefined, undefined, UndoModes.entireScript, "Clear Character Style Selection");

function main () {
  var sel = app.selection[0];

  var textNames = [ "TextStyleRange",
                    "Text",
                    "Word",
                    "Character",
                    "Paragraph",
                    "TextColumn",
                    "Line" ]

  if (!textNames.contains(sel.constructor.name)) {
    return;
  }

  sel.appliedCharacterStyle = app.documents[0].characterStyles.item("[None]");
  sel.clearOverrides();
}