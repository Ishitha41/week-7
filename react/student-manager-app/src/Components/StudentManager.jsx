import { useState } from "react"; 
import "./StudentManager.css"; 
function StudentManager() { 
  const [students, setStudents] = useState([ 
    { id: 1, name: "John", course: "React" }, 
    { id: 2, name: "Mary", course: "Java" }, 
    { id: 3, name: "Alex", course: "Python" }, 
    { id: 4, name: "Sara", course: "NodeJS" }, 
    { id: 5, name: "David", course: "C++" } 
  ]); 
  const [newStudent, setNewStudent] = useState({ 
    id: "", 
    name: "", 
    course: "" 
  }); 
  const handleChange = (e) => { 
    setNewStudent({ 
      ...newStudent, 
      [e.target.name]: e.target.value 
    }); 
  }; 
  const addStudent = () => { 
    if (newStudent.id && newStudent.name && newStudent.course) { 
      setStudents([...students, newStudent]); 
    setNewStudent({ id: "", name: "", course: "" }); 
    }}; 
  const deleteStudent = (id) => { 
    setStudents(students.filter((s) => s.id !== id)); 
  }; 
  return ( 
    <div className="container"> 
      <h2>Student Manager</h2> 
      <input 
        type="text" 
        name="id" 
        placeholder="ID" 
        value={newStudent.id} 
        onChange={handleChange} 
      /> 
      <input 
        type="text" 
        name="name" 
        placeholder="Name" 
        value={newStudent.name} 
        onChange={handleChange} 
      /> 
      <input 
        type="text" 
        name="course" 
        placeholder="Course" 
        value={newStudent.course} 
        onChange={handleChange} 
      /> 
      <button onClick={addStudent}>Add Student</button> 
      {students.length === 0 ? ( 
        <p>No students available</p> 
      ) : ( 
        <table> 
          <thead> 
            <tr> 
              <th>ID</th> 
              <th>Name</th> 
              <th>Course</th> 
              <th>Action</th> 
            </tr> 
          </thead> 
          <tbody> 
            {students.map((stu) => ( 
              <tr key={stu.id}> 
                <td>{stu.id}</td> 
                <td>{stu.name}</td> 
                <td>{stu.course}</td> 
                <td> 
                  <button onClick={() => deleteStudent(stu.id)}> 
                    Delete 
                  </button> 
                </td> 
              </tr> 
            ))} 
          </tbody> 
        </table> 
      )} 
    </div> 
  ); 
} 
export default StudentManager; 
 