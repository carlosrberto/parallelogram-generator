export const getDistance = ([ax, ay], [bx, by]) => Math.sqrt(
  Math.pow(bx - ax, 2) + Math.pow(by - ay, 2), /* eslint-disable-line no-restricted-properties */
);

export const isTriangle = (a, b, c) => {
  const ab = getDistance(a, b);
  const bc = getDistance(b, c);
  const ca = getDistance(c, a);

  return (
    ab + bc > ca
    && ab + ca > bc
    && bc + ca > ab
  );
};

export const getTrianglePointsOrder = (...points) => points;

export const getAllPossibleParallelogramFourthPoint = ([ax, ay], [bx, by], [cx, cy]) => {
  const dx = ax + bx - cx;
  const dy = ay + by - cy;

  const ex = cx - bx + ax;
  const ey = cy - by + ay;

  const fx = cx - ax + bx;
  const fy = cy - ay + by;

  return [[dx, dy], [ex, ey], [fx, fy]];
};

export const getParallelogramFromTriangle = (...points) => {
  const trianglePoints = getTrianglePointsOrder(...points);
  const possiblePoints = getAllPossibleParallelogramFourthPoint(
    ...trianglePoints,
  );

  return [trianglePoints, possiblePoints];
};

export const getMidPoint = ([ax, ay], [bx, by]) => [(ax + bx) / 2, (ay + by) / 2];

export const getParallelogramArea = ([ax, ay], [bx, by], [cx, cy], [dx, dy]) => Math.abs((
  (ax * by - ay * bx)
    + (bx * cy - by * cx)
    + (cx * dy - cy * dx)
    + (dx * ay - dy * ax)
) / 2);

export const getAllParallelogramCombinations = (a, b, c, d, e, f) => [
  [a, b, c, e, getMidPoint(b, e), getParallelogramArea(a, b, c, e)],
  [a, c, b, d, getMidPoint(a, b), getParallelogramArea(a, c, b, d)],
  [b, a, c, f, getMidPoint(a, f), getParallelogramArea(b, a, c, f)],
];

export const getCircleRadius = a => Math.sqrt(a / Math.PI);

export const isPointInsideCircle = (px, py, cx, cy, r) => getDistance([px, py], [cx, cy]) <= r;
