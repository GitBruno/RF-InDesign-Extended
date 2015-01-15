#target "InDesign";
$.level = 0;
function fix_swatches () {
  var doc =app.documents[0];
  var swatches = doc.swatches;

  var pure_names = {};
  var pure_names_list = [];

  for (var i = 0; i < swatches.length; i++) {
    if (!swatches[i].name.match(/ \d+$/)) {
      pure_names[swatches[i].name] = swatches[i];
      pure_names_list.push(swatches[i].name);
    }
  }
  
  var names = [];
  for (var i = swatches.length - 1; i >= 0; i--) {
    if (swatches[i].name.match(/ \d+$/)) {
      var correct_name = swatches[i].name.replace(/ \d+$/, '');
      var correct_swatch = pure_names[correct_name];
      names.push(swatches[i].name);
      try{
        if (typeof correct_swatch !== 'undefined') {
          swatches[i].remove(correct_swatch);
        }
      }catch(e){}
    }
  }
  
  var myUnusedSwatches = doc.unusedSwatches;
  for (var s = myUnusedSwatches.length-1; s >= 0; s--) {
       var mySwatch = doc.unusedSwatches[s];
       var name = mySwatch.name;
    if (name != ""){
      mySwatch.remove();
   }
  }
    
  return "Finished";
}

try{
  app.doScript ('fix_swatches();', undefined, undefined, UndoModes.entireScript, "Remove Duplicate Swatches");
  alert("Complete");
}catch(e){
  alert(e);
}