/**
 */
export const getBlockBoundingClientRect = b => {
  let { top, left, right, bottom, height, width } = b.getBoundingClientRect();
  return { top, left, right, bottom, height, width };
};

/**
 */
export const getIntersectionRect = (b, c) => {
  let offsetTop = b.top > c.top ? b.top - c.top : 0;
  let offsetBottom = c.bottom > b.bottom ? c.bottom - b.bottom : 0;
  let offsetLeft = b.left > c.left ? b.left - c.left : 0;
  let offsetRight = c.right > b.right ? c.right - b.right : 0;
  let offsetX = offsetRight - offsetLeft;
  let offsetY = offsetBottom - offsetTop;

  return {
    y: c.height - offsetY,
    x: c.width - offsetX,
    offsetX,
    offsetY
  };
};

/**
 */
export const checkIntersection = (b, c) => {
  let bRect = getBlockBoundingClientRect(b);
  let cRect = getBlockBoundingClientRect(c);
  let intersectionRect = getIntersectionRect(bRect, cRect);

  return {
    isIntersect: intersectionRect.x > 0 && intersectionRect.y > 0,
    isCoverAll:
      intersectionRect.x >= cRect.width && intersectionRect.y >= cRect.height,
    offsetX: intersectionRect.offsetX,
    offsetY: intersectionRect.offsetY
  };
};