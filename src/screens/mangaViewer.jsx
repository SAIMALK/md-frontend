import React, { useState, useEffect } from "react";
// import axios from "axios";
const chapter=['002.png','003.png','004.jpg','005.jpg','006.jpg','007.jpg','008.png'
,'009.jpg','010.jpg','011.jpg','012.jpg','013.jpg','014.png','015.jpg','016.png','017.jpg','018.jpg'
,'019.png','020.jpg','021.jpg','022.jpg','023.jpg','024.png','025.png','217.png','218.png']

const MangaViewer = () => {
  const [imageUrls, setImageUrls] = useState(chapter);
  const [error, setError] = useState(null);
  const [no, setNo] = useState(1); // Initial value of no

  // useEffect(() => {
  //   const fetchImages = async () => {
  //     try {
  //       const response = await axios.get(`/boss/ch${no}`);
  //       console.log(response);
  //       setImageUrls(response.data); // Assuming response.data is an array of image filenames
  //       scrollToTop(); // Scroll to top after fetching images
  //     } catch (error) {
  //       console.error("Error fetching images:", error);
  //       setError("Failed to fetch images. Please try again later.");
  //     }
  //   };

  //   fetchImages();
  // }, [no]); // Fetch images whenever 'no' changes

  const handleNextClick = () => {
    if (no < 5) {
      setNo(no + 1); // Increment 'no' if it's less than 5
    }
  };

  const handlePrevClick = () => {
    if (no > 1) {
      setNo(no - 1); // Decrement 'no' only if it's greater than 1
    }
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <>
      <div>
        {error && <p>{error}</p>}
        {imageUrls.length > 0 ? (
          imageUrls.map((url, index) => (
            <img
              key={index}
              src={`/boss/ch${no}/${url}`} // Assuming "url" is the image filename
              alt={`Page ${index + 1}`}
              style={{ width: "100%", height: "auto" }}
            />
          ))
        ) : (
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              minHeight: "80vh",
            }}
          >
            <span className="loader"></span>
          </div>
        )}
      </div>
      <div>
        <button
          className="btn btn-light pagination-prev"
          style={{ backgroundColor: "rgba(0, 0, 0, 0.8)", color: "white" }}
          onClick={() => {
            handlePrevClick();
            scrollToTop();
          }}
        >
          Previous
        </button>
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        <button
          className="btn btn-light pagination-next"
          style={{
            backgroundColor: "rgba(0, 0, 0, 0.8)",
            color: "white",
            marginLeft: "70%",
          }}
          onClick={() => {
            handleNextClick();
            scrollToTop();
          }}
        >
          Next
        </button>
      </div>
    </>
  );
};

export default MangaViewer;
