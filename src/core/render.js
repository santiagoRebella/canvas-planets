let sunAccumulator = 0;

export default (ctx, width, height, earths, planets, imageMap) => {
  ctx.globalCompositeOperation = 'destination-over';
  ctx.clearRect(0, 0, width, height);

  ctx.font = '32px sans-serif';
  ctx.fillStyle = '#FFFFFF';
  ctx.fillText(
    `falling planets ${earths.length}`,
    5,
    50,
    800
  );

  ctx.fillStyle = 'rgba(0,0,0,0.4)';
  ctx.strokeStyle = 'rgba(0,153,255,0.4)';

  for (let i = 0; i < planets.length; i += 1) {
    ctx.save();
    ctx.translate(width / 2, height / 2);
    ctx.rotate((planets[i].radian * Math.PI) / 60000);
    ctx.translate(planets[i].distanceToSun, 0);
    ctx.drawImage(
      imageMap[planets[i].name],
      -imageMap[planets[i].name].naturalWidth / 2,
      -imageMap[planets[i].name].naturalHeight / 2
    );

    if (planets[i].moons.length) {
      for (let j = 0; j < planets[i].moons.length; j += 1) {
        ctx.save();
        ctx.rotate((planets[i].moons[j].radian * Math.PI) / 60000);
        ctx.translate(0, planets[i].moons[j].distanceToPlanet);
        ctx.drawImage(imageMap[planets[i].moons[j].name], -3.5, -3.5);
        ctx.restore();
      }
    }

    ctx.restore();
  }

  for (let i = 0; i < earths.length; i += 1) {
    const item = earths[i];
    ctx.save();
    ctx.translate(item.x, item.y);
    ctx.rotate((earths[i].radian * Math.PI) / 60000);
    ctx.translate(0, 30);
    ctx.drawImage(imageMap.moon, -imageMap.moon.naturalWidth / 2, -imageMap.moon.naturalHeight / 2);
    ctx.restore();

    ctx.save();
    ctx.drawImage(
      imageMap.earth,
      item.x - imageMap.earth.naturalWidth / 2,
      item.y - imageMap.earth.naturalHeight / 2
    );
    ctx.fillStyle = 'rgba(0,0,0,0.4)';
    ctx.strokeStyle = item.color ? item.color : 'rgba(0,153,255,0.4)';
    ctx.beginPath();
    ctx.arc(item.x, item.y, item.radius, 0, 2 * Math.PI);
    ctx.stroke();
    ctx.restore();
  }

  ctx.save();
  ctx.translate(width / 2, height / 2);
  sunAccumulator -= 500;
  ctx.rotate((sunAccumulator * Math.PI) / 60000);
  ctx.translate(0, 0);
  ctx.drawImage(
    imageMap.sun,
    -imageMap.sun.naturalWidth / 2,
    -imageMap.sun.naturalHeight / 2
  );
  ctx.restore();
};
