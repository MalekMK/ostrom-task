import {
  configureStore,
  combineReducers,
} from "@reduxjs/toolkit";
import { all } from "typed-redux-saga";
import createSagaMiddleware from "redux-saga";
import { studentSaga } from "../features/student/studentSaga";
import { studentSlice } from "../features/student/studentSlice";

const rootReducers = combineReducers({
  student: studentSlice.reducer,
});

const rootSagas = function* rootSaga() {
  yield all([studentSaga.saga()]);
};

const sagaMiddleware = createSagaMiddleware();

export const store = configureStore({
  reducer: rootReducers,
  middleware: [sagaMiddleware],
});
sagaMiddleware.run(rootSagas);

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;