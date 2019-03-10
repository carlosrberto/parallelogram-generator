const getDistance = (a, b) => {
  const [ax, ay] = a;
  const [bx, by] = b;
  return Math.sqrt(Math.pow(bx - ax, 2) + Math.pow(by - ay, 2));
}

const isTriangle = (a, b, c) => {
  const ab = getDistance(a, b);
  const bc = getDistance(b, c);
  const ca = getDistance(c, a);

  return (
    ab + bc > ca &&
    ab + ca > bc &&
    bc + ca > ab
  );
}

const getTrianglePointsOrder = (...points) => {
  let newA;
  let newB;
  let newC;

  // sort by Y
  let [p1, p2, p3] = points.sort((a, b) => a[1] - b[1]);
  let rest;

  // two points in the same Y position
  if(p1[1] === p2[1]) {
    // get that with greater X
    if(p1[0] > p2[0]) {
      newB = p1;
      rest = [p2, p3];
    } else {
      newB = p2;
      rest = [p1, p3];
    }
  } else {
    newB = p1;
    rest = [p2, p3];
  }

  // the same X position
  if(rest[0][0] === rest[1][0]) {
    // get the lower Y
    if(rest[0][1] < rest[1][1]) {
      newC = rest[0];
      newA = rest[1];
    } else {
      newC = rest[1];
      newA = rest[0];
    }
  } else {
    if(rest[0][0] < rest[1][0]) {
      newA = rest[0];
      newC = rest[1];
    } else {
      newA = rest[1];
      newC = rest[0];
    }
  }

  return [newA, newB, newC];
}

const createCanvas = (options = {
  width: 900,
  height: 600
}) => {
  const canvas = document.createElement('canvas');
  canvas.width = options.width;
  canvas.height = options.height;

  return { canvas, context: canvas.getContext('2d') }
}

const circle = context => ({ x, y, r }) => {
  context.beginPath();
  context.arc(x, y, r, 0, 2 * Math.PI);
  context.stroke();
}

const parallelogram = context => ({ aX, aY, bX, bY, cX, cY, dX, dY }) => {
    context.beginPath();
    context.moveTo(aX, aY);
    context.lineTo(bX, bY);
    context.lineTo(cX, cY);
    context.lineTo(dX, dY);
    context.lineTo(aX, aY);
    context.closePath();
    context.stroke();

    console.log(aX, aY, bX, bY, cX, cY, dX, dY);
}

const renderCanvas = (canvas, target) => target.appendChild(canvas);

document.addEventListener('DOMContentLoaded', () => {
  const { canvas, context } = createCanvas({ width: 900, height: 600 });
  const drawCircle = circle(context);
  const drawParallelogram = parallelogram(context);

  renderCanvas(canvas, document.getElementById('root'));

  drawCircle({ x: 200, y: 300, r: 11 });
  drawCircle({ x: 100, y: 400, r: 11 });
  drawCircle({ x: 300, y: 500, r: 11 });

  drawParallelogram({ aX: 157, aY: 145, bX: 2, bY: 145, cX: 81.6, cY: 2, dX: 235.3, dY: 2 });
});
