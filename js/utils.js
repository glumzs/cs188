function hexc(colorval) {
    console.log("col is: " + colorval);
    var parts = colorval.match(/^rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*(0\.\d+))?\)$/);
    delete(parts[0]);
    for (var i = 1; i <= 3; ++i) {
        parts[i] = parseInt(parts[i]).toString(16);
        if (parts[i].length == 1) parts[i] = '0' + parts[i];
    }
    color = '#' + parts.join('');
}

var RGBtoHEX = function(color) {
  return "#"+$.map(color.match(/\b(\d+)\b/g),function(digit){
    return ('0' + parseInt(digit).toString(16)).slice(-2)
  }).join('');
};