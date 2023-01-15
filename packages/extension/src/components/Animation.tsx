import { Image, Layer, RegularPolygon, Stage } from "react-konva";
import { animate } from "framer-motion";
import { useEffect, useMemo, useState } from "react";

const Animation = (props: {
  className: string;
  width: number;
  height: number;
}) => {
  const [imageSize, setImageSize] = useState(0);
  const [polygonOpacity, setPolygonOpacity] = useState(0);
  const [polygonRadius1, setPolygonRadius1] = useState(0);
  const [polygonRadius2, setPolygonRadius2] = useState(0);
  const [polygonRadius3, setPolygonRadius3] = useState(0);
  const [polygonRadius4, setPolygonRadius4] = useState(0);

  useEffect(() => {
    animate(0, 128, {
      ease: "circOut",
      duration: 0.7,
      onUpdate: (latest) => setImageSize(latest),
    });

    animate(0, 1, {
      ease: "linear",
      duration: 0.1,
      onUpdate: (latest) => setPolygonOpacity(latest),
    });
    animate(1, 0, {
      ease: "linear",
      duration: 0.1,
      delay: 0.1,
      onUpdate: (latest) => setPolygonOpacity(latest),
    });
    animate(0, 1, {
      ease: "linear",
      duration: 0.1,
      delay: 0.2,
      onUpdate: (latest) => setPolygonOpacity(latest),
    });
    animate(1, 0, {
      ease: "linear",
      duration: 0.1,
      delay: 0.3,
      onUpdate: (latest) => setPolygonOpacity(latest),
    });
    animate(0, 1, {
      ease: "linear",
      duration: 0.1,
      delay: 0.4,
      onUpdate: (latest) => setPolygonOpacity(latest),
    });

    animate(256, 128, {
      ease: "circOut",
      duration: 0.7,
      delay: 0.3,
      onUpdate: (latest) => setPolygonRadius1(latest),
    });
    animate(280, 152, {
      ease: "circOut",
      duration: 0.7,
      delay: 0.4,
      onUpdate: (latest) => setPolygonRadius2(latest),
    });
    animate(304, 176, {
      ease: "circOut",
      duration: 0.7,
      delay: 0.5,
      onUpdate: (latest) => setPolygonRadius3(latest),
    });
    animate(0, 1, {
      ease: "circOut",
      duration: 0.7,
      delay: 0.6,
      onUpdate: (latest) => setPolygonRadius4(latest),
    });
  }, []);

  const image = useMemo(() => {
    const img = new window.Image();
    img.src = "/images/rhodes_island.png";

    return img;
  }, []);

  const yCenter = props.height / 2 + 12;
  const xCenter = props.width / 2;

  return (
    <Stage
      className={props.className}
      width={props.width}
      height={props.height}
    >
      <Layer opacity={polygonOpacity} x={xCenter} y={yCenter}>
        <RegularPolygon
          sides={3}
          radius={polygonRadius1}
          stroke="white"
          strokeWidth={1}
        />
        <RegularPolygon
          sides={3}
          radius={polygonRadius2}
          stroke="white"
          strokeWidth={1}
        />
        <RegularPolygon
          sides={3}
          radius={polygonRadius3}
          stroke="white"
          strokeWidth={1}
        />
      </Layer>
      <Layer
        x={xCenter}
        y={yCenter}
        scale={{ x: polygonRadius4, y: polygonRadius4 }}
      >
        <RegularPolygon
          x={0}
          y={Math.sin(Math.PI / 2) * 100 * -1}
          sides={3}
          radius={6}
          fill="white"
        />
        <RegularPolygon
          x={Math.cos((Math.PI * 11) / 6) * 100 * -1}
          y={Math.sin((Math.PI * 11) / 6) * 100 * -1}
          sides={3}
          radius={6}
          fill="white"
        />
        <RegularPolygon
          x={Math.cos((Math.PI * 7) / 6) * 100 * -1}
          y={Math.sin((Math.PI * 7) / 6) * 100 * -1}
          sides={3}
          radius={6}
          fill="white"
        />
      </Layer>
      <Layer>
        <Image
          x={xCenter - imageSize / 2}
          y={props.height / 2 - imageSize / 2}
          width={imageSize}
          height={imageSize}
          image={image}
        />
      </Layer>
    </Stage>
  );
};

export default Animation;
