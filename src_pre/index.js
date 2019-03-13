import { createCanvas, render } from './canvas';
import { createStore } from './state';
import { isPointInsideCircle } from './geometry';
import { getMousePoint } from './mouse';

const createCanvasStateHandler = (canvas, store) => {
  let pointIndex;

  canvas.addEventListener('click', (event) => {
    const point = getMousePoint(canvas, event);
    store.addPoint([...point, 11]);
  });

  canvas.addEventListener('mousedown', (event) => {
    const state = store.getState();
    const [px, py] = getMousePoint(canvas, event);
    state.points.find(([x, y, r], i) => {
      if (isPointInsideCircle(px, py, x, y, r)) {
        pointIndex = i;
        return true;
      }
    });
  });

  canvas.addEventListener('mousemove', (event) => {
    if (pointIndex !== undefined && pointIndex !== null) {
      const [px, py] = getMousePoint(canvas, event);
      store.updatePoint(pointIndex, [px, py, 11]);
    }
  });

  canvas.addEventListener('mouseup', (event) => {
    pointIndex = null;
  });
};

document.addEventListener('DOMContentLoaded', () => {
  const { canvas, context } = createCanvas({ width: 900, height: 700 }, document.getElementById('root'));
  const renderCanvas = render(canvas, context);
  const store = createStore();
  const canvasHandler = createCanvasStateHandler(canvas, store);

  store.subscribe((state) => {
    // console.log(JSON.stringify(state, null, 2));
    renderCanvas(state);
  });
});
