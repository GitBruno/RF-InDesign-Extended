/**
 * @class
 * @name Application
 * @desc An instance of this class is available as ``app`` in every Adobe 
 * application with an ExtendScript engine.
 */

/**
 * @desc Check the host app.
 * @param {String} application The application name. Case-insensitive. 
 * @param {String|Number} [version] 
 *     The application version number. Add two to your CS version number.
 *     or pass in the version number as a string prefixed with 'CS', like ``app.is('indesign', 'CS5')``.
 *
 * @example
 *     alert(app.is('toolkit'));          // any version
 *     alert(app.is('indesign', 'CS2'));  // Creative Suite 2
 *     alert(app.is('indesign', 4));      // Creative Suite 2
 *     alert(app.is('indesign', '6.0'));  // Creative Suite 4.0
 */

Application.prototype.is = function (application, version) {
	if (version && version.to('lower').contains('cs')) {
		if (!application.contains('toolkit')) {
			version = version.replace(/cs/gi, "").to('int') + 2;
		}
	}
	var version = version || this.version;
	var is_app = this.name.to('lower').contains(application.to('lower'));
	var is_version = this.version.to('string').startswith(version);
	return is_app && is_version;
}

Application.prototype.isWin = function () {
  if ($.os.match(/windows/i)) {
    return true;
  }else{
    return false;
  }  
}

Application.prototype.isMac = function () {
  return !this.isWin();
}

Application.prototype.pbPaste = function (text) {
  app.scriptPreferences.enableRedraw = false;
  if (app.isMac()) {
    app.doScript ('set the clipboard to "__REPLACE__"'.replace(/__REPLACE__/, text), ScriptLanguage.APPLESCRIPT_LANGUAGE, undefined, UndoModes.entireScript);
  }else{
    if (!app.is('indesign')) {throw "pbPaste will only work in InDesign on a Windows machine."};
    app.doScript ('ensurePaste ("__REPLACE__");'.replace(/__REPLACE__/, text), undefined, undefined, UndoModes.entireScript);
  }
}

Application.prototype.pbCopy = function () {
  app.scriptPreferences.enableRedraw = false;
  if (app.isMac()) {
    return app.doScript ('return the clipboard as string', ScriptLanguage.APPLESCRIPT_LANGUAGE, undefined, UndoModes.entireScript);
  }else{
    if (!app.is('indesign')) {throw "pbCopy will only work in InDesign on a Windows machine."}
    return app.doScript ('ensureCopy ();'.replace(/__REPLACE__/, text), undefined, undefined, UndoModes.entireScript);
  }
}

function ensurePaste (text) {
  var fakeFrame = app.activeWindow.activeSpread.textFrames.add();
  fakeFrame.geometricBounds = [0,0,200,200]
  fakeFrame.contents = text;
  app.select(fakeFrame.texts.everyItem());
  app.copy();
  fakeFrame.remove();
}

function ensureCopy () {
  var fakeFrame = app.activeWindow.activeSpread.textFrames.add();
  fakeFrame.geometricBounds = [0,0,200,200]
  app.select(fakeFrame.texts.everyItem());
  app.paste();
  var theText = fakeFrame.texts.everyItem().contents;
  fakeFrame.remove();
  return theText;
}