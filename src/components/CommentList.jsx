import Axios from "axios";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { Input, InputGroup, InputRightElement, Button, Flex, Text, Box } from "@chakra-ui/react";

const CommentList = () => {
  const { search } = useLocation();
  const videoId = search.split("=")[1];
  const [commentData, setCommentData] = useState([]);
  const [commentToUpload, setCommentToUpload] = useState("");

  const comments = () => {
    Axios.get(import.meta.env.VITE_API_URL + `/comments/${videoId}`)
      .then((response) => {
        setCommentData(response.data.data);
      })
      .catch((error) => {
        console.error("Comments error ...", error.message);
      });
  };

  useEffect(() => {
    comments();
  }, []);

  const showComments = () => {
    return commentData.map((comment) => {
      return (
        <>
          <Flex>
            <Text fontWeight="bold" mr="1">
              {comment.username}
            </Text>
            <Text>{comment.comment}</Text>
          </Flex>
        </>
      );
    });
  };

  const uploadComment = () => {
    Axios.post(import.meta.env.VITE_API_URL + `/upload-comment/${videoId}`, { comment: commentToUpload })
      .then((response) => {
        console.log("upload: comment ...", response.data.data);
        comments();
        setCommentToUpload("");
      })
      .catch((error) => {
        console.error("Error", error.message);
      });
  };

  return (
    <>
      <Box mt="5">{showComments()}</Box>
      <InputGroup mb="5">
        <Input variant="flushed" placeholder="Add your comment here ..." onChange={(e) => setCommentToUpload(e.target.value)} />
        <InputRightElement>
          <Button colorScheme="teal" variant="ghost" onClick={uploadComment}>
            Post
          </Button>
        </InputRightElement>
      </InputGroup>
    </>
  );
};

export default CommentList;
