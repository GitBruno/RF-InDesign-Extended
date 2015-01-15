TextFrame.prototype.fitSmallOversetFrame = function () {
  var RECURSION_COUNT = 0;
  var MAX_RECURSION   = 6;
  this._fitSmallOversetFrame(RECURSION_COUNT, MAX_RECURSION);
};

TextFrame.prototype._fitSmallOversetFrame = function (RECURSION_COUNT, MAX_RECURSION) {
  var contents = this.contents, bounds, newBounds;
  var justification = this.parentStory.justification;
  if (![Justification.LEFT_ALIGN, Justification.CENTER_ALIGN].contains(justification)) {
    this.parentStory.justification = Justification.RIGHT_ALIGN;
    bounds = this.geometricBounds;
    bounds[1] = bounds[1] - 100;
    this.geometricBounds = bounds;
    newBounds = this.geometricBounds;
  }else{
    this.parentStory.justification = Justification.LEFT_ALIGN;
    bounds = this.geometricBounds;
    bounds[2] += 20;
    bounds[3] += 100;
    this.geometricBounds = bounds;
    newBounds = this.geometricBounds;
  }
  this.fit(FitOptions.FRAME_TO_CONTENT);
  if (bounds.join(",") == newBounds.join(",") && RECURSION_COUNT <= MAX_RECURSION) {
    RECURSION_COUNT += 1;
    this._fitSmallOversetFrame(RECURSION_COUNT, MAX_RECURSION);
  }
  this.parentStory.justification = justification;
};

TextFrame.prototype.reallyFitToContent = function () {
  var tf = this;
  var originalTop    = this.topEdge();
  var originalCenter = this.center();
  var originalBottom = this.bottomEdge();
  
  this.fit( FitOptions.FRAME_TO_CONTENT );
  var gb = this.geometricBounds;
  if (!this.contents.match(/\w+/)) {return;}
  
  var increment = 0.2;
  
  var vertAlignment = this.textFramePreferences.verticalJustification;
  


  if (this.parentStory.justification === Justification.CENTER_ALIGN) {
    var left = true;
    while (!this.overflows) {
      if (left) {
        gb[3] -= increment;
      }else{
        gb[1] += increment;
      }
      this.geometricBounds = gb;
      left = !left;
    }
    gb = this.geometricBounds;
    
    if (left) {
      gb[3]+= increment;
    }else{
      gb[1]-= increment;
    }
    this.geometricBounds = gb;
  }else if(this.parentStory.justification === Justification.RIGHT_ALIGN) {
    while (!this.overflows) {
      gb[1]+= increment;
      this.geometricBounds = gb;
    }
    gb = this.geometricBounds;
    gb[1]-= increment;
    this.geometricBounds = gb;
  }else if(this.parentStory.justification === Justification.LEFT_ALIGN) {
    
    while (!this.overflows) {
      gb[3]-= increment;
      this.geometricBounds = gb;
    }
    gb = this.geometricBounds;
    gb[3]+= increment;
    this.geometricBounds = gb;
  }

  this.geometricBounds = gb;
    
  while (!this.overflows) {
    gb[2]-= increment;
    this.geometricBounds = gb;
  }
  gb = this.geometricBounds;
  gb[2]+= increment;
  
  this.geometricBounds = gb;
  
  if (vertAlignment === VerticalJustification.TOP_ALIGN) {
    this.setTopEdge(originalTop);
  }else if (vertAlignment === VerticalJustification.BOTTOM_ALIGN) {
    this.setBottomEdge(originalBottom);
  }else{
    var currentCenter = this.center();
    this.setCenter([currentCenter[0], originalCenter[1]]);
  }
};

var WHITE_SPACE_CHARS = ["\r", "\n", " ", "\t"];
// Recursively removes whitespace characters from the end of
// the frame's contents.
TextFrame.prototype.removeTrailingWhiteSpace = function () {
  var nextFrame = this.nextTextFrame, lastCharRef;
  if(nextFrame){
    lastCharRef = this.characters[-2];
  }else{
    lastCharRef = this.characters[-1];
  }
  if (WHITE_SPACE_CHARS.contains(lastCharRef.contents) && !this.overflows) {
    lastCharRef.contents = "";
    this.removeTrailingWhiteSpace();
  }
};

// Recursively removes whitespace characters from the start of
// the frame's contents.
TextFrame.prototype.removeLeadingWhiteSpace = function () {
  var firstCharRef = this.characters[0];
  var contents = firstCharRef.contents;
  if (WHITE_SPACE_CHARS.contains(firstCharRef.contents)) {
    firstCharRef.contents = "";
    this.removeLeadingWhiteSpace();
  }
};

TextFrame.prototype.expandToContent = function () {
  var frame = this.frame();
  if (!this.overflows) {
    return;
  }
  
  for (var i = 0; i < 200; i++) {
    this.incrementWidth(1);
    this.incrementHeight(1);
    if (!this.overflows) {
      break;
    }
  }
  
  if (this.overflows) {
    this.setFrame(frame);
    return;
  }
  
  for (var i = 0; i < 200; i++) {
    this.incrementWidth(-0.2);
    if (this.overflows) {
      break;
    }
  }
  this.incrementWidth(0.2);
  for (var i = 0; i < 200; i++) {
    this.incrementHeight(-0.2);
    if (this.overflows) {
      break;
    }
  }
  this.incrementHeight(0.2);
  this.fit(FitOptions.FRAME_TO_CONTENT);
}

TextFrame.prototype.fitToContentByExpandingVertically = function () {
  var frame = this.frame();
  if (!this.overflows) {
    return;
  }
  
  function isNotOverflowing () {
    return !this.overflows;
  }
  
  this.incrementHeightUntilNotOverflowing(30, 20, isNotOverflowing);
  this.incrementHeightUntilNotOverflowing(15, 20, isNotOverflowing);
  this.incrementHeightUntilNotOverflowing(8, 20, isNotOverflowing);
  this.incrementHeightUntilNotOverflowing(4, 20, isNotOverflowing);
  this.incrementHeightUntilNotOverflowing(2, 20, isNotOverflowing);
  this.incrementHeight(2);
  
  if (this.overflows) {
    this.setFrame(frame);
    return;
  }

  for (var i = 0; i < 100; i++) {
    this.incrementHeight(-0.1);
    if (this.overflows) {
      break;
    }
  }
  this.incrementHeight(0.1);
  this.fit(FitOptions.FRAME_TO_CONTENT);
}

TextFrame.prototype.fitToContentByShrinkingVertically = function () {
  var frame = this.frame();
  if (!(this.nextTextFrame||this.previousTextFrame)) {
    return;
  }


  this.decrementHeightUntilOverflowing(30, 20);
  this.decrementHeightUntilOverflowing(15, 20);
  this.decrementHeightUntilOverflowing(8, 20);
  this.decrementHeightUntilOverflowing(4, 20);
  this.decrementHeightUntilOverflowing(2, 20);
  this.incrementHeight(-2);
  var contents = this.contents;
  
  for (var i = 0; i < 100; i++) {
    this.incrementHeight(0.1);
    if (this.contents !== contents) {
      break;
    }
  }
  
  this.incrementHeight(0.1);
  this.fit(FitOptions.FRAME_TO_CONTENT);
}

TextFrame.prototype.incrementHeightUntilNotOverflowing = function (increment, repeatCount) {
  for (var i = 0; i < repeatCount; i++) {
    this.incrementHeight(increment);
    if (!this.overflows) {
      this.incrementHeight(-increment);
      break;
    }
  }
}

TextFrame.prototype.decrementHeightUntilOverflowing = function (increment, repeatCount) {
  var contents = this.contents;
  if (contents === '') {return;}
  for (var i = 0; i < repeatCount; i++) {
    this.incrementHeight(-increment);
    if (this.contents !== contents) {
      this.incrementHeight(increment);
      break;
    }
  }
}

// Adds column breaks to threaded frames that erroneously have
// standard carriage returns.
TextFrame.prototype.addColumnBreaksIfNecessary = function () {
  var nextFrame = this.nextTextFrame, lastCharRef;
  var overflows = this.overflows;
  if (this.characters[-1] !== SpecialCharacters.columnBreak && nextFrame) {
    this.characters[-1].contents = (SpecialCharacters.columnBreak);
  }
};

TextFrame.prototype.removeColumnBreaksIfNecessary = function () {
  if (this.contents === '') {return;}
  if (this.overflows && this.characters[-1].contents == SpecialCharacters.columnBreak) {
    if (this.characters[-2].contents == "\r") {
      this.characters[-2].contents = "";
    }
    this.characters[-1].contents = "\r";
  }
}

/* 
 This is meant to be the canonical fitToContent, intended to entirely replace the system one,
 which is somewhat lacking.
 It tries to infer your intention based on the state of the objects you have selected.
 Its work is entirely about text frames, not graphic frames or unassigned.
*/
TextFrame.prototype.fitToContent = function () {
  var frame = this.frame();
  
  // Get rid of returns, spaces etc that are not needed.
  try{this.removeTrailingWhiteSpace();}catch(e){}
  try{this.removeLeadingWhiteSpace();}catch(e){}
  
  // Add column breaks to text frames that have a nextTextFrame
  // but whose final character is a carriage return (replaces the CR).
  this.addColumnBreaksIfNecessary();
  
  // Removes any column break if the text frame is overflowing and
  // has no nextTextFrame.
  this.removeColumnBreaksIfNecessary();
  
  if (!this.overflows) {
    if (this.contents === '') {
      this.fit(FitOptions.FRAME_TO_CONTENT);
      var newFrame = this.frame();
      if (newFrame != frame) {
        return;
      }
    }
    
    // Text frames in a thread probably don't want to shrink their width.
    if (this.nextTextFrame||this.previousTextFrame) {
      this.fitToContentByShrinkingVertically();
      return;
    }else{
      
      // Lone text frames probably want to shrink to fit tightly whatever
      // they contain.
      this.reallyFitToContent();
      return;
    }
  }
  
  // This accounts for small overset text frames (only one word inside),
  // which InDesign annoyingly does nothing with.
  if (this.lines.length < 2/* This is a weak test. Think of something better.*/) { 
    this.expandToContent();
    return;
  }
  
  // Text frames in a thread probably don't want to shrink their width.
  this.fitToContentByExpandingVertically();
}

// function main () {
//   for (var i = 0; i < app.selection.length; i++) {
//     app.selection[i].fitToContent();
//   };
//   // return
//   // var i = 0;
//   // // for (var i = 0; i < app.documents.length; i++) {
//   //   var doc = app.documents[i];
//   //   var textFrames = doc.textFrames;
//   //   var overflowingFrames = [];
//   //   for (var j = 0; j < textFrames.length; j++) {
//   //     if (textFrames[j].overflows) {
//   //       overflowingFrames.push(textFrames[j]);
//   //     }
//   //   }
//   //   for (var j = 0; j < overflowingFrames.length; j++) {
//   //     overflowingFrames[j].fitToContent();
//   //   }
//   // }
// }

// app.doScript ('main();', undefined, undefined, UndoModes.entireScript, "Script Name");

// app.selection[0].fitToContentByExpandingVertically();