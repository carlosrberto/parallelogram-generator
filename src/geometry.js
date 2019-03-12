export const getDistance = ([ax, ay], [bx, by]) =>
  Math.sqrt(Math.pow(bx - ax, 2) + Math.pow(by - ay, 2));

export const isTriangle = (a, b, c) => {
  const ab = getDistance(a, b);
  const bc = getDistance(b, c);
  const ca = getDistance(c, a);

  return (
    ab + bc > ca &&
    ab + ca > bc &&
    bc + ca > ab
  );
}

export const getTrianglePointsOrder = (...points) => {
  return points;
  let newA;
  let newB;
  let newC;

  // sort by Y
  let [p1, p2, p3] = points.sort((a, b) => b[1] - a[1]);
  let rest;

  // find point B
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

  // find point A and C
  // the same X position
  if(rest[0][0] === rest[1][0]) {
    // C will be that with higher Y
    if(rest[0][1] > rest[1][1]) {
      newC = rest[0];
      newA = rest[1];
    } else {
      newC = rest[1];
      newA = rest[0];
    }
  } else {
    // A will be that with lower X
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

export const getAllPossibleParallelogramFourthPoint = ([ax, ay], [bx, by], [cx, cy]) => {
  const dx = ax + bx - cx;
  const dy = ay + by - cy;

  const ex = cx - bx + ax;
  const ey = cy - by + ay;

  const fx = cx - ax + bx;
  const fy = cy - ay + by;

  return [[dx, dy], [ex, ey], [fx, fy]];
}

export const getParallelogramFromTriangle = (...points) => {
  const trianglePoints = getTrianglePointsOrder(...points);
  const possiblePoints = getAllPossibleParallelogramFourthPoint(
    ...trianglePoints,
  );

  return [trianglePoints, possiblePoints];
}

export const getMidPoint = ([ax, ay], [bx, by]) =>
  [(ax + bx) / 2, (ay + by) /2];

export const getParallelogramArea = ([ax, ay], [bx, by], [cx, cy], [dx, dy]) =>
  Math.abs((
    (ax * by - ay * bx) +
    (bx * cy - by * cx) +
    (cx * dy - cy * dx) +
    (dx * ay - dy * ax)
  ) / 2);

export const getAllParallelogramCombinations = (a, b, c, d, e, f) => [
  [a, b, c, e, getMidPoint(b, e), getParallelogramArea(a, b, c, e)],
  [a, c, b, d, getMidPoint(a, b), getParallelogramArea(a, c, b, d)],
  [b, a, c, f, getMidPoint(a, f), getParallelogramArea(b, a, c, f)],
];

export const getCircleRadius = a => Math.sqrt(a/Math.PI);

export const isPointInsideCircle = (px, py, cx, cy, r) => getDistance([px, py], [cx, cy]) <= r;
