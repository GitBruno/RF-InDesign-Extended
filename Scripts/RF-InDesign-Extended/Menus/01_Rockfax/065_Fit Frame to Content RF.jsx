#target "InDesign";
#targetengine 'main';
$.level = 0;
#include "../../Extendables/extendables.jsx";

if (typeof(rfidx) == 'undefined') {rfidx = require("rockfaxidx");}
if (typeof(prefs) == 'undefined') {prefs = rfidx.Prefs();}

app.scriptPreferences.enableRedraw = false;

function main () {
  var textTypes = ["InsertionPoint", "Character", "Text", "Word", "Story", "Paragraph", "Line"];
  var whatToFit;

  var selType = app.selection[0].constructor.name;

  if (textTypes.contains(selType)) {
    whatToFit = app.selection[0].parentTextFrames;
  }else{
    whatToFit = app.selection;
  }

  var lockedObjects = [];
  for (var i = 0; i < whatToFit.length; i++) {
    if (whatToFit[i].locked) {
      lockedObjects.push(whatToFit[i]);
      continue;
    }
    var obj = whatToFit[i];
    if (obj.constructor.name === 'TextFrame') {
      obj.fitToContent();
    }else{
      obj.fit(FitOptions.FRAME_TO_CONTENT);
    }
  }
  if (lockedObjects.length > 0) {
    app.select(lockedObjects);
    alert("The selected objects are locked.");
  }
}

try {
  app.doScript ('main();', undefined, undefined, UndoModes.entireScript, "Fit Frames to Content");
}catch(e){
  alert("An error occurred. Sorry.");
}
