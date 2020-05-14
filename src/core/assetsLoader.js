import sunImg from '../assets/sun-2.png';
import p1Img from '../assets/p-1.png';
import p2Img from '../assets/p-2.png';
import p3Img from '../assets/p-3.png';
import p4Img from '../assets/p-4.png';
import p5Img from '../assets/p-5.png';
import p6Img from '../assets/p-6.png';
import p7Img from '../assets/p-7.png';
import p8Img from '../assets/p-8.png';

export const imagesList = [
  { name: 'sun', src: sunImg },
  { name: 'mercury', src: p1Img },
  { name: 'venus', src: p2Img },
  { name: 'earth', src: p3Img },
  { name: 'mars', src: p4Img },
  { name: 'jupiter', src: p5Img },
  { name: 'saturn', src: p6Img },
  { name: 'uranus', src: p7Img },
  { name: 'neptune', src: p8Img },
  { name: 'moon', src: 'https://mdn.mozillademos.org/files/1443/Canvas_moon.png' }
];

export default (images, next) => {
  let loaded = 0;
  const total = imagesList.length;

  imagesList.forEach((image) => {
    const img = new Image();
    img.src = image.src;
    img.onload = () => {
      images[image.name] = img;
      loaded += 1;

      if (total === loaded) {
        document.getElementById('canvas').removeAttribute('class');
        next();
      }
    };
  });
};
