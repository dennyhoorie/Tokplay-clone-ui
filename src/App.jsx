import "./App.css";
import { Routes, Route } from "react-router-dom";
import VideoDetail from "./pages/VideoDetail";
import Homepage from "./pages/Homepage";

function App() {


  return (
    <>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/video-detail" element={<VideoDetail />} />
      </Routes>
    </>
  );
}

export default App;