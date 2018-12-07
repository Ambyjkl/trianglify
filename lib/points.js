function generate_grid(width, height, bleed_x, bleed_y, cell_size, variance, rand_fn) {
  var half_cell_size = cell_size * 0.5;
  var w = width + bleed_x;
  var ww = w + half_cell_size;
  var h = height + bleed_y;
  var hh = h + half_cell_size;
  var double_v = variance * 2;
  var negative_v = -variance;

  var points = new Float64Array(~~((w + bleed_x) / cell_size * (h + bleed_y) / cell_size) * 2);
  var index = 0, j;
  for (var i = -bleed_x + half_cell_size; i < ww; i += cell_size) {
    for (j = -bleed_y + half_cell_size; j < hh; j += cell_size) {
      var x = i + (rand_fn() * double_v + negative_v);
      var y = j + (rand_fn() * double_v + negative_v);
      points[index++] = ~~x;
      points[index++] = ~~y;
    }
  }

  return points;
}

function transform_points(points) {
  var transformed = new Float64Array(points.length * 2);

  for (var i = 0, j = 0, cur; (cur = points[i]); i++) {
    transformed[j++] = cur[0];
    transformed[j++] = cur[1];
  }

  return transformed;
}

module.exports.generate_grid = generate_grid;
module.exports.transform_points = transform_points;
