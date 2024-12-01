import React, { useState, useEffect } from "react";
import Stories from "../components/Stories";
import "../assets/styles/style.css";
import SearchMenu from "../components/SearchMenu";
import { Link, useParams } from "react-router-dom";
import { useGetStorysQuery } from "../slices/storysApiSlice";
import Message from "../components/Message";
import Paginate from "../components/Paginate";

const Home = () => {
  const { pageNumber, keyword: urlKeyword } = useParams();
  const [filteredStories, setFilteredStories] = useState([]);
  const { data, isLoading, error } = useGetStorysQuery({
    keyword: urlKeyword,
    pageNumber,
  });

  useEffect(() => {
    if (data?.storys) {
      setFilteredStories(data.storys); // Show all stories by default
    }
  }, [data]);

  const handleFilter = (type) => {
    if (type === "All") {
      setFilteredStories(data.storys); // Reset to all stories
    } else {
      const filtered = data.storys.filter((story) => story.type === type);
      setFilteredStories(filtered);
    }
  };

  return (
    <>
      {urlKeyword && (
        <Link
          to="/"
          className="btn"
          style={{ backgroundColor: "#000000", color: "#ffffff" }}
        >
          <strong>Go Back</strong>
        </Link>
      )}
      {isLoading ? (
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
      ) : error ? (
        <Message variant="danger">
          {error?.data?.message || error.error}
        </Message>
      ) : (
        <>
          <SearchMenu onFilter={handleFilter} />
          {filteredStories.length === 0 ? (
            <h1>No Stories Found</h1>
          ) : (
            <div style={{ marginTop: "50px" }}>
              <ul className="image-gallery">
                <div>
                  <div className="cards">
                    {filteredStories.map((story) => (
                      <Stories key={story._id} story={story} />
                    ))}
                  </div>
                </div>
              </ul>
            </div>
          )}
          <Paginate
            pages={data.pages}
            page={data.page}
            keyword={urlKeyword || ""}
          />
        </>
      )}
    </>
  );
};

export default Home;
