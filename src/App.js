import React from "react";
import "./App.css";
import { useContext, useEffect, useState } from "react";
import { Route, Routes } from "react-router";
import { AuthContext } from "./context/auth.context";
import axios from "axios";
import CourseCreate from "./components/CourseCreate";
import CourseDetails from "./components/CourseDetails";
import CoursesAll from "./components/CoursesAll";
import HomePage from "./components/HomePage";
import IsInvisible from "./components/IsInvisible";
import IsPrivate from "./components/IsPrivate";
import LoginPage from "./components/LoginPage";
import Navbar from "./components/Navbar";
import SignupPage from "./components/SignupPage";
import TopicCreate from "./components/TopicCreate";
import TopicDetails from "./components/TopicDetails";
import CoursesMy from "./components/CoursesMy";

function App() {
  const [coursesArr, setCoursesArr] = useState([]);
  const [topicsArr, setTopicsArr] = useState([]);
  const { isLoggedIn, getToken } = useContext(AuthContext);

  useEffect(() => {
    getCourses();
    getAllTopics();
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
      .catch((e) => console.log("Error getting list of all courses", e));
  };

  const getAllTopics = () => {
    const storedToken = getToken();

    axios
      .get(`${process.env.REACT_APP_API_URL}/topics/all`, {
        headers: { Authorization: `Bearer ${storedToken}` },
      })
      .then((response) => {
        setTopicsArr(response.data);
      })
      .catch((e) => console.log("Error getting list of all courses", e));
  };

  return (
    <div className="App">
      <div>
        <Navbar />
      </div>

      <Routes>
        <Route exact path="/" element={<HomePage />} />
        <Route
          exact
          path="/courses/all"
          element={
            <CoursesAll courses={coursesArr} updateCourses={getCourses} />
          }
        />
        <Route
          exact
          path="/courses/my-courses"
          element={
            <IsPrivate>
              <CoursesMy courses={coursesArr} updateCourses={getCourses} />{" "}
            </IsPrivate>
          }
        />
        <Route
          exact
          path="/courses/:courseId"
          element={
            <CourseDetails topicsArray={topicsArr} updateCourses={getCourses} />
          }
        />
        <Route
          exact
          path="/courses/add"
          element={
            <IsPrivate>
              <CourseCreate
                updateCourses={getCourses}
                topicsArray={topicsArr}
              />
            </IsPrivate>
          }
        />
        <Route
          exact
          path="/topics/:topicId"
          element={<TopicDetails topicsArray={topicsArr} />}
        />
        <Route
          exact
          path="/topics/add"
          element={
            <IsPrivate>
              <TopicCreate
                updateCourses={getCourses}
                updatedTopics={getAllTopics}
              />
            </IsPrivate>
          }
        />

        <Route exact path="/topics/:topicId" element={<TopicDetails />} />
        <Route
          exact
          path="/signup"
          element={
            <IsInvisible>
              <SignupPage />
            </IsInvisible>
          }
        />
        <Route
          exact
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
