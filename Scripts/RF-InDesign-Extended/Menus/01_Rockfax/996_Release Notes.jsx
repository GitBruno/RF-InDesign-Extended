#target "InDesign";
#targetengine 'main';
$.level = 0;
if (typeof(EXTENDABLES) === 'undefined') {
#include "../../../Extendables/extendables.jsx";
}
if (typeof(rfidx) == 'undefined') {rfidx = require("rockfaxidx");}

rfidx.filesMatching(/Release Notes\.txt/i)[0].execute();