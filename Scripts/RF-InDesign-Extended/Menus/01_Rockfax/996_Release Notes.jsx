#target "InDesign";
#targetengine 'main';
$.level = 0;
#include "../../../Extendables/extendables.jsx";
if (typeof(rfidx) == 'undefined') {rfidx = require("rockfaxidx");}

rfidx.filesMatching(/Release Notes\.txt/i)[0].execute();