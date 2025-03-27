
import { useRef, useState, useEffect } from "react";
import classNames from "classnames/bind";
import styles from "../../Pages/Home/Home.module.scss";

import useIsInViewport from "../../hooks/useIsInViewport";


const cn = classNames.bind(styles);
const VideoCard = ({
  index,
  author,
  videoURL,
  authorLink,
  lastVideoIndex,
  getVideos,
}) => {
  const video = useRef();
  const isInViewport = useIsInViewport(video);
  const [loadNewVidsAt, setloadNewVidsAt] = useState(lastVideoIndex);

  if (isInViewport) {
    setTimeout(() => {
      video.current.play();
    }, 1000);

    if (loadNewVidsAt === Number(video.current.id)) {
      setloadNewVidsAt((prev) => prev + 2);
      getVideos(3);
    }
  }

  const togglePlay = () => {
    let currentVideo = video.current;
    if (currentVideo.paused) {
      currentVideo.play();
    } else {
      currentVideo.pause();
    }
  };

  useEffect(() => {
    if (!isInViewport) {
      video.current.pause();
    }
  }, [isInViewport]);

  return (
    <div className={cn("slider-children")}>
      <video
        muted
        className={cn("video")}
        ref={video}
        onClick={togglePlay}
        id={index}
        autoPlay={index === 1}
      >
        <source src={videoURL} type="video/mp4" />
      </video>
      <div className={cn("video-content")} onClick={togglePlay}>
        <p>@{author}</p>
        <p>
          Video by <a href={authorLink}>{author} </a> on Pexel
        </p>
      </div>
    </div>
  );
};

export default VideoCard;