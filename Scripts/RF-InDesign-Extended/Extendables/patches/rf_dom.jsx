var objectList = [GraphicLine, PageItem, Group, TextFrame, Polygon, Rectangle, Oval, Image];

for (var i = objectList.length - 1; i >= 0; i--) {
  objectList[i].prototype.parentSpread = function() {
    return this._parentPage().parent;
  };
  
  objectList[i].prototype._parentPage = function() {
    var parentPage = this.parentPage;
    if (!parentPage) {
      var x = this.center()[0];
      var spread = this.parent;
      while (spread.constructor.name !== 'Spread') {
        spread = spread.parent;
      }
      return (spread.pages[0].bounds[3] > x) ? spread.pages[0] : spread.pages[1];
    }
    return parentPage;
  };
  
  objectList[i].prototype.parentDocument = function() {
    var pp = this._parentPage();
    var result;
    try {
     result = pp.parent.parent;
    }catch(e){
      result = {name:"§ERROR:unable to get document for this object."};
    }
    return result;
  };
  
  objectList[i].prototype.width = function() {
    var gb = this.geometricBounds;
    return gb[3] - gb[1];
  };
  
  objectList[i].prototype.height = function() {
    var gb = this.geometricBounds;
    return gb[2] - gb[0];
  };
  
  objectList[i].prototype.rightEdge = function() {
    var frame = this.frame();
    return frame.origin.x + frame.size.width;
  };
  
  objectList[i].prototype.leftEdge = function() {
    var frame = this.frame();
    return frame.origin.x;
  };
  
  objectList[i].prototype.topEdge = function() {
    var frame = this.frame();
    return frame.origin.y;
  };
  
  objectList[i].prototype.bottomEdge = function() {
    var frame = this.frame();
    return frame.origin.y + frame.size.height;
  };
  
  objectList[i].prototype.frame = function() {
    var gb = this.geometricBounds;
    return {
      origin:{
        x:gb[1],
        y:gb[0]
      },
      size:{
        width:this.width(),
        height:this.height()
      }
    }
  };
  
  objectList[i].prototype.setFrame = function (frame) {
    var gb = this.geometricBounds;
    var origin = frame.origin;
    var size = frame.size;
    
    gb[0] = origin.y;
    gb[1] = origin.x;
    gb[2] = origin.y + size.height;
    gb[3] = origin.x + size.width;
   
    this.geometricBounds = gb;
  }
  
  objectList[i].prototype.setWidth = function (width) {
    var frame = this.frame();
    frame.size.width = width;
    this.setFrame(frame);
  }
  
  objectList[i].prototype.incrementWidth = function (increment) {
    var frame = this.frame();
    frame.size.width += increment;
    this.setFrame(frame);
  }
  
  objectList[i].prototype.setHeight = function (height) {
    var frame = this.frame();
    frame.size.height = height;
    this.setFrame(frame);
  }
  
  objectList[i].prototype.setRightEdge = function (edge) {
    var frame = this.frame();
    frame.origin.x = edge - frame.size.width;
    this.setFrame(frame);
  }
  
  objectList[i].prototype.setLeftEdge = function (edge) {
    var frame = this.frame();
    frame.origin.x = edge;
    this.setFrame(frame);
  }
  
  objectList[i].prototype.setTopEdge = function (edge) {
    var frame = this.frame();
    frame.origin.y = edge;
    this.setFrame(frame);
  }
  
  objectList[i].prototype.setBottomEdge = function (edge) {
    var frame = this.frame();
    frame.origin.y = edge - frame.size.height;
    this.setFrame(frame);
  }
  
  objectList[i].prototype.incrementHeight = function (increment) {
    var frame = this.frame();
    frame.size.height += increment;
    this.setFrame(frame);
  }
  
  objectList[i].prototype.center = function () {
    var frame = this.frame();
    var x = frame.origin.x + (frame.size.width / 2);
    var y = frame.origin.y + (frame.size.height / 2);
    return [x, y];
  }
  
  objectList[i].prototype.setCenter = function (center) {
    var frame = this.frame();
    var currentCenter = this.center();

    var xDiff = center[0] - currentCenter[0];
    var yDiff = center[1] - currentCenter[1];
    frame.origin.x += xDiff;
    frame.origin.y += yDiff;
    this.setFrame(frame);
  }
  
  objectList[i].prototype.origin = function () {
    var frame = this.frame();
    return [frame.origin.x, frame.origin.y];
  }
  
  objectList[i].prototype.setOrigin = function (newOrigin) {
    var frame = this.frame();
    frame.origin.x = newOrigin[0];
    frame.origin.y = newOrigin[1];
    this.setFrame(frame);
  }
  
  objectList[i].prototype.pointIsWithinBounds = function (point) {
    var bounds = this.geometricBounds;
    return (point[0] >= bounds[1] && point[0] <= bounds[3]) &&
           (point[1] >= bounds[0] && point[1] <= bounds[2]);
  }
  
  // safeWrapClass(objectList[i], objectList[i].constructor.name);
  // objectList[i] = safeWrapMethod(objectList[i], objectList[i].constructor.name + ".ctor");
}

// Doesn't work as expected
Spread.prototype.pageItemsAbovePageItem = function (pg) {
  var ids = this.pageItems.everyItem().id.slice();  
  var index = pg.index
  
  var itemsAbove = [];
  
  for (var i = this.pageItems.length - 1; i >= 0; i--) {
    if (this.pageItems[i].index > index) {
      itemsAbove.push(this.pageItems[i]);
    }
  }
  return itemsAbove;
}

Page.prototype.number = function () {
  try { this.name
  } catch(e) {
    return -1;
  }
  return Number(this.name);
}

// Error.prototype.toString = function() {
//     if (typeof this.stack === "undefined" || this.stack === null) {
//         this.stack = "placeholder";
//         // The previous line is needed because the next line may indirectly call this method.
//         this.stack = $.stack;
//     }
//     return "Error";
// }