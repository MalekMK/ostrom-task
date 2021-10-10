import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Student } from "../../common/models/student.model";

interface StudentState {
  studentsList: Student[];
}

const initialState: StudentState = {
  studentsList: [],
};

export const studentSlice = createSlice({
  name: "studentReducer",
  initialState,
  reducers: {
    setStudentsList: (state, action: PayloadAction<Student[]>) => {
      state.studentsList = action.payload;
    },
  },
});

export const { setStudentsList } = studentSlice.actions;
