/* eslint-disable import/prefer-default-export */
/* eslint-disable no-param-reassign */
export const applyParentSize = (node) => {
  const { parentNode } = node;
  node.width = parentNode.offsetWidth;
  node.height = parentNode.offsetHeight;
};

export const getMousePoint = (element, event) => {
  const rect = element.getBoundingClientRect();
  return [event.clientX - rect.left, event.clientY - rect.top];
};
