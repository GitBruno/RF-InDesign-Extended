#target "InDesign";
#targetengine 'main';
$.level = 0;

app.doScript ('main();', undefined, undefined, UndoModes.entireScript, "Make QR Code");

function main () {
  var new_style = app.selection[0].appliedObjectStyle;
  var doc = app.activeDocument;
  if (app.selection[0].constructor.name == 'TextFrame') {
    doc.pageItemDefaults.appliedTextObjectStyle = new_style;
  }else{
    doc.pageItemDefaults.appliedGraphicObjectStyle = new_style;
  }
}