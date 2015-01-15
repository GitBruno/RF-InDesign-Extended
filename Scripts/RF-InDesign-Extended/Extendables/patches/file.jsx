/**
 * @class
 * @name Folder
 */

/**
 * @class
 * @name File
 */

/**
 * @desc The extendables base directory. Other notable class properties
 * include ``current``, ``desktop``, ``userData``, ``temp`` and ``trash``. 
 */
Folder.extendables = new File($.fileName).parent.parent;

function from_basepath (folder) {
	if (folder.is(String)) folder = new Folder(folder);
	
	var path = [folder.relativeURI, this.relativeURI].join('/');
	return new this.constructor(path);
}

/**
 * @function
 * @desc Get a file or folder starting from an existing path.
 * A foolproof way to join paths together.
 *
 * Similar to ``File#getRelativeURI``, but returns a new File object
 * instead of a path.
 */

File.prototype.at = from_basepath;

/**
 * @function
 * @desc Get a file or folder starting from an existing path.
 * A foolproof way to join paths together.
 *
 * Similar to ``File#getRelativeURI``, but returns a new Folder object
 * instead of a path.
 */

Folder.prototype.at = from_basepath;

/**
 * @desc Easy extraction of path, name, basename and extension from a
 * :func:`File` object.
 * @param {String} type ``path``, ``name``, ``basename`` or ``extension``
 */

File.prototype.component = function (type) {
	switch (type) {
		case 'path':
			return this.path;
		break;
		case 'name':
			return this.name;
		break;
		case 'basename':
			var extlen = this.component('extension').length;
			if (extlen) {
				return this.name.slice(0, -1 * extlen).rtrim('.');
			} else {
				return this.name;
			}
		break;
		case 'extension':
			var name = this.name.split('.');
			if (name.length > 1) {
				return name.last();
			} else {
				return '';
			}
		break;
	}
}

/**
 * @desc Works just like ``Folder#getFiles``, but returns only files, not folders.
 * @param {String|Function} [mask]
 */

Folder.prototype.files = function (mask) {
	return this.getFiles(mask).reject(function (file_or_folder) {
		return file_or_folder.is(Folder);
	});
}

/**
 * @desc Works just like ``Folder#getFiles``, but returns only folders, not files.
 * @param {String|Function} [mask]
 */

Folder.prototype.folders = function (mask) {
	return this.getFiles(mask).reject(function (file_or_folder) {
		return file_or_folder.is(File);
	});
}


// From RoboHelp library
Folder.prototype.getFilesRecursive = function() {
  var folder = this;
  var editfiles = new Array();
  var files = folder.getFiles("*.*");
  for(var i = 0; i<files.length; i++)
  {
    var tempfile = files[i];
     if (isFolder(tempfile)) {/* Load folder recursive */
       var tmpfolder = new Folder(tempfile);
       var temparray = tmpfolder.getFilesRecursive();
       editfiles = editfiles.concat(temparray);
     }
    else if(isFile(tempfile)) {
       editfiles.push(tempfile);
    }
  }
  return editfiles;
}

// From RoboHelp library
function removeFolder(folder) {
  
  var string = 'rd "'+folder.fsName+'" /s /q';
  ExecuteBatchFile(string);
  
}

// From RoboHelp library
function isFolder(folder, mustexist) {//This is a function and not a prototype because this function must be available for all data types
  if(!mustexist)
    mustexist = false;
  
  var isfolder = false;
  if(folder instanceof Folder)
  {
    isfolder = true;
    
    if(mustexist)
      if(!folder.exists)
        isfolder = false;
  }
  return isfolder
}

// From RoboHelp library
function isFile(file, mustexist) {//Check whether an object is a file object and optionally whether the file exists on the file system.
	if(!mustexist)
		mustexist = false;
	
	var isfile = false;
	if(file instanceof File)
	{
		isfile = true;
		
		if(mustexist)
			if(!file.exists)
				isfile = false;
	}
	return isfile;
}