const num = 30;
const width = 600;
const height = 400;
const points = generate_points();

// ランダムな点生成
function generate_points() {
  const points = [];
  for (let i = 0; i < num; i++) {
    let x = Math.random() * width;
    let y = Math.random() * height;
    let coord = [x, y];
    points.push(coord);
  }
  return points_check(points);
}

// 生成点の重複チェック
function points_check(points) {
  let set = new Set(points);
  if (set.size !== points.length) {
    // 重複ありの場合
    return generate_points();
  } else {
    // 重複なしの場合
    return points;
  }
}

// 生成点の描画
const ctx = document.getElementById('canvas').getContext('2d');
ctx.clearRect(0, 0, ctx.canvas.clientWidth, ctx.canvas.clientHeight); // リセット

for (let j = 0; j < points.length; j++) {
  ctx.beginPath();
  ctx.fillStyle = 'black';
  if (j == 0) {
    ctx.fillStyle = 'red';
  }
  ctx.arc(points[j][0], points[j][1], 4, 0, Math.PI * 4, false);
  ctx.fill();
}

// 最短距離にある点の算出・線の描画
distance(points[0], points);

function distance(target, points) {
  // target削除
  points.splice(points.indexOf(target), 1);

  // 全点との二乗距離算出
  let distances = [];
  for (let k = 0; k < points.length; k++) {
    let distance = (target[0] - points[k][0]) ** 2 + (target[1] - points[k][1]) ** 2;
    distances.push(distance);
  }

  // 最小点の算出
  let aryMin = function (a, b) {
    return Math.min(a, b);
  }
  let min = distances.reduce(aryMin);
  let minPoint = points[distances.indexOf(min)];

  // 2点間を線で結ぶ
  ctx.beginPath();
  ctx.moveTo(target[0], target[1]);
  ctx.lineTo(minPoint[0], minPoint[1]);
  ctx.stroke();

  // 次の点での処理(再帰的に)
  if (points.length !== 0) {
    distance(minPoint, points);
  }
}