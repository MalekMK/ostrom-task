import { put, call } from "typed-redux-saga";
import { createSliceSaga } from "redux-toolkit-saga";
import axios, { AxiosResponse } from "axios";
import { setStudentsList } from "./studentSlice";
import { Student } from "../../common/models/student.model";
import { PayloadAction } from "@reduxjs/toolkit";

export const studentSaga = createSliceSaga({
  name: "studentSaga",
  caseSagas: {
    *getStudentList() {
      const response: AxiosResponse<Student[]> = yield* call(() =>
        axios.get<Student[]>(`/api/students/all`)
      );
      yield* put(setStudentsList(response.data));
    },
    *addStudent(student: PayloadAction<Student>) {
      const data: any = student.payload;
      const response: AxiosResponse<Student[]> = yield* call(() =>
        axios.post<Student[]>(`/api/students/add`, data)
      );
      yield* put(setStudentsList(response.data));
    },
    *updateStudent(student: PayloadAction<Student>) {
      const data: any = {
        firstname: student.payload.firstname,
        lastname: student.payload.lastname,
        dob: student.payload.dob,
        course: student.payload.course,
        hours: student.payload.hours,
        price: student.payload.price,
      };
      const response: AxiosResponse<Student[]> = yield* call(() =>
        axios.put<Student[]>(
          `/api/students/edit/${student.payload._id}`,
          data
        )
      );
      yield* put(setStudentsList(response.data));
    },
    *deletetStudent(id: PayloadAction<string>) {
      const response: AxiosResponse<Student[]> = yield* call(() =>
        axios.delete<Student[]>(
          `/api/students/delete/${id.payload}`
        )
      );
      yield* put(setStudentsList(response.data));
    },
  },
});

export const { getStudentList, addStudent, updateStudent, deletetStudent } =
  studentSaga.actions;
