import { Link } from 'react-router-dom';

const Stories = ({ story, isLoading }) => {
  return (
    isLoading ? (
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
    ) : (
      <li className="zoomed-landing-page">
        <Link to={`/story/${story._id}`}>
          <img
            src={story.cover}
            alt="loading cover..."
            loading="lazy"
            style={{ width: "190px" }}
          />
        </Link>
        <Link to={`/story/${story._id}`}>
          <div className="overlay">
            <span style={{ color: "white" }}>{story.title}</span>
          </div>
        </Link>
      </li>
    )
  );
};

export default Stories;
