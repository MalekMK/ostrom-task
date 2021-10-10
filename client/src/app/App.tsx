import React from 'react';
import StudentDashboard from '../features/student/StudentDashboard';
import { getStudentList } from '../features/student/studentSaga';
import { useAppDispatch } from './hooks';

const App = () => {
  const dispatch = useAppDispatch()
  React.useEffect(() => {
    dispatch(getStudentList())
  }, [dispatch]);
  return (
    <div className="App">
      <StudentDashboard />
    </div>
  );
}

export default App;
