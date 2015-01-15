#targetengine "main"
#target indesign

var doc, links, i, link, image;

function main () {
  if (!confirm("This will open all RGB links in all open documents in photoshop, flatten them, then save them in CYMK. Is this what you want?")) {
    return;
  }
  var counter = 0;
  for (var i = 0; i < app.documents.length; i++) {
    doc = app.documents[i];
    links = doc.links;
    
    UpdateAllOutdatedLinks();  
    for (j = links.length-1; j >= 0; j--) {  
      link = links[j];  
      if (link.status == LinkStatus.NORMAL) {  
        image = link.parent;  
        if (image.space == "RGB") {  
          if (!link.filePath.match(/_Ter|_Map|_Sat|\.jpg|\.png/g)) {
            CreateBridgeTalkMessage(link.filePath);
            counter++
          }
        }  
      }  
    }
    UpdateAllOutdatedLinks();
  }
  alert("Complete, "+counter+" links converted.");
}
  
main();

  
//===================== FUNCTIONS ===============================  
function CreateBridgeTalkMessage(imagePath) {  
  var bt = new BridgeTalk();  
  bt.target = "photoshop";  
  bt.body = ResaveInPS.toSource()+"('"+imagePath+"');";  
  bt.onError = function(errObj) {  
    $.writeln("Error: " + errObj.body);  
  }  
  bt.onResult = function(resObj) {}  
  bt.send(30);  
}  
  
function ResaveInPS(imagePath) {  
  var psDoc;  
  app.displayDialogs = DialogModes.NO;  
  psDoc = app.open(new File(imagePath));  
  psDoc.changeMode(ChangeMode.CMYK);
  psDoc.flatten();
  psDoc.close(SaveOptions.SAVECHANGES);  
  app.displayDialogs = DialogModes.ALL;  
}  
  
function UpdateAllOutdatedLinks() {  
  var link, c;  
  for (var c = doc.links.length-1; c >= 0; c--) {  
    link = doc.links[c];  
    if (link.status == LinkStatus.LINK_OUT_OF_DATE) link.update();  
  }  
}  