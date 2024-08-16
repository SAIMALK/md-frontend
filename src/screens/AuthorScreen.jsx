import { Link, useParams } from "react-router-dom";
import React from "react";
import Commentsection from "../components/Commentsection";
import { useGetAuthorDetailsQuery, } from "../slices/authorApiSlice";
import { useGetStoriesByAuthorIdQuery } from "../slices/storysApiSlice";
import Message from '../components/Message';
import Stories from "../components/Stories";
import "../assets/styles/style.css";


const AuthorScreen = () => {
  const { id :authorId } = useParams();
const { data:author, isLoading , error } = useGetAuthorDetailsQuery(authorId);
const { data:storry, isLoading: storiesLoading, error: storiesError } = useGetStoriesByAuthorIdQuery(authorId);
  return (
    <div className="row">
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
        <Message variant='danger'>{error?.data?.message || error.error}</Message>
      ) : (
        <>
          <div
            className="col-md-12"
            style={{
              marginBottom: "20px",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <div >
              <div className="blur-container" style={{width:"200px" , height: "270px"}}>
                <div className="pseudo-blur-banner"></div>
              </div>
            </div>
            <div className='blur-details'>
              <img
                id="thumbnail-img"
                src={author.image}
                alt="author cover"
                className="thumbnail"
              />

              <div className="fulldetails-container">
                <div className="details-container">
                  <div className="text-container">
                    {author.name.length < 11 ? (
                      <h1 style={{ fontWeight: "normal" }}>{author.name}</h1>
                    ) : (
                      <h3 style={{ fontWeight: "normal" }}>{author.name}</h3>
                    )}
                    <p style={{marginBottom: '1px',marginLeft:'0%', width: 'auto'}}><strong>Birthday:  Tuesday, July 4, 1978</strong></p>

                  </div>
                </div>
                <br></br>
                <div className="container-secondary">
                <div className="thumbnail-synopsis">
                <p >Gol D. Roger, a man referred to as the 'King of the Pirates,' is set to be executed by the World Government. But just before his demise, he confirms the existence of a great treasure, One Piece, located somewhere within the vast ocean known as the Grand Line. Announcing that One Piece can be claimed by anyone worthy enough to reach it, the King of the Pirates is executed and the Great Age of Pirates begins. Twenty-two years later, a young man by the name of Monkey D. Luffy is ready to embark on his own adventure, searching for One Piece and striving to become the new King of the Pirates. Armed with just a straw hat, a small boat, and an elastic body, he sets out on a fantastic journey to gather his own crew and a worthy ship that will take them across the Grand Line to claim the greatest status on the high seas.</p>
                </div>
              </div>
              </div>
            </div>
            <br></br>            <br></br>
            <br></br>
            <br></br>
            <br></br>
            {storiesLoading ? (
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
            ) : storiesError ? (
              <Message variant='danger'>{storiesError?.data?.message || storiesError.error}</Message>
            ) : (
              <>
              <div style={{marginTop:'50px'}}>

                <ul className="image-gallery">
                <h2>All Stories by {author.name}</h2>
                <div className="cards">
                  {storry?.map(story => (
                    <Stories key={story._id} story={story} />
                  ))}
                </div>
                </ul>
                </div>
              </>
            )}
            <Commentsection 
  url={`https://md-frontend.up.railway.app/author/${authorId}`} // Adjust the URL to include the correct endpoint for fetching comments related to the author
  identifier={authorId} // Set the identifier dynamically
  title={author.name}
/>

            <Link
              className="btn me-4"
              style={{backgroundColor:"#000000" , color:"#ffffff" , borderRadius: "25px"}}
              to="/"
            >
              Go Back
            </Link>
          </div>
        </>
      )}
    </div>
  );
};

export default AuthorScreen;
