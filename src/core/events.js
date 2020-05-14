
export const handleKeyDown = (e) => {
  console.log(e, ` ${e.code}`);
};

export const handleMouseDown = (evt, state) => {
  if (evt.buttons === 1) {
    state.earths.push({
      x: evt.clientX,
      y: evt.clientY,
      radius: 30,
      velocity: evt.clientX,
      radian: 0
    });
  }
};
