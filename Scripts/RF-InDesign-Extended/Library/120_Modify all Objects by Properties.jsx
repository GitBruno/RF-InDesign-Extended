#target "InDesign";
#targetengine 'main';
$.level = 0;
if (typeof(EXTENDABLES) === 'undefined') {
#include "../../../Extendables/extendables.jsx";
}

// if (typeof(rfidx) == 'undefined') {var rfidx = require("rockfaxidx");}
// if (typeof(prefs) == 'undefined') {var prefs = rfidx.Prefs();}
var itemsByProperties = require("manipulate_items_by_properties");

function main () {
  var itemsToCheck = [];
  for (var i = app.documents.length - 1; i >= 0; i--) {
    itemsToCheck = itemsToCheck.concat(app.documents[i].pageItems);
  }
  var matchingItems = itemsByProperties.itemsMatchingSelection(app.documents[i].pageItems, /select_similar_prefs/);
  // app.select(matchingItems);
  alert(matchingItems.length)
}

main();