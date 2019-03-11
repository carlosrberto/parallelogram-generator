const createCanvas = (options = {
  width: 900,
  height: 600
}) => {
  const canvas = document.createElement('canvas');
  canvas.width = options.width;
  canvas.height = options.height;

  return { canvas, context: canvas.getContext('2d') }
}

const circle = context => (x, y, r) => {
  context.beginPath();
  context.arc(x, y, r, 0, 2 * Math.PI);
  context.stroke();
}

const parallelogram = context => (a, b, c, d) => {
  const [ax, ay] = a;
  const [bx, by] = b;
  const [cx, cy] = c;
  const [dx, dy] = d;
  context.beginPath();
  context.moveTo(ax, ay);
  context.lineTo(bx, by);
  context.lineTo(cx, cy);
  context.lineTo(dx, dy);
  context.lineTo(ax, ay);
  context.closePath();
  context.stroke();
}

const renderCanvas = (canvas, target) => target.appendChild(canvas);

document.addEventListener('DOMContentLoaded', () => {
  const { canvas, context } = createCanvas({ width: 900, height: 600 });
  const drawCircle = circle(context);
  const drawParallelogram = parallelogram(context);

  renderCanvas(canvas, document.getElementById('root'));

  drawCircle(50, 80, 4);
  drawCircle(90, 60, 4);
  drawCircle(140, 70, 4);

  drawParallelogram([157, 145], [2, 145], [81.6, 2], [235.3, 2]);
});
