import { Link, useParams } from "react-router-dom";
import React  from "react";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import AnimatedProgressProvider from "../plugins/AnimatedProgressProvider";
import "react-circular-progressbar/dist/styles.css";
// import Commentsection from "../components/Commentsection";
import { easeQuadIn } from "d3-ease";
import "../assets/styles/style.css";
import { FaReadme } from "react-icons/fa6";
import { useGetStoryDetailsQuery , useCreateReviewMutation,} from "../slices/storysApiSlice";
import Message from "../components/Message";
import Loader from "../components/Loader";
import {
  Row,
  Col,
  ListGroup,
  Button,
  Form,
} from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
const StoryScreen = () => {
  const { id: storyId } = useParams();
  const {
    data: story,
    isLoading,
    refetch,
    error,
  } = useGetStoryDetailsQuery(storyId, {
    // Add options to populate the author field
    select: "author", // Select only the author field
    populate: "author",
  });
  
  const [comment, setComment] = React.useState('');

  const { userInfo } = useSelector((state) => state.auth);

  const [createReview, { isLoading: loadingStoryReview }] =
    useCreateReviewMutation();

  const submitHandler = async (e) => {
    e.preventDefault();
    console.log(comment);
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
        await createReview({
          storyId,
          comment,
        }).unwrap();
    
        refetch();
        toast.success("Review created successfully");
        setComment('');
      } catch (err) {
        toast.error(err?.data?.message || err.error);
      }
    }
 
  const [backgroundBlur, setBackgroundBlur] = React.useState({});
  const blurDetailsClass = `blur-details`;
  const getColor = (score) => {
    if (score >= 7.5) {
      return "#00A300"; // Green for high scores
    } else if (score >= 5.0) {
      return "#FFA500"; // Yellow for moderate scores
    } else {
      return "#FF0000"; // Red for low scores
    }
  };

  React.useEffect(() => {
    const bgCover = story?.bgCover;

    setBackgroundBlur({
      backgroundImage: `url("${bgCover || story?.cover}")`,
      width: "100vw",
      marginLeft: "calc(50% - 50vw)",
      backgroundSize: "cover",
      backgroundPosition: `${bgCover ? "" : "center"}`,
      marginBottom: "20px",
      boxShadow: `${
        bgCover
          ? "0px 0px 10px 5px rgba(0, 0, 0, 0.5)"
          : " inset 0 0 0 2000px rgba(28, 28, 28, 0.75)"
      } `,
      filter: `${bgCover ? "" : "blur(5px)"}`,
    });
  }, [story]);

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
        <Message variant="danger">
          {error?.data?.message || error.error}
        </Message>
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
            <div style={backgroundBlur}>
              <div className="blur-container">
                <div className="pseudo-blur-banner"></div>
              </div>
            </div>
            <div className={blurDetailsClass}>
              <img
                id="thumbnail-img"
                src={story.cover}
                alt="anime cover"
                className="thumbnail"
              />

              <div className="fulldetails-container">
                <div className="details-container">
                  <div className="text-container">
                    {story.title.length < 11 ? (
                      <h1 style={{ fontWeight: "normal" }}>{story.title}</h1>
                    ) : (
                      <h3 style={{ fontWeight: "normal" }}>{story.title}</h3>
                    )}

                    <p style={{ marginBottom: "1px", width: "auto" }}>
                      <strong>{story.date}</strong>
                    </p>
                    <p>
                      <strong>{story.chapters} Chapters</strong>
                    </p>
                    <Link to={`/Story/${story._id}/chapters/`}>
                      <div>
                        <button
                          style={{
                            backgroundColor: "#212529",
                            color: "#FFF",
                            textTransform: "none",
                            padding: ".6rem .7rem",
                          }}
                        >
                          <FaReadme />
                          &nbsp;Read Manga
                        </button>
                      </div>
                    </Link>
                  </div>

                  <div className="gauge-container">
                    <div className="gauge-wrapper">
                      <AnimatedProgressProvider
                        
                        valueStart={story?.rating}
                        
                        easingFunction={easeQuadIn}
                      >
                        {(value) => {
                          return (
                            <CircularProgressbar
                              value={value}
                              maxValue={10}
                              text={`${story.rating ? story.rating : "-"}`}
                              styles={buildStyles({
                                pathTransition: "none",
                                pathColor: getColor(story.rating),
                              })}
                            />
                          );
                        }}
                      </AnimatedProgressProvider>
                    </div>

                    <div className="ranked-wrapper">
                      <strong>Ranked #{story.rank || "-"}</strong>
                    </div>
                  </div>
                </div>
                <br></br>
                <div className="container-secondary">
                  <div className="thumbnail-synopsis">
                    {story.plot || "No synopsis available."}
                  </div>
                </div>
              </div>
            </div>
            <div>
              <ul className="list-group">
                <li key={1} className="list-group-item">
                  <strong> Title:</strong> {story.title || "-"}
                </li>

                <li key={2} className="list-group-item">
                  <strong>Genres:</strong> {story.genre.join(", ") || "-"}
                </li>

                <li key={3} className="list-group-item">
                  <strong>Type:</strong> {story.type || ""}
                </li>

                <li key={4} className="list-group-item">
                  <strong>Status:</strong> {story.status || "-"}
                </li>

                <li key={5} className="list-group-item">
                  <strong>Author:</strong>
                  <Link to={`/author/${story.author._id}`}>
                    {" "}
                    {story.author.name || "-"}
                  </Link>
                </li>

                <li key={6} className="list-group-item">
                  <strong>Serialization:</strong> {story.serialization || "-"}
                </li>
              </ul>
            </div>
            <div className="cards" style={{ marginTop: "10px" }}>
              {/* <Col md={3}>
              <ListGroup variant="flush" className="mb-3">
                {Array.from(
                  { length: Math.min(story.chapters, 5) },
                  (_, index) => (
                    <Link
                      to={`/Story/${story._id}/chapter/${index + 1}`}
                      key={index}
                    >
                      <ListGroup.Item
                        variant="primary"
                        className="mr-2 mb-2"
                        style={{ borderRadius: "25px" }}
                      >
                        Chapter {index + 1}
                      </ListGroup.Item>
                    </Link>
                  )
                )}
                {story.chapters > 5 && (
                  <Link to={`/Story/${story._id}`}>
                    <ListGroup.Item
                      variant="primary"
                      className="mr-2 mb-2"
                      style={{ borderRadius: "25px" }}
                    >
                      Continue...
                    </ListGroup.Item>
                  </Link>
                )}
              </ListGroup>
            </Col> */}
              {/* <Commentsection
                url={`https://md-frontend.netlify.app/story/${storyId}`} // Set the URL dynamically
                identifier={storyId} // Set the identifier dynamically
                title={story.title}
              /> */}
            </div>
            <Row className='review'>
            <Col md={12}>
              
                  {loadingStoryReview && <Loader />}

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
                        disabled={loadingStoryReview}
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
                      {story.reviews.length === 0 && <Message>No Comments</Message>}
              <ListGroup variant='flush'>
                {story.reviews.map((review) => (
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

                </ListGroup.Item>
              </ListGroup>
            </Col>
          </Row>
            <Link
              className="btn  me-4"
              style={{backgroundColor:"#000000" , color:"#ffffff" ,borderRadius: "25px"}}

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

export default StoryScreen;
