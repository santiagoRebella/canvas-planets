import { detectCircleCollision, isInside } from './helpers';

const collide = arr => {
  let ball;
  let testBall;
  for (let i = 0; i < arr.length; i += 1) {
    ball = arr[i];
    for (let j = i + 1; j < arr.length; j += 1) {
      testBall = arr[j];
      if (detectCircleCollision(ball, testBall)) {
        ball.color = 'rgba(255,0,0,0.8)';
        testBall.color = 'rgba(255,0,0,0.8)';
      }
    }
  }
};

export default (width, height, state) => {
  const { earths, planets } = state;

  for (let i = 0; i < earths.length; i += 1) {
    if (isInside(width, height, earths[i].x, earths[i].y)) {
      earths[i] = {
        ...earths[i],
        y: earths[i].y + 0.05 * earths[i].y / 10,
        radian: earths[i].radian + earths[i].velocity
      };
    } else {
      earths.splice(i, 1);
    }
  }

  for (let i = 0; i < planets.length; i += 1) {
    planets[i] = {
      ...planets[i],
      radian: planets[i].radian + planets[i].velocity
    };

    for (let j = 0; j < planets[i].moons.length; j += 1) {
      planets[i].moons[j] = {
        ...planets[i].moons[j],
        radian: planets[i].moons[j].radian + planets[i].moons[j].velocity
      };
    }
  }

  collide(state.earths);
};
