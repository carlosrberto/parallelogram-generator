/* eslint-disable import/prefer-default-export */
/* eslint-disable no-param-reassign */
export const applyParentSize = (node) => {
  const { parentNode } = node;
  node.width = parentNode.offsetWidth;
  node.height = parentNode.offsetHeight;
};

export const getMousePoint = (element, event) => {
  const rect = element.getBoundingClientRect();
  let x;
  let y;

  if (event.touches) {
    x = event.touches[0].clientX;
    y = event.touches[0].clientY;
  } else {
    x = event.clientX;
    y = event.clientY;
  }

  return [x - rect.left, y - rect.top];
};
