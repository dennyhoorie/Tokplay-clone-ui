import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Axios from "axios";
import { Box, Image, Grid } from "@chakra-ui/react";

function VideoList({ productsData }) {
  const [videoData, setVideoData] = useState([]);
  const [videoSearched, setVideoSearched] = useState([]);
  const navigate = useNavigate();

  const getVideos = () => {
    Axios.get(import.meta.env.VITE_API_URL + `/all-videos`)
      .then((response) => {
        setVideoData(response.data.data);
      })
      .catch((error) => {
        console.error("unable to get all videos", error.message);
      });
  };

  const searchVideo = (id) => {
    Axios.get(import.meta.env.VITE_API_URL + `/video-searched?id=${id}`)
      .then((response) => {
        setVideoSearched(response.data.data);
      })
      .catch((error) => {
        console.error("unable to get all videos", error.message);
      });
  };

  useEffect(() => {
    getVideos();
  }, []);

  useEffect(() => {
    if (productsData.length > 0) {
      const videoId = productsData[0].videoID;
      searchVideo(videoId);
    }
  }, [productsData]);

  function showVideo(videos) {
    return videos.map((video) => {
      return (
        <Box className="video" w={[300, 400, 500]}>
          <Image key={video.id} src={video.thumbnailUrl} onClick={() => navigate(`/video-detail?id=${video.videoID}`)} />
        </Box>
      );
    });
  }

  return <div className="videos-container">{productsData.length > 0 ? showVideo(videoSearched) : showVideo(videoData)}</div>;
}

export default VideoList;
