import axios from "axios";
import { useContext, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { AuthContext } from "../context/auth.context";
import "./CourseCreate.css";

export default function EditCourse(props) {
  const [courseName, setCourseName] = useState(props.course.courseName);
  const [description, setDescription] = useState(props.course.description);
  // const [topics, setTopics] = useState([]);
  // const [image, setImage] = useState(); // ???
  const [location, setLocation] = useState(props.course.location);
  const [duration, setDuration] = useState(props.course.duration);
  const [schedule, setSchedule] = useState(props.course.schedule);
  const [preRequisites, setPreRequisites] = useState(
    props.course.preRequisites
  );
  const [cost, setCost] = useState(props.course.cost);
  const [link, setLink] = useState(props.course.link);

  const { courseId } = useParams();
  const navigate = useNavigate();
  const { getToken } = useContext(AuthContext);
  const [successMsg, setSuccessMsg] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();

    const courseDetails = {
      courseName,
      description,
      // topics,
      // image,
      location,
      duration,
      schedule,
      preRequisites,
      cost,
      link,
    };

    const storedToken = getToken();
    axios
      .put(
        `${process.env.REACT_APP_API_URL}/courses/edit/${courseId}`,
        courseDetails,
        {
          headers: { Authorization: `Bearer ${storedToken}` },
        }
      )
      .then((response) => {
        console.log("response.data", response.data);
        setSuccessMsg(response.data.successMessage);
        navigate(`/courses/${courseId}`);
      });
  };

  return (
    <>
      {successMsg ? (
        <h3>{successMsg}</h3>
      ) : (
        <div className="EditCourse">
          <h3>To update the selected course, change the form below:</h3>

          <form onSubmit={handleSubmit}>
            <label>
              Course Name: <br />
              <input
                type="text"
                required={true}
                name="courseName"
                value={courseName}
                onChange={(e) => setCourseName(e.target.value)}
              />
            </label>
            <br />
            <label>
              Description: <br />
              <textarea
                type="text"
                required={true}
                name="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </label>
            <br />
            <label>
              Location: <br />
              <input
                type="text"
                required={true}
                name="location"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
              />
            </label>
            <br />
            <label>
              Duration: <br />
              <input
                type="text"
                required={true}
                name="duration"
                value={duration}
                onChange={(e) => setDuration(e.target.value)}
              />
            </label>
            <br />
            <label>
              Schedule: <br />
              <input
                type="text"
                required={true}
                name="schedule"
                value={schedule}
                onChange={(e) => setSchedule(e.target.value)}
              />
            </label>
            <br />
            <label>
              Pre-Requisites: <br />
              <input
                type="text"
                name="preRequisites"
                value={preRequisites}
                onChange={(e) => setPreRequisites(e.target.value)}
              />
            </label>
            <br />
            <label>
              Cost (Euros): <br />
              <input
                type="number"
                min={0}
                required={true}
                name="cost"
                value={cost}
                onChange={(e) => setCost(e.target.value)}
              />
            </label>
            <br />
            <label>
              Link: <br />
              <input
                type="link"
                required={true}
                name="link"
                value={link}
                onChange={(e) => setLink(e.target.value)}
              />
            </label>
            <br />
            <button type="submit">Update Course</button>
          </form>
        </div>
      )}
    </>
  );
}
