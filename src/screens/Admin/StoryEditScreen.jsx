import { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Form, Button } from "react-bootstrap";
import Message from "../../components/Message";
import Loader from "../../components/Loader";
import FormContainer from "../../components/FormContainer";
import { toast } from "react-toastify";
import {
  useGetStoryDetailsQuery,
  useUpdateStoryMutation,
  useUploadStoryCoverMutation,
} from "../../slices/storysApiSlice";

const StoryEditScreen = () => {
  const { id: storyId } = useParams();

  const [title, setTitle] = useState("");
  const [type, setType] = useState("");
  const [cover, setCover] = useState("");
  const [status, setStatus] = useState("");
  const [genre, setGenre] = useState("");
  const [chapters, setChapters] = useState(0);
  const [rank, setRank] = useState(0);
  const [rating, setRating] = useState(0);
  const [date, setDate] = useState("");
  const [author, setAuthor] = useState("");
  const [plot, setPlot] = useState("");

  const {
    data: story,
    isLoading,
    refetch,
    error,
  } = useGetStoryDetailsQuery(storyId);

  const [updateStory, { isLoading: loadingUpdate }] = useUpdateStoryMutation();

  const [uploadStoryCover, { isLoading: loadingUpload }] =
    useUploadStoryCoverMutation();

  const navigate = useNavigate();

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      await updateStory({
        storyId,
        title,
        genre,
        type,
        status,
        cover,
        plot,
        rank,
        rating,
        chapters,
        date,
        author
      }).unwrap(); // NOTE: here we need to unwrap the Promise to catch any rejection in our catch block
      toast.success("Story updated");
      refetch();
      navigate("/admin/storylist");
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };

  useEffect(() => {
    if (story) {
      setTitle(story.title);
      setType(story.type);
      setCover(story.cover);
      setStatus(story.status);
      setGenre(story.genre);
      setChapters(story.chapters);
      setPlot(story.plot);
      setRank(story.rank);
      setRating(story.rating);
      setDate(story.date);
      setAuthor(story.author);
    }
  }, [story]);
  const uploadFileHandler = async (e) => {
    console.log(e.target.files[0]);
    const formData = new FormData();
    formData.append("image", e.target.files[0]);
    try {
      const res = await uploadStoryCover(formData).unwrap();
      toast.success(res.message);
      setCover(res.image);
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };

  return (
    <>
      <Link to="/admin/StoryList" className="btn  my-3"                 style={{backgroundColor:"#000000" , color:"#ffffff"}}
>
        Go Back
      </Link>
      <FormContainer>
        <h1>Edit Story</h1>
        {loadingUpdate && <Loader />}
        {isLoading ? (
          <Loader />
        ) : error ? (
          <Message variant="danger">{error?.data?.message}</Message>
        ) : (
          <Form onSubmit={submitHandler}>
            <Form.Group controlId="title">
              <Form.Label>Title</Form.Label>
              <Form.Control
                type="title"
                placeholder="Enter title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId="type">
              <Form.Label>Type</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter type"
                value={type}
                onChange={(e) => setType(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId="cover">
              <Form.Label>Cover</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter cover url"
                value={cover}
                onChange={(e) => setCover(e.target.value)}
              ></Form.Control>
              <Form.Control
                label="Choose File"
                onChange={uploadFileHandler}
                type="file"
              ></Form.Control>
              {loadingUpload && <Loader />}
            </Form.Group>

            <Form.Group controlId="status">
              <Form.Label>Status</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter status"
                value={status}
                onChange={(e) => setStatus(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId="chapters">
              <Form.Label>Chapters</Form.Label>
              <Form.Control
                type="number"
                placeholder="Enter chapters"
                value={chapters}
                onChange={(e) => setChapters(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId="genre">
              <Form.Label>Genre</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter genre"
                value={genre}
                onChange={(e) => setGenre(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId="plot">
              <Form.Label>Plot</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter plot"
                value={plot}
                onChange={(e) => setPlot(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId="rank">
              <Form.Label>Rank</Form.Label>
              <Form.Control
                type="number"
                placeholder="Enter rank"
                value={rank}
                onChange={(e) => setRank(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId="rating">
              <Form.Label>Rating</Form.Label>
              <Form.Control
                type="number"
                placeholder="Enter Rating"
                value={rating}
                onChange={(e) => setRating(e.target.value)}
              ></Form.Control>

            </Form.Group>
            <Form.Group controlId="date">
              <Form.Label>Date</Form.Label>
              <Form.Control
                type="date"
                placeholder="Enter date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
              ></Form.Control>
            </Form.Group>
            <Form.Group controlId="author">
              <Form.Label>Author</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter author"
                value={author} 
                onChange={(e) => setAuthor(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Button
              type="submit"
              variant="primary"
              style={{ marginTop: "1rem" }}
            >
              Update
            </Button>
          </Form>
        )}
      </FormContainer>
    </>
  );
};

export default StoryEditScreen;
