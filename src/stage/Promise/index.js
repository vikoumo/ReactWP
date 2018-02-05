// 构造器
const loadImageAsync = (url) => {
  return new Promise((resolve, reject) => {
    const image = new Image();
    image.onload = () => {
      resolve(image);
    };
    image.onError = () => {
      reject(new Error(`could not load${url}`));
    };
    image.src = url;
  });
};
