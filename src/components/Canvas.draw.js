import {
  getParallelogramFromTriangle,
  getAllParallelogramCombinations,
  getCircleRadius,
} from '~/shared/utils/geometry';

export const circle = context => (x, y, r) => {
  context.beginPath();
  context.arc(x, y, r, 0, 2 * Math.PI);
  context.stroke();
};

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
};

export const text = context => (x, y, t) => context.fillText(t, x, y);

export const draw = canvas => (state) => {
  const context = canvas.getContext('2d');
  const drawCircle = circle(context);
  const drawParallelogram = parallelogram(context);
  const drawText = text(context);

  context.clearRect(0, 0, canvas.width, canvas.height);

  if (state.points.length < 3) {
    state.points.forEach(([x, y, r]) => {
      drawCircle(x, y, r);
      drawText(x + 14, y + 2, `(${x}, ${y})`);
    });

    return;
  }

  const [trianglePoints, possiblePoints] = getParallelogramFromTriangle(...state.points);

  trianglePoints.forEach(([x, y, r]) => {
    drawCircle(x, y, r);
    drawText(x + 14, y + 2, `(${x}, ${y})`);
  });

  const allParallelograms = getAllParallelogramCombinations(...trianglePoints, ...possiblePoints);

  allParallelograms.filter((v, i) => {
    if (state.showAllParallelogram) {
      return true;
    }
    return i === 0;
  }).forEach(([a, b, c, d, m, area]) => {
    const [mx, my] = m;
    drawCircle(mx, my, 3);
    drawCircle(mx, my, getCircleRadius(area));
    drawParallelogram(a, b, c, d);
  });
};
