#target "InDesign";
#targetengine 'main';
$.level = 0;
if (typeof(EXTENDABLES) === 'undefined') {
#include "../../Extendables/extendables.jsx";
}

if (typeof(rfidx) == 'undefined') {var rfidx = require("rockfaxidx");}
if (typeof(prefs) == 'undefined') {var prefs = rfidx.Prefs();}
var itemsByProperties = require("manipulate_items_by_properties");

function main () {
  var itemsToCheck = app.selection[0].parent.pageItems;
  var matchingItems = itemsByProperties.itemsMatchingSelection(itemsToCheck, /select_similar_prefs/);
  app.select(matchingItems);
}

main();