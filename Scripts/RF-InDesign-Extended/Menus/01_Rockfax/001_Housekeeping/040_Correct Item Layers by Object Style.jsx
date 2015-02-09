#target "InDesign";
#targetengine 'main';
$.level = 0;
if (typeof(EXTENDABLES) === 'undefined') {
#include "../../../Extendables/extendables.jsx";
}
if (typeof(rfidx) == 'undefined') {var rfidx = require("rockfaxidx");}

// The lookup object has keys that correspond to layer names, and values that are arrays
// of patterns for matching against object styles. Page items with styles that match will 
// be moved to the layer specified by the key.
var lookup = {"Lines":["RL-", "(?<!Abseil )Arrow"]};

var keys = lookup.keys();

for (var i = 0; i < keys.length; i++) {
  lookup[keys[i]] = RegExp(lookup[keys[i]].join("|"));
}

app.doScript ('main();', undefined, undefined, UndoModes.entireScript, "Correct Item Layers by Object Style");

function main () {
  var docs = app.documents;
  
  for (var i = 0; i < docs.length; i++) {
    var doc = docs[i];
    var pageItems = doc.pageItems;
    
    for (var i = 0; i < pageItems.length; i++) {
      for (var i = 0; i < keys.length; i++) {
        if (pageItems[i].appliedObjectStyle.name.match(lookup[keys[i]])) {
          pageItems[i].itemLayer = doc.layers.item(keys[i]);
        }
      }
    }
  }
}