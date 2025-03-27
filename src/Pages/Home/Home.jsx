
import { useEffect, useState } from "react";
import BottomNav from "../../components/HomeVideo/BottomNav";
import VideoCard from "../../components/HomeVideo/VideoCard";
import classNames from "classnames/bind";
import styles from "./Home.module.scss";


import { createClient } from "pexels";

const cn = classNames.bind(styles);
function Home({ index }) {
    const [videos, setvideos] = useState([]);
  const [videosLoaded, setvideosLoaded] = useState(false);

  const randomQuery = () => {
    const queries = ["Art", "Animals", "Coding", "Space", "Nature", "Music", "Science", "Technology", "Food", "Travel", "Architecture", "Software", "AI"];
    return queries[Math.floor(Math.random() * queries.length)];
  };
  const getVideos = (length) => {
    // Replace with your Pexels API Key
    const client = createClient("l11NXAx4g5cCT03ePb0WbvC5sJWy5Ghbdpx9OFGDZZ3hMNhj5AYl4Axa");

    const query = randomQuery();
    client.videos
      .search({ query, per_page: length })
      .then((result) => {
        setvideos((oldVideos) => [...oldVideos, ...result.videos]);
        setvideosLoaded(true);
      })
      .catch((e) => setvideosLoaded(false));
  };


  useEffect(() => {
    getVideos(3);
  }, []);

    return (
    <main 
    className={cn("wrapper")}
    >

        <div className={cn("container")}>
            <div className={cn("slider-container")}>
            {videos.length > 0 ? (
                <>
              {videos.map((video, id) => (
                  <VideoCard
                  key={id}
                  index={id}
                author={video.user.name}
                videoURL={video.video_files[0].link}
                authorLink={video.user.url}
                lastVideoIndex={videos.length - 1}
                getVideos={getVideos}
                />
            ))}
            <BottomNav/>
          </>
        ): (
            <>
                <h1>Nothing to show here</h1>
            </>
            )}
            </div>
      </div>
    </main>
  );
}

export default Home;
