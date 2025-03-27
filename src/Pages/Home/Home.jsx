
import { useEffect, useState } from "react";
import BottomNav from "../../components/HomeVideo/BottomNav";
import VideoCard from "../../components/HomeVideo/VideoCard";
import classNames from "classnames/bind";
import styles from "./Home.module.scss";

const cn = classNames.bind(styles);
function Home({ index }) {
    const [videos, setvideos] = useState([]);

  const getVideos = (length) => {
    let newVideos = Array.from(Array(length).keys());
    setvideos((oldVideos) => [...oldVideos, ...newVideos]);
  };


  useEffect(() => {
    getVideos(3);
  }, []);

    return (
    <main className={cn("wrapper")}>

        <div className={cn("container")}>
        {videos.length > 0 ? (
          <>
            {videos.map((video, id) => (
            <VideoCard
            key={id}
            index={id + 1}
            lastVideoIndex={videos.length - 1}
            getVideos={getVideos}
        />))}

            
          </>
        ) : (
          <>
            <h1>Nothing to show here</h1>
          </>
        )}
      </div>
      <BottomNav/>
    </main>
  );
}

export default Home;
