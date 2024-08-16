import { LinkContainer } from "react-router-bootstrap";
import { Table, Button, Row, Col } from "react-bootstrap";
import { FaEdit, FaPlus, FaTrash } from "react-icons/fa";
import { useParams } from "react-router-dom";
import Message from "../../components/Message";
import Loader from "../../components/Loader";
import Paginate from "../../components/Paginate";
import {
  useGetStorysQuery,
  useDeleteStoryMutation,
  useCreateStoryMutation,
} from "../../slices/storysApiSlice";
import { toast } from "react-toastify";
import '../../assets/styles/style.css'
const StoryListScreen = () => {
  const { pageNumber } = useParams();

  const { data :story, isLoading, error, refetch } = useGetStorysQuery({
    pageNumber,
  });

  const [deleteStory, { isLoading: loadingDelete }] = useDeleteStoryMutation();

  const deleteHandler = async (id) => {
    if (window.confirm("Are you sure")) {
      try {
        await deleteStory(id);
        refetch();
      } catch (err) {
        toast.error(err?.data?.message || err.error);
      }
    }
  };

  const [createStory, { isLoading: loadingCreate }] = useCreateStoryMutation();
console.log(createStory); 
  const createStoryHandler = async () => {
    if (window.confirm("Are you sure you want to create a new story?")) {
      try {
        await createStory();
        refetch();
      } catch (err) {
        toast.error(err?.data?.message || err.error);
      }
    }
  };

  return (
    <>
    <div > 
      <Row className="align-items-center">
        <Col>
          <h1>Storys</h1>
        </Col>
        <Col className="text-end">
          <Button className="my-3" onClick={createStoryHandler}>
            <FaPlus /> Create Story
          </Button>
        </Col>
      </Row>

      {loadingCreate && <Loader />}
      {loadingDelete && <Loader />}
      {isLoading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error?.data?.message}</Message>
      ) : (
        <>
        <div style={{overflowX: "auto"}}>
          <Table striped bordered hover responsive variant="light">
            <thead>
              <tr>
              <th style={{ backgroundColor: '#111111', color: 'white' }}>ID</th>
      <th style={{ backgroundColor: '#111111', color: 'white' }}>TITLE</th>
      <th style={{ backgroundColor: '#111111', color: 'white' }}>TYPE</th>
      <th style={{ backgroundColor: '#111111', color: 'white' }}>STATUS</th>
      <th style={{ backgroundColor: '#111111', color: 'white' }}>Chapters</th>
      <th style={{ backgroundColor: '#111111', color: 'white' }}>Cover</th>
      <th style={{ backgroundColor: '#111111', color: 'white' }}>AUTHOR</th>
      <th style={{ backgroundColor: '#111111', color: 'white' }}>Update</th>
      <th style={{ backgroundColor: '#111111', color: 'white' }}>Delete</th>

    
              </tr>
            </thead>
            <tbody> 
              {story.storys.map((story) => (
                <tr key={story._id}>
                  <td >{story._id} </td>
                  <td>{story.title}</td>
                  <td>{story.type}</td>
                  <td>{story.status}</td>
                  <td>{story.chapters}</td>
                  <td>  <img src={story.cover} alt={story.title} style={{ maxWidth: '100px', maxHeight: '100px',borderRadius:"5px" }} /></td>
                  <td>{story.author}</td>

                  <td>
                    <LinkContainer to={`/admin/story/${story._id}/edit`}>
                      <Button variant="light" className="btn-sm mx-2">
                        <FaEdit />
                      </Button>
                    </LinkContainer>
                    </td>
                    <td>
                    <Button
                      variant="danger"
                      className="btn-sm"
                      onClick={() => deleteHandler(story._id)}
                    >
                      <FaTrash style={{ color: "white" }} />
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
          </div>
          <Paginate pages={story.pages} page={story.page}  isAdmin={true} />
        </>
      )}
    </div>
    </>
  );
};

export default StoryListScreen;
