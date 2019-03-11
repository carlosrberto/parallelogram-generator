export const createCanvas = (options = { width: 900, height: 600  }) => {
  const canvas = document.createElement('canvas');
  canvas.width = options.width;
  canvas.height = options.height;

  return { canvas, context: canvas.getContext('2d') }
}

export const circle = context => (x, y, r) => {
  context.beginPath();
  context.arc(x, y, r, 0, 2 * Math.PI);
  context.stroke();
}

export const parallelogram = context => (a, b, c, d) => {
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

export const renderCanvas = (canvas, target) => target.appendChild(canvas);
