import React, { useState, useEffect } from "react";
import Stories from "../components/Stories";
import Loader from '../components/Loader';
import { useGetStorysQuery } from "../slices/storysApiSlice";

const Type = () => {
 

  const { data, isLoading, error } = useGetStorysQuery({ fetchAll: 'true'});
  console.log(data)
  const [completedStories, setCompletedStories] = useState([]);
  const [filteredCompleted, setFilteredCompleted] = useState(null);

  useEffect(() => {
    if (data && data.storys) {
      setCompletedStories(data.storys);
      setFilteredCompleted(data.storys); // Initially set filtered stories to all completed stories
    }
  }, [data]);

  const handleFilterOngoing = () => {
    const filtered = completedStories.filter((story) => story.type === "Novel");
    setFilteredCompleted(filtered);
  };

  const handleFilterCompleted = () => {
    const filtered = completedStories.filter((story) => story.type === "Story");
    setFilteredCompleted(filtered);
  };

  if (isLoading) {
    return <Loader />;
  }

  if (error) {
    console.log(error)
    return <div>Error fetching stories</div>;
  }

  return (
    <div style={{ marginTop: "50px" }}>
      <ul className="image-gallery">
        <div>
          <h2>Type of Stories</h2>
          <button
            className="btn btn-light"
            style={{ marginRight: "10px", marginBottom: "10px" }}
            onClick={handleFilterOngoing}
          >
            Filter Novel
          </button>
          <button
            className="btn btn-light"
            style={{ marginLeft: "90px", marginBottom: "10px" }}
            onClick={handleFilterCompleted}
          >
            Filter Stories
          </button>
          <button
            className="btn btn-light"
            style={{ marginLeft: "90px", marginBottom: "10px" }}
            onClick={() => setFilteredCompleted(completedStories)}
          >
            Filter Show All
          </button>

          <hr />
          <div className="cards">
            {filteredCompleted && filteredCompleted.map((story) => (
              <Stories key={story._id} story={story} />
            ))}
          </div>
        </div>
      </ul>
    </div>

  );
};

export default Type;
