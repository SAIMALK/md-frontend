import { Link, useParams } from "react-router-dom";
import React from "react";
import {
  Row,
  Col,
  ListGroup,
  Button,
  Form,
} from 'react-bootstrap';
import Loader from "../components/Loader";
// import Commentsection from "../components/Commentsection";
import { useGetAuthorDetailsQuery,useCreateRevMutation } from "../slices/authorApiSlice";
import { useGetStoriesByAuthorIdQuery } from "../slices/storysApiSlice";
import Message from '../components/Message';
import Stories from "../components/Stories";
import "../assets/styles/style.css";
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';

const AuthorScreen = () => {
  const { id :authorId } = useParams();
const { data:author, isLoading , error, refetch} = useGetAuthorDetailsQuery(authorId);
const { data:storry, isLoading: storiesLoading, error: storiesError } = useGetStoriesByAuthorIdQuery(authorId);

const [comment, setComment] = React.useState('');

const { userInfo } = useSelector((state) => state.auth);

const [createReview, { isLoading: loadingAuthorReview }] =
  useCreateRevMutation();

const submitHandler = async (e) => {
  e.preventDefault();

  fetch("https://md-fastapi.duckdns.org/predict", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ sentence: comment }),
  })
    .then(response => response.json())
    .then(data => {
      console.log("Response from Python API:", data);
      if (data.prediction  === "positive") {
        // Only if the response is positive, proceed to step 2
        sendToJsApi(comment);
      }
      else {
        toast.error("Negative comment detected.");
        console.log("Negative comment detected. Not sending to JS API.");}
    })
    .catch(error => console.error("Error:", error));
  }
  async function sendToJsApi(comment) {                  
    try {
      console.log("Sending to JS API:", comment,authorId);
      await createReview({
        authorId,
        comment,
      }).unwrap();
      refetch();
      toast.success("Review created successfully");
      setComment('');
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  }

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
                <p >Gol D. Roger, a man referred to as the King of the Pirates, is set to be executed by the World Government. But just before his demise, he confirms the existence of a great treasure, One Piece, located somewhere within the vast ocean known as the Grand Line. Announcing that One Piece can be claimed by anyone worthy enough to reach it, the King of the Pirates is executed and the Great Age of Pirates begins. Twenty-two years later, a young man by the name of Monkey D. Luffy is ready to embark on his own adventure, searching for One Piece and striving to become the new King of the Pirates. Armed with just a straw hat, a small boat, and an elastic body, he sets out on a fantastic journey to gather his own crew and a worthy ship that will take them across the Grand Line to claim the greatest status on the high seas.</p>
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
            {/* <Commentsection 
  url={`https://md-frontend.netlify.app/author/${authorId}`} // Adjust the URL to include the correct endpoint for fetching comments related to the author
  identifier={authorId} // Set the identifier dynamically
  title={author.name}
/> */}

<Row className='review'>
            <Col md={12}>
            <p style={{
            fontSize: '2.5rem',                // Larger font size for emphasis
            color: '#2C3E50',                  // Darker color for better readability
            textAlign: 'center',                // Center align the text
            margin: '40px 0',                  // More margin to separate from other elements
            fontFamily: 'Arial, sans-serif',    // Clean font family
            position: 'relative',               // Position for the decorative elements
            textTransform: 'uppercase',         // Uppercase text for a bold look
            letterSpacing: '2px'                // Spacing between letters
        }}>
            Comments
            <span style={{
                display: 'block',
                width: '70%',                    // Wider decorative line
                height: '6px',                   // Thicker line for emphasis
                backgroundColor: '#fff',      // Accent color
                margin: '10px auto',             // Centering the line
                borderRadius: '5px',             // Rounded edges
                boxShadow: '0 2px 5px rgba(0, 0, 0, 0.2)' // Subtle shadow for depth
            }}></span>
        </p>
                      {author.reviews.length === 0 && <Message>No Comments</Message>}
              <ListGroup variant='flush'>
                {author.reviews.map((review) => (
                  <ListGroup.Item key={review._id}>
                    <strong>{review.name}</strong>
                    <p>{review.createdAt.substring(0, 10)}</p>
                    <p>{review.comment}</p>
                  </ListGroup.Item>
                ))}
                <ListGroup.Item>
                <p style={{
            fontSize: '2.5rem',                // Larger font size for emphasis
            color: '#2C3E50',                  // Darker color for better readability
            textAlign: 'center',                // Center align the text
            margin: '40px 0',                  // More margin to separate from other elements
            fontFamily: 'Arial, sans-serif',    // Clean font family
            position: 'relative',               // Position for the decorative elements
            textTransform: 'uppercase',         // Uppercase text for a bold look
            letterSpacing: '2px'                // Spacing between letters
        }}>
           Write A Comment
            <span style={{
                display: 'block',
                width: '70%',                    // Wider decorative line
                height: '6px',                   // Thicker line for emphasis
                backgroundColor: '#000',      // Accent color
                margin: '10px auto',             // Centering the line
                borderRadius: '5px',             // Rounded edges
                boxShadow: '0 2px 5px rgba(0, 0, 0, 0.7)' // Subtle shadow for depth
            }}></span>
            
        </p>

                  {loadingAuthorReview && <Loader />}

                  {userInfo ? (
                    <Form onSubmit={submitHandler}>
                      <Form.Group className='my-2' controlId='comment'>
                        <Form.Label style={{fontSize: '2.5rem',}}>➹C➷</Form.Label>
                        <Form.Control
                          as='textarea'
                          row='3'
                          required
                          placeholder="Write a comment..."
                          value={comment}
                          onChange={(e) => setComment(e.target.value)}
                        ></Form.Control>
                      </Form.Group>
                      <Button
                        disabled={loadingAuthorReview}
                        type='submit'
                        variant='primary'
                      >
                        Submit
                      </Button>
                    </Form>
                  ) : (
                    <Message>
                      Please <Link to='/login'>sign in</Link> to write a comment
                    </Message>
                  )}
                </ListGroup.Item>
              </ListGroup>
            </Col>
          </Row>

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
