/* eslint-disable import/prefer-default-export */
export const getMousePoint = (element, event) => {
  const rect = element.getBoundingClientRect();
  return [event.clientX - rect.left, event.clientY - rect.top];
};
