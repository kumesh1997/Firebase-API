import { useEffect, useState } from "react";
import { db } from "./firebase-config";
import { addDoc, collection, deleteDoc, doc, getDocs, updateDoc } from "firebase/firestore";
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import '../src/main.css';
import { async } from "@firebase/util";

function App() {
  
  const [student, setStudent] = useState([]);
  const studentsCollectionReference = collection(db, "students");

  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [dob, setDob] = useState("");
  const [gpa, setGpa] = useState(0);

  // fetchb data when page is rendering
  useEffect(() => {
    const getStudent = async () => {
    const data = await getDocs(studentsCollectionReference);
    setStudent(data.docs.map((doc) => ({...doc.data(), id: doc.id})));
    }
    getStudent();
  }, []);

  // handle on submit
  const handleOnSubmit = async () => {
    // window.alert("sdcjn");
    let data = await addDoc(studentsCollectionReference, {Address: address, DOB: dob, GPA: gpa, Name: name })
  }

  // update Firestore
  const updateHandler = async (stdId, stdName, stdAddress, stdDob, stdGpa) => {
    const studentDoc = doc(db, "students", stdId);
    const updatedStudent = {Address: stdAddress, DOB: stdDob, GPA: stdGpa, Name: stdName};
    await updateDoc(studentDoc, updatedStudent);
  }

  // delete a document

  const deleteHandler = async ( stdId) => {
    const studentDoc = doc(db, "students", stdId )
    await deleteDoc(studentDoc)
  }

  // app componenet
  return (
    <div className="">
      <div><h2>Student Details</h2></div>
      <div>
          <div><button type="button" class="btn btn-primary">Add New Student</button></div>
          <div>
            <form >
            <input placeholder="Name..." name="name" onChange={(e) => {setName(e.target.value)} }/>
            <input placeholder="Address" name="address"  onChange={(e) => {setAddress(e.target.value)} }/>
            <input placeholder="Birth Day"name="dob"  onChange={(e) => {setDob(e.target.value)} }/>
            <input placeholder="GPA" name="gpa" onChange={(e) => {setGpa(e.target.value)} }/>
            <div>
              <button type="button" class="btn btn-danger">Cancel</button>
            <button type="button" class="btn btn-success" onClick={handleOnSubmit()}>Save</button>
            </div>
            </form>
          </div>
      </div>

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
          <button type="button" class="btn btn-primary" onClick={() => {updateHandler(std.id, std.Name, std.Address, std.DOB, std.GPA)}}>Update</button>
          <button type="button" class="btn btn-danger" onClick={() => deleteHandler(std.id)}>Delete</button>
          </td>
          
        </tr>
      })
     }
  </tbody>
</table>
    
    </div>
  );
}

export default App;
