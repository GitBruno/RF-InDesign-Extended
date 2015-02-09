JSON.pretty_generate = function(object) {
  return JSON.stringify(object, undefined, '  ');
}