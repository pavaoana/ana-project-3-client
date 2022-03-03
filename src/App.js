import "./App.css";
import { useContext, useEffect, useState } from "react";
import { Route, Routes } from "react-router";
import { AuthContext } from "./context/auth.context";
import axios from "axios";
import CourseCreate from "./components/CourseCreate";
import CourseDetails from "./components/CourseDetails";
import CoursesAll from "./components/CoursesAll";
import HomePage from "./components/HomePage";
import IsInvisible from "./components/IsAnon";
import IsPrivate from "./components/IsPrivate";
import LoginPage from "./components/LoginPage";
import Navbar from "./components/Navbar";
import SignupPage from "./components/SignupPage";
import TopicCreate from "./components/TopicCreate";
import TopicDetails from "./components/TopicDetails";

function App() {
  const [coursesArr, setCoursesArr] = useState([]);
  const { isLoggedIn, getToken } = useContext(AuthContext);

  useEffect(() => {
    getCourses();
  }, [isLoggedIn]);

  const getCourses = () => {
    const storedToken = getToken();

    axios
      .get(`${process.env.REACT_APP_API_URL}/courses/all`, {
        headers: { Authorization: `Bearer ${storedToken}` },
      })
      .then((response) => {
        setCoursesArr(response.data);
      })
      .catch((e) => console.log("Error getting list of all projects", e));
  };

  return (
    <div className="App">
      <Navbar />

      <Routes>
        <Route path="/" element={<HomePage />} />

        <Route
          path="/courses/all"
          element={<CoursesAll courses={coursesArr} />}
        />

        <Route path="/courses/:courseId" element={<CourseDetails />} />

        <Route
          path="/courses/create"
          element={
            <IsPrivate>
              <CourseCreate updateAllCourses={getCourses} />
            </IsPrivate>
          }
        />

        <Route path="/topics/:topicId" element={<TopicDetails />} />

        <Route
          path="/topics/add"
          element={
            <IsPrivate>
              <TopicCreate />
            </IsPrivate>
          }
        />

        <Route
          path="/signup"
          element={
            <IsInvisible>
              <SignupPage />
            </IsInvisible>
          }
        />

        <Route
          path="/login"
          element={
            <IsInvisible>
              <LoginPage />
            </IsInvisible>
          }
        />
      </Routes>
    </div>
  );
}

export default App;
