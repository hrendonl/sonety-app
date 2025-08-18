export const getImageYoutube = (url) => {
    url = url.split("=");
    return `https://i.ytimg.com/vi/${url[1]}/mqdefault.jpg`;
  };
