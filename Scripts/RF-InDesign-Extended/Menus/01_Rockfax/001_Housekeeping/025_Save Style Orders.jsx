#target "InDesign";
$.level = 0;
#include "../../../Extendables/extendables.jsx";
if (typeof(preferences) == 'undefined') {preferences = require("preferences");}
if (typeof(rfidx) == 'undefined') {rfidx = require("rockfaxidx");}
app.scriptPreferences.enableRedraw = false;

app.doScript ('main();', undefined, undefined, UndoModes.entireScript, "Update Style Panels Order");

alert("Complete.\nThe order of the styles in this document will be used when sorting the style palettes in future.");

function main () {
  var store = preferences.Store("update_styles_prefs.json");
  var keys = store.data.keys();
  for (var i = 0; i < keys.length; i++) {
    saveStylesOrder (keys[i]);
  }
}

function saveStylesOrder (styleType) {
  var doc = app.documents[0];
  var orderListFile = rfidx.filesMatching("update_{}_order".format(styleType))[0];
  var styles = doc[styleType].everyItem().name;
  orderListFile.open('w');
  orderListFile.write(styles.join("\n"));
  orderListFile.close();
}