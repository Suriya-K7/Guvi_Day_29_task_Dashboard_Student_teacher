import React, { useEffect, useState } from "react";
import Wrapper from "./component/Wrapper";
import { useNavigate } from "react-router-dom";
import useWindowSize from "./hooks/useWindowSize";

const App = () => {
  let [toggle, setToggle] = useState(true);
  let { width } = useWindowSize();
  window.addEventListener("resize", () => {
    if (window.innerWidth < 600) {
      setToggle(false);
    } else if (window.innerWidth > 600 && window.innerWidth < 768) {
      setToggle(true);
    }
  });
  let handleToggle = () => {
    if (toggle) {
      setToggle(false);
    } else {
      setToggle(true);
    }
  };
  let [students, setStudents] = useState([]);
  let [mentorLists, setMentorLists] = useState([]);
  let cardDatas = [
    {
      title: "No. of Students",
      value: students.length,
      color: "primary",
      icon: "fa-users",
    },
    {
      title: "No. of Mentors",
      value: mentorLists.length,
      color: "success",
      icon: "fa-chalkboard-user",
    },
  ];
  let [newStudentName, setNewStudentName] = useState("");
  let [editStudentName, setEditStudentName] = useState("");
  let [newMentor, setNewMentor] = useState("");
  let [editMentorName, setEditMentorName] = useState("");
  let [course, setCourse] = useState("");
  let [mentor, setMentor] = useState("");
  let [editcourse, setEditCourse] = useState("");
  let [editMentor, setEditMentor] = useState("");
  let navigator = useNavigate();
  useEffect(() => {
    let students = JSON.parse(localStorage.getItem("students")) || [
      {
        id: 1,
        name: "Suriya",
        course: "MERN",
        mentor: "Rupan",
      },
      {
        id: 2,
        name: "Udhaya",
        course: "MEAN",
        mentor: "Satish",
      },
      {
        id: 3,
        name: "Suriya-K7",
        course: "MEVN",
        mentor: "Nag",
      },
    ];
    let mentors = JSON.parse(localStorage.getItem("mentors")) || [
      {
        id: 1,
        name: "Rupan",
      },
      {
        id: 2,
        name: "Satish",
      },
      {
        id: 3,
        name: "Nag",
      },
      {
        id: 4,
        name: "Aktar",
      },
    ];
    if (window.innerWidth < 600) {
      setToggle(false);
    } else if (window.innerWidth > 600 && window.innerWidth < 768) {
      setToggle(true);
    }
    setStudents(students);
    setMentorLists(mentors);
  }, []);
  let handleSubmit = () => {
    let id = students.length ? students[students.length - 1].id + 1 : 1;
    if (newStudentName === "" || course === "" || mentor === "") {
      alert("Kindly fill all inputs");
    } else {
      let student = {
        id: id,
        name: newStudentName,
        course: course,
        mentor: mentor,
      };
      let allStudents = [...students, student];
      localStorage.setItem("students", JSON.stringify(allStudents));
      setStudents(allStudents);
      setNewStudentName("");
      setCourse("");
      navigator("/student");
    }
  };
  let handleCancel = () => {
    setNewStudentName("");
    setCourse("");
    navigator("/student");
  };
  let handleUpdate = (id) => {
    if (editStudentName === "" || editcourse === "" || editMentor === "") {
      alert("Kindly fill all inputs");
    } else {
      let student = students.find((e) => e.id === id);
      let updatedStudent = {
        id: student.id,
        name: editStudentName,
        course: editcourse,
        mentor: editMentor,
      };
      let newStudents = students.map((student) =>
        student.id === id ? { ...updatedStudent } : student
      );
      setStudents(newStudents);
      localStorage.setItem("students", JSON.stringify(newStudents));
      setEditStudentName("");
      setEditCourse("");
      setEditMentor("");
      navigator("/student");
    }
  };
  let handleDelete = (id) => {
    let filteredStudents = students.filter((e) => e.id !== id);
    setStudents(filteredStudents);
    localStorage.setItem("students", JSON.stringify(filteredStudents));
    navigator("/student");
  };

  let handleUpdateMentor = () => {
    let id = mentorLists.length
      ? mentorLists[mentorLists.length - 1].id + 1
      : 1;
    if (newMentor === "") {
      alert("Kindly fill all inputs");
    } else {
      let mentor = {
        id: id,
        name: newMentor,
      };
      let allMentors = [...mentorLists, mentor];
      setMentorLists(allMentors);
      localStorage.setItem("mentors", JSON.stringify(allMentors));
      setNewMentor("");
      navigator("/mentor");
    }
  };
  let handleCancelMentor = () => {
    setNewMentor("");
    navigator("/mentor");
  };
  let handleDeleteMentor = (id) => {
    let filteredMentors = mentorLists.filter((e) => e.id !== id);
    setMentorLists(filteredMentors);
    localStorage.setItem("mentors", JSON.stringify(filteredMentors));
    navigator("/mentor");
  };
  let handleEditMentor = (id) => {
    if (editMentorName === "") {
      alert("Kindly Mention Mentors Name");
    } else {
      let mentor = mentorLists.find((e) => e.id === id);
      let updatedMentor = {
        id: mentor.id,
        name: editMentorName,
      };
      let newMentorLists = mentorLists.map((mentor) =>
        mentor.id === id ? { ...updatedMentor } : mentor
      );
      setMentorLists(newMentorLists);
      localStorage.setItem("mentors", JSON.stringify(newMentorLists));
      setEditMentorName("");
      navigator("/mentor");
    }
  };
  return (
    <div>
      <Wrapper
        cardDatas={cardDatas}
        handleToggle={handleToggle}
        toggle={toggle}
        newStudentName={newStudentName}
        setNewStudentName={setNewStudentName}
        course={course}
        setCourse={setCourse}
        handleSubmit={handleSubmit}
        handleCancel={handleCancel}
        students={students}
        mentor={mentor}
        setMentor={setMentor}
        editStudentName={editStudentName}
        setEditStudentName={setEditStudentName}
        editcourse={editcourse}
        setEditCourse={setEditCourse}
        editMentor={editMentor}
        setEditMentor={setEditMentor}
        handleUpdate={handleUpdate}
        handleDelete={handleDelete}
        newMentor={newMentor}
        setNewMentor={setNewMentor}
        editMentorName={editMentorName}
        setEditMentorName={setEditMentorName}
        mentorLists={mentorLists}
        setMentorLists={setMentorLists}
        handleDeleteMentor={handleDeleteMentor}
        handleUpdateMentor={handleUpdateMentor}
        handleCancelMentor={handleCancelMentor}
        handleEditMentor={handleEditMentor}
        width={width}
        setToggle={setToggle}
      />
    </div>
  );
};

export default App;
