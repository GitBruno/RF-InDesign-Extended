var _round = Math.round;
Math.round = function(number, decimals /* optional, default 0 */)
{
  if (arguments.length == 1)
    return _round(number);

  var multiplier = Math.pow(10, decimals);
  return _round(number * multiplier) / multiplier;
};