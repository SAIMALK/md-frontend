import React, { useState, useEffect } from "react";
import Stories from "../components/Stories";
import Loader from '../components/Loader';
import { useGetStorysQuery } from "../slices/storysApiSlice";

const Genre = () => {


  const { data, isLoading, error } = useGetStorysQuery({ fetchAll: 'true' });
  const [completedStories, setCompletedStories] = useState([]);
  const [filteredCompleted, setFilteredCompleted] = useState([]);
  const [selectedGenre, setSelectedGenre] = useState(null);
  const [genres, setGenres] = useState([]);

  useEffect(() => {
    if (data && data.storys) {
      const stories = data.storys;
      setCompletedStories(stories);
      setFilteredCompleted(stories);

      // Extract unique genres from the data
      const uniqueGenres = [...new Set(stories.flatMap((story) => story.genre))];
      setGenres(uniqueGenres);
    }
  }, [data]);

  const handleFilterByGenre = (genre) => {
    if (genre === selectedGenre) {
      setSelectedGenre(null); // Deselect the current genre
      setFilteredCompleted(completedStories); // Reset to show all stories
    } else if (genre === null) {
      setFilteredCompleted(completedStories); // Reset to show all stories
      setSelectedGenre(null); // Deselect the current genre
    } else {
      const filtered = completedStories.filter((story) =>
        story.genre.includes(genre)
      );
      setFilteredCompleted(filtered);
      setSelectedGenre(genre);
    }
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
          <h2>Genre of Stories</h2>
          {genres.map((genre) => (
            <button
              key={genre}
              className="btn btn-light"
              style={{ marginRight: "10px", marginBottom: "10px" }}
              onClick={() => handleFilterByGenre(genre)}
            >
              {genre}
            </button>
          ))}

          <button
            className="btn btn-light"
            style={{ marginLeft: "10px", marginBottom: "10px" }}
            onClick={() => handleFilterByGenre(null)}
          >
            Default
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

export default Genre;
