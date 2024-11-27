import ScrollContainer from "react-indiana-drag-scroll";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import React, { useState } from "react";

function SearchMenu() {
  const navigate = useNavigate();
  const { keyword: urlKeyword } = useParams();

  // FIX: uncontrolled input - urlKeyword may be undefined
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
        <div className="jumbotron" style={{ height: "161px" }}>
          <br />
          <p className="lead">Look For Any Manga Story!</p>
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
              style={{ width: "90%", borderRadius: "25px" ,backgroundColor:"#000000" , color:"#ffffff"}}
              type="submit"
            >
              Search
            </button>
            
          </div>
          </form>
        </div>
        <br />
        <hr className="separator"></hr>
        <div className="container text-center mt-4">
          <p className="lead">Top</p>
        </div>

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
                id="manga"
                autoComplete="off"
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
