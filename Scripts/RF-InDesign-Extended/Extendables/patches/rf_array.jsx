Array.prototype.filterByObjectStyle = function (patternOrString) {
  if (patternOrString.constructor.name === 'RegExp') {
    return this.filter(function (x) {
      return x.appliedObjectStyle && x.appliedObjectStyle.name.match(patternOrString);
    });
  }
  return this.filter(function (x) {
    return x.appliedObjectStyle && x.appliedObjectStyle.name === patternOrString;
  });
}

Array.prototype.filterByLabel = function (patternOrString) {
  if (patternOrString.constructor.name === 'RegExp') {
    return this.filter(function (x) {
      return x.label.match(patternOrString);
    });
  }
  return this.filter(function (x) {
    return x.label === patternOrString;
  });
}

Array.prototype.filterByLayer = function (patternOrString) {
  if (patternOrString.constructor.name === 'RegExp') {
    return this.filter(function (x) {
      return x.itemLayer.name.match(patternOrString);
    });
  }
  return this.filter(function (x) {
    return x.itemLayer.name === patternOrString;
  });
}

Array.prototype.rejectItemsBelowLayer = function (layerName) {
  var layerNames = app.activeDocument.layers.everyItem().getElements().map(function (x) {return x.name})
  var index = layerNames.indexOf(layerName);
  var aboveLayers = layerNames.splice(0, index+1);
  var regex = RegExp("^"+aboveLayers.join("$|^")+"$");
  
  return this.filter(function (x) {
    return x.itemLayer.name.match(regex);
  });
}

Array.prototype.filterByType = function (patternOrString) {
  if (patternOrString.constructor.name === 'RegExp') {
    return this.filter(function (x) {
      return x.getElements()[0].constructor.name.match(patternOrString);
    });
  }
  return this.filter(function (x) {
    return x.getElements()[0].constructor.name === patternOrString;
  });
}

Array.prototype.delete = function (item) {
  var index = this.indexOf(item);
  if (index === -1) {return this;}
  return this.splice(index, 1);
}

// Array.prototype.some = function (item) {
//   var index = this.indexOf(item);
//   if (index === -1) {return this;}
//   return this.splice(index, 1);
// }