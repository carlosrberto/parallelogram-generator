export const getDistance = (a, b) => {
  const [ax, ay] = a;
  const [bx, by] = b;
  return Math.sqrt(Math.pow(bx - ax, 2) + Math.pow(by - ay, 2));
}

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

export const getAllPossibleParallelogramFourthPoint = (a, b, c) => {
  const [ax, ay] = a;
  const [bx, by] = b;
  const [cx, cy] = c;

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

console.log(getTrianglePointsOrder([5,8], [9,6], [14,7]));
console.log(getParallelogramFromTriangle([5,8], [9,6], [14,7]));

console.log(getTrianglePointsOrder([1,1], [2,2], [1,3]));
console.log(getParallelogramFromTriangle([1,1], [2,2], [1,3]));
