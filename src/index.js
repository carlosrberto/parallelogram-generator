import { createCanvas, circle, parallelogram, renderCanvas } from './canvas';
import { getParallelogramFromTriangle, getAllParallelogramCombinations } from './geometry';

document.addEventListener('DOMContentLoaded', () => {
  const { canvas, context } = createCanvas({ width: 900, height: 700 });
  const drawCircle = circle(context);
  const drawParallelogram = parallelogram(context);

  renderCanvas(canvas, document.getElementById('root'));

  {
    const [trianglePoints, possiblePoints] = getParallelogramFromTriangle([100, 100], [200, 200], [100,300]);
    trianglePoints.forEach(([x, y]) => drawCircle(x, y, 11));

    const allParallelograms = getAllParallelogramCombinations(...trianglePoints, ...possiblePoints);
    allParallelograms.forEach(points => drawParallelogram(...points));
  }

  {
    const data = [[8, 6], [8, 9], [11,12]].map(v => v.map(i => i*45));
    const [trianglePoints, possiblePoints] = getParallelogramFromTriangle(...data);
    trianglePoints.forEach(([x, y]) => drawCircle(x, y, 11));

    const allParallelograms = getAllParallelogramCombinations(...trianglePoints, ...possiblePoints);
    allParallelograms.forEach(points => drawParallelogram(...points));
  }

  {
    const data = [[15, 1], [15, 3], [13,3]].map(v => v.map(i => i*40));
    const [trianglePoints, possiblePoints] = getParallelogramFromTriangle(...data);
    trianglePoints.forEach(([x, y]) => drawCircle(x, y, 11));

    const allParallelograms = getAllParallelogramCombinations(...trianglePoints, ...possiblePoints);
    allParallelograms.forEach(points => drawParallelogram(...points));
  }
});
