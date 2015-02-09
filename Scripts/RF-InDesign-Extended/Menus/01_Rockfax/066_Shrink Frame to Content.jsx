#target "InDesign";
#targetengine 'main';
$.level = 0;
if (typeof(EXTENDABLES) === 'undefined') {
#include "../../Extendables/extendables.jsx";
}
if (typeof(rfidx) == 'undefined') {rfidx = require("rockfaxidx");}

function main () {
  var tfs = app.selection.filter(function (argument) {
    return argument.constructor.name == "TextFrame";
  });
  rfidx.reallyFitTextFramesToContent(tfs);
}

app.doScript ('main();', undefined, undefined, UndoModes.entireScript, "Shrink Frame to Content");