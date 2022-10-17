import React, { useState } from 'react'
import { useEffect } from "react";
import { db } from "../../firebase-config";
import { addDoc, collection, deleteDoc, doc, getDocs, updateDoc } from "firebase/firestore";
import { Link, useNavigate } from 'react-router-dom';

function Home() {

  const navigate = useNavigate();
  const [student, setStudent] = useState([]);
  const studentsCollectionReference = collection(db, "students");
  
   // fetchb data when page is rendering
   useEffect(() => {
    const getStudent = async () => {
    const data = await getDocs(studentsCollectionReference);
    setStudent(data.docs.map((doc) => ({...doc.data(), id: doc.id})));
    }
    getStudent();
  }, []);

   // delete a document
   const deleteHandler = async ( stdId ) => {
    const studentDoc = doc(db, "students", stdId )
    await deleteDoc(studentDoc);
    navigate("/");
  }

  const editHandler = (id,Name,Address,DOB,GPA) => {
      localStorage.setItem('Id', id);
      localStorage.setItem('Name', Name);
      localStorage.setItem('Address', Address);
      localStorage.setItem('DOB', DOB);
      localStorage.setItem('GPA', GPA);
  }

  return (
    <div className='container'>
      <div><Link to={'/modal'}><button type="button" class="btn btn-primary">Add New Student</button></Link></div>
      <table class="table table-dark table-striped">
  <thead>
    <tr>
      <th scope="col">#</th>
      <th scope="col">Name</th>
      <th scope="col">Address</th>
      <th scope="col">Birth Day</th>
      <th scope="col">GPA</th>
      <th scope="col">Action</th>
    </tr>
  </thead>
  <tbody>
  {
      student.map((std,key) => {
        return <tr key={key+1}>
          <th scope="row">{key}</th>
          <td>{std.Name}</td>
          <td>{std.Address}</td>
          <td>{std.DOB}</td>
          <td>{std.GPA}</td>
          <td>
            <Link to={'/edit'}>
              <button type="button" class="btn btn-primary" onClick={() => {editHandler(std.id,std.Name, std.Address, std.DOB, std.GPA)}} >Edit</button>
            </Link>
          &nbsp;
          <button type="button" class="btn btn-danger" onClick={() => {deleteHandler(std.id)}}>Delete</button>
          </td>
          
        </tr>
      })
     }
  </tbody>
</table>
    </div>
  )
}

export default Home;