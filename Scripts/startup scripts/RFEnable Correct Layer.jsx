// This script exists to create persistence between sessions of InDesign
// regarding the Correct Layer functionality. If you turn it off in one
// session, this script will ensure it is off when you start the next
// session. In fact, it will turn it off, as Correct Layer will always be
// on when you start indesign.
#target "InDesign";
$.level = 0;

#include "../RF-InDesign-Extended/Extendables/extendables.jsx";
var rfidx = require("rockfaxidx");
var persistence = require("persistence");

var store = persistence.Store(rfidx.filesMatching("correct_layer_on"));
if (!store.data["on?"]) {app.doScript(rfidx.filesMatching("Turn Correct Layer Off")[0]);}