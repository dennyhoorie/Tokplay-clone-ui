import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import CommentList from "../components/CommentList";
import { Text, Image, Box, Card, CardBody, Button } from "@chakra-ui/react";
import Axios from "axios";

function VideoDetail() {
  const { search } = useLocation();
  const videoId = search.split("=")[1];

  const [thumbnail, setThumbnail] = useState("");
  const [productsData, setProductsData] = useState([]);

  const videoDetail = () => {
    const videoData = Axios.get(import.meta.env.VITE_API_URL + `/one-video/${videoId}`)
      .then((response) => {
        // console.log("video detail data", response.data.videoDetail[0].thumbnailUrl);
        const imgUrl = response.data.videoDetail[0].thumbnailUrl;
        setThumbnail(imgUrl.split("/")[4]);
      })
      .catch((error) => console.error(error.message));
  };

  const products = () => {
    Axios.get(import.meta.env.VITE_API_URL + `/products/${videoId}`)
      .then((response) => {
        setProductsData(response.data.data);
      })
      .catch((error) => {
        console.error("unable to get product", error.message);
      });
  };

  useEffect(() => {
    videoDetail();
    products();
  }, []);

  const showProductsData = () => {
    return productsData.map((product) => {
      return (
        <>
          <Card shadow='lg'>
            <CardBody>
              <Image shadow='lg' boxSize="200px" src={product.imgUrl} />
              <Text mt='4'>Rp {product.price}</Text>
            </CardBody>
          </Card>
        </>
      );
    });
  };

  return (
    <>
      <iframe
        width="1000"
        height="600"
        src={"https://www.youtube.com/embed/" + thumbnail}
        title="YouTube video player"
        frameborder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowFullScreen
      ></iframe>
      <CommentList />
      <Text fontSize="3xl">Products Related</Text>
      <Box className="product-list">
        {showProductsData()}
      </Box>
    </>
  );
}

export default VideoDetail;
