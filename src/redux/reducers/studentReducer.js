const initialState = [
{
    id: 0,
    Name: "",
    Address: "",
    DOB: "",
    GPA:"",
},
];


const studentReducer = (state = initialState, action) => {
switch(action.type){
    case 'CREATE_STUDENT':
        state = [...state, action.payload]; 
        return state;
    case 'UPDATE_STUDENT':
        const updatedstate = state.map((student) => student.id === action.payload.id ? action.payload : student );
        state = updatedstate;
        return state;
    case 'DELETE_STUDENT':
        const filteredStudents = state.filter(student => student.id !== action.payload.Id && student);
        state = filteredStudents;
        return state;
}
}

export default studentReducer;