import SearchBar from "../components/SearchBar";
import VideoList from "../components/VideoList";
import { Text } from "@chakra-ui/react";
import { useState } from "react";

function Homepage() {
  const [searchedProductsData, setSearchedProductsData] = useState([]);

  const handleSearch = (searchData) => {
    setSearchedProductsData(searchData);
  };

  return (
    <>
      <Text fontSize="4xl">TokPlay</Text>
      <VideoList productsData={searchedProductsData} />
    </>
  );
}

export default Homepage;

