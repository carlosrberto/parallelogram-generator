/* eslint-disable no-param-reassign */
import {
  getParallelogramFromTriangle,
  getAllParallelogramCombinations,
  getCircleRadius,
} from '~/shared/utils/geometry';

export const COLORS = {
  RED: '#A60000',
  BLUE: '#1437AD',
  YELLOW: '#FFC600',
  BLACK: '#000000',
  WHITE: '#FFFFFF',
  GRAY: '#637381',
  GRAY_ALPHA: 'rgba(99, 115, 129, 0.9)',
};

const ALIGN = {
  TOP: 'top',
  RIGHT: 'right',
  BOTTOM: 'bottom',
  LEFT: 'left',
};

const applyOptions = (context, options) => {
  Object.keys(options).reduce((ctx, key) => {
    ctx[key] = options[key];
    return ctx;
  }, context);
};


const circle = (context, options = {}) => (x, y, r) => {
  context.save();
  applyOptions(context, options);
  context.beginPath();
  context.arc(x, y, r, 0, 2 * Math.PI);
  if (options.fillStyle) {
    context.fill();
  }
  context.stroke();
  context.restore();
};

const parallelogram = (context, options = {}) => (a, b, c, d) => {
  const [ax, ay] = a;
  const [bx, by] = b;
  const [cx, cy] = c;
  const [dx, dy] = d;
  context.save();
  applyOptions(context, options);
  context.beginPath();
  context.moveTo(ax, ay);
  context.lineTo(bx, by);
  context.lineTo(cx, cy);
  context.lineTo(dx, dy);
  context.lineTo(ax, ay);
  context.closePath();
  context.stroke();
  context.restore();
};

const pointLabel = context => (x, y, align = ALIGN.RIGHT, text) => {
  const fontSize = 11;
  const padding = 3;

  context.save();
  context.font = `${fontSize}px Arial`;

  const rectWidth = context.measureText(text).width + 2 * padding;
  const rectHeight = fontSize * 1.5 + 2 * padding;
  let newX = x;
  let newY = y;

  switch (align) {
    case ALIGN.RIGHT:
      newX = x + 10;
      newY = y - (rectHeight / 2);
      break;
    case ALIGN.BOTTOM:
      newX = x - (rectWidth / 2);
      newY = y + 10;
      break;
    default:
      newX = x + 10;
      newY = y - (rectHeight / 2);
      break;
  }

  context.fillStyle = COLORS.GRAY_ALPHA;
  context.fillRect(newX, newY, rectWidth, rectHeight);
  context.fillStyle = COLORS.WHITE;
  context.fillText(text, newX + padding, newY + fontSize + padding);
  context.restore();
};

const drawSelectedPoints = (context, points) => {
  const drawCircle = circle(context, {
    strokeStyle: COLORS.RED,
    fillStyle: COLORS.RED,
  });
  const drawText = pointLabel(context);

  points.forEach(([x, y, r]) => {
    drawCircle(x, y, r);
    drawText(x, y, ALIGN.RIGHT, `(x: ${parseInt(x, 10)}, y: ${parseInt(y, 10)})`);
  });
};

export const draw = canvas => (state) => {
  const context = canvas.getContext('2d');
  const drawBlackCircle = circle(context, {
    strokeStyle: COLORS.BLACK,
    fillStyle: COLORS.BLACK,
  });
  const drawYellowCircle = circle(context, { strokeStyle: COLORS.YELLOW });
  const drawParallelogram = parallelogram(context, { strokeStyle: COLORS.BLUE });
  const drawText = pointLabel(context);

  context.clearRect(0, 0, canvas.width, canvas.height);

  if (state.points.length < 3) {
    drawSelectedPoints(context, state.points);
    return;
  }

  const [trianglePoints, possiblePoints] = getParallelogramFromTriangle(...state.points);
  const allParallelograms = getAllParallelogramCombinations(...trianglePoints, ...possiblePoints);

  allParallelograms.filter((v, i) => {
    if (state.showAllParallelogram) {
      return true;
    }
    return i === 0;
  }).forEach(([a, b, c, d, m, area]) => {
    const [mx, my] = m;
    drawBlackCircle(mx, my, 2);
    drawText(mx, my, ALIGN.BOTTOM, `Area: ${parseInt(area, 10)}`);
    drawYellowCircle(mx, my, getCircleRadius(area));
    drawParallelogram(a, b, c, d);
  });

  drawSelectedPoints(context, trianglePoints);
};
