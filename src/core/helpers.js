export const isInside = (width, height, x, y) => (y > 0 && y < height && x > 0 && x < width);

export const detectCircleCollision = (circle1, circle2) => {
  const dx = circle1.x - circle2.x;
  const dy = circle1.y - circle2.y;
  const distance = dx * dx + dy * dy;

  return distance <= (circle1.radius + circle2.radius) * (circle1.radius + circle2.radius);
};