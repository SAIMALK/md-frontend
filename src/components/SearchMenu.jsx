import ScrollContainer from "react-indiana-drag-scroll";
import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

function SearchMenu({ onFilter }) {
  const { keyword: urlKeyword } = useParams();
  const navigate = useNavigate();

  // Control search input
  const [keyword, setKeyword] = useState(urlKeyword || "");

  const submitHandler = (e) => {
    e.preventDefault();
    if (keyword) {
      navigate(`/search/${keyword.trim()}`);
      setKeyword("");
    } else {
      navigate("/");
    }
  };

  return (
    <div>
      <div className="container text-center">
        {/* Search Box */}
        <div className="jumbotron" style={{ height: "161px" }}>
          <br />
          <p className="lead">
            <strong>Look For Any Manga Story!</strong>
          </p>
          <form onSubmit={submitHandler}>
            <div className="mb-4">
              <input
                type="text"
                className="form-control"
                placeholder="Start typing here..."
                name="q"
                onChange={(e) => setKeyword(e.target.value)}
                value={keyword}
                style={{ borderRadius: "25px" }}
              />
            </div>

            <div className="d-flex justify-content-center">
              <button
                className="btn"
                style={{
                  width: "90%",
                  borderRadius: "25px",
                  backgroundColor: "#000000",
                  color: "#ffffff",
                }}
                type="submit"
              >
                Search
              </button>
            </div>
          </form>
        </div>

        <br />
        <hr className="separator" style={{ padding: "3px" }}></hr>

        {/* Filter Buttons */}
        <ScrollContainer className="inputToggles">
          <div className="inputToggleContainer">
            <div
              className="btn-group mb-4"
              role="group"
              aria-label="Basic radio toggle button group"
            >
              <input
                type="radio"
                className="btn-check"
                name="btnradio"
                id="all"
                autoComplete="off"
                onClick={() => onFilter("All")}
              />
              <label className="btn btn-outline-dark" htmlFor="all">
                All
              </label>
              <input
                type="radio"
                className="btn-check"
                name="btnradio"
                id="manga"
                autoComplete="off"
                onClick={() => onFilter("Manga")}
              />
              <label className="btn btn-outline-dark" htmlFor="manga">
                Manga
              </label>

              <input
                type="radio"
                className="btn-check"
                name="btnradio"
                id="manhwa"
                autoComplete="off"
                onClick={() => onFilter("Manhwa")}
              />
              <label className="btn btn-outline-dark" htmlFor="manhwa">
                Manhwa
              </label>
            </div>
          </div>
        </ScrollContainer>
      </div>
    </div>
  );
}

export default SearchMenu;
