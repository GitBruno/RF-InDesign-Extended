// Opens the release notes if they are new.

#target "InDesign";
$.level = 0;

#include "../RF-InDesign-Extended/Extendables/extendables.jsx";
if (typeof(rfidx) == 'undefined') {rfidx = require("rockfaxidx");}

var RELEASE_NOTES_PATTERN = /Release Notes\.(?:txt|md|markdown)/i;

function releaseNotesDate () {
  var file = rfidx.filesMatching(RELEASE_NOTES_PATTERN)[0];
  if (file) {
    return file.modified;
  }
  return "";
}

function lastOpenedReleaseNotes () {
  var file = rfidx.filesMatching(/release_notes_open_date\.txt/i)[0];
  file.open('r');
  var conts = file.read();
  file.close();
  return conts;
}

function setReleaseNotesOpenedDate () {
  var file = rfidx.filesMatching(/release_notes_open_date\.txt/i)[0];
  if (!file) {return false;}
  file.open('w');
  file.write(releaseNotesDate());
  file.close();
  return true;
}

function shouldopenReleaseNotes () {
  return lastOpenedReleaseNotes() != releaseNotesDate();
}

function main () {
   if ($.os.match(/Windows/gi)) {
     return;
  }
  if(shouldopenReleaseNotes()){
    if (!setReleaseNotesOpenedDate()) {return;}
    var file = rfidx.filesMatching(RELEASE_NOTES_PATTERN)[0];
    if (file) {
      file.execute();
    }
  }
}

main();