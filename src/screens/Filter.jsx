import React, { useEffect, useState } from "react";
import Stories from "../components/Stories";
import Loader from '../components/Loader';
import { useGetStorysQuery } from "../slices/storysApiSlice";

const Filter = () => {
  const { data, isLoading, error } = useGetStorysQuery({fetchAll:'true'});
  const [completedStories, setCompletedStories] = useState([]);
  const [filteredCompleted, setFilteredCompleted] = useState([]);

  useEffect(() => {
    if (data && data.storys) {
      setCompletedStories(data.storys);
      setFilteredCompleted(data.storys); // Initially set filtered stories to all completed stories
    }
  }, [data]);

  const handleFilterOngoing = () => {
    const filtered = completedStories.filter(
      (story) => story.status === "Ongoing"
    );
    setFilteredCompleted(filtered);
  };

  const handleFilterCompleted = () => {
    const filtered = completedStories.filter(
      (story) => story.status === "Completed"
    );
    setFilteredCompleted(filtered);
  };

  if (isLoading) {
    return <Loader />;
  }

  if (error) {
    return <div>Error fetching stories</div>;
  }

  return (
    <div style={{ marginTop: "50px" }}>
      <ul className="image-gallery">
        <div>
          <h2>Completed Stories</h2>
          <button
            className="btn btn-light"
            style={{ marginRight: "10px", marginBottom: "10px" }}
            onClick={handleFilterOngoing}
          >
            Filter Ongoing
          </button>
          <button
            className="btn btn-light"
            style={{ marginLeft: "90px", marginBottom: "10px" }}
            onClick={handleFilterCompleted}
          >
            Filter Completed
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
            {filteredCompleted.map((story) => (
              <Stories key={story._id} story={story} />
            ))}
          </div>
        </div>
      </ul>
    </div>
  );
};

export default Filter;
