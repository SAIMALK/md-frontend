// Home.jsx
import React from "react";
import Stories from "../components/Stories"; // Adjust import statement
import "../assets/styles/style.css";
import SearchMenu from "../components/SearchMenu";
import { Link, useParams } from "react-router-dom";
import { useGetStorysQuery } from "../slices/storysApiSlice";
import Message from "../components/Message";
import Paginate from "../components/Paginate";

const Home = () => {
  const { pageNumber, keyword} = useParams();

  const { data, isLoading, error } = useGetStorysQuery({ 
    keyword, pageNumber });
  return (
    <>
    {keyword &&  <Link to="/" className="btn "               style={{backgroundColor:"#000000" , color:"#ffffff"}}>
    <strong>Go Back</strong>
              </Link>}
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
          <SearchMenu />
          {data?.storys?.length === 0 ? <h1>No Stories Found</h1>:null}
          <div style={{ marginTop: "50px" }}>
            <ul className="image-gallery">
              <div>
                <div className="cards">
                  {data.storys?.map((story) => (
                    <Stories key={story._id} story={story} />
                  ))}
                </div>
                
              </div>
            </ul>
          </div>
          <Paginate pages={data.pages} page={data.page} keyword={keyword ? keyword : ''}  />
          
        </>
      )}
    </> 
  );
};

export default Home;
