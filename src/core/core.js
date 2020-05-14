
import render from './render';
import update from './update';
import assetsLoader from './assetsLoader';
import initialState from './state';
import { handleMouseDown, handleKeyDown } from './events';

const core = Object.create({
  width: window.innerWidth,
  height: window.innerHeight,
  canvas: document.getElementById('canvas'),
  imageMap: {},
  state: initialState
});

core.init = () => {
  const {
    canvas, width, height, imageMap, loop
  } = core;

  canvas.width = width;
  canvas.height = height;
  core.ctx = canvas.getContext('2d');

  core.attachEvents();

  assetsLoader(imageMap, loop);
};

core.attachEvents = () => {
  core.canvas.addEventListener('mousedown', core.onMouseDown);
  window.addEventListener('keydown', core.onKeyDown);
};

core.onMouseDown = evt => {
  handleMouseDown(evt, core.state);
};

core.onKeyDown = evt => {
  handleKeyDown(evt, core.state);
};

core.loop = () => {
  const { digest, draw, loop } = core;
  digest();
  draw();
  window.requestAnimationFrame(loop);
};

core.digest = () => {
  const { width, height, state } = core;
  update(width, height, state);
};

core.draw = () => {
  const {
    ctx, width, height, state: { earths, planets }, imageMap
  } = core;

  render(ctx, width, height, earths, planets, imageMap);
};

export default core;
