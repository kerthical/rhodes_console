import React, { useEffect, useState } from 'react';

const Wallpaper = (props: { className: string }) => {
  const [wallpaper, setWallpaper] = useState<number>();

  useEffect(() => {
    setWallpaper(Math.floor(Math.random() * 4));
  }, []);

  if (wallpaper === undefined) return null;

  return (
    <img
      className={props.className}
      src={`/images/wallpapers/${wallpaper}.jpg`}
      alt=''
    />
  );
};

export default Wallpaper;