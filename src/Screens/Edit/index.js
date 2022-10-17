import React from 'react'
import { useState } from "react";
import { db } from "../../firebase-config";
import { addDoc, collection, deleteDoc, doc, getDocs, updateDoc } from "firebase/firestore";
import { Link } from 'react-router-dom';

function Edit() {

    // reference to the collection
  const studentsCollectionReference = collection(db, "students");

  // consts
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [dob, setDob] = useState("");
  const [gpa, setGpa] = useState(0);

   // update Firestore
   const updateHandler = async (stdId, stdName, stdAddress, stdDob, stdGpa) => {
    const studentDoc = doc(db, "students", stdId);
    const updatedStudent = {Address: stdAddress, DOB: stdDob, GPA: stdGpa, Name: stdName};
    await updateDoc(studentDoc, updatedStudent);
  }

  return (
    <div>
        <form >
            <input placeholder="Name..."  onChange={(e) => {setName(e.target.value)}}/>
            <input placeholder="Address"  onChange={(e) => {setAddress(e.target.value)}}/>
            <input placeholder="Birth Day"  onChange={(e) => {setDob(e.target.value)}}/>
            <input placeholder="GPA"  onChange={(e) => {setGpa(e.target.value)}}/>
            <div>
            <Link to={'/'}><button type="button" class="btn btn-danger">Cancel</button></Link>
              &nbsp;
            <Link to={'/'}><button type="button" class="btn btn-success" onClick={updateHandler} >Update</button></Link>
            </div>
            </form>
    </div>
  )
}

export default Edit;