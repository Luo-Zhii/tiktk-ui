import { useRef, useState } from "react";
import classNames from "classnames/bind";
import styles from "../../Pages/Home/Home.module.scss";

import useIsInViewport from "../../hooks/useIsInViewport";




const cn = classNames.bind(styles);
const VideoCard = ({ index, lastVideoIndex, getVideos }) => {
  const elementRef = useRef();
  const isInViewport = useIsInViewport(elementRef);
  const [loadNewVidsAt, setloadNewVidsAt] = useState(lastVideoIndex);

  if (isInViewport) {
    if (loadNewVidsAt === Number(elementRef.current.id)) {
      setloadNewVidsAt((prev) => prev + 2);
      getVideos(3);
    }
  }

  return (
    <div className="slider-children">
      <div
        ref={elementRef}
        id={index}
        style={{
          justifyContent: "center",
          alignItems: "center",
          display: "flex",
          height: "100%",
        }}
      >
        <h1>Video {index}</h1>
      </div>
    </div>
  );
};

export default VideoCard;