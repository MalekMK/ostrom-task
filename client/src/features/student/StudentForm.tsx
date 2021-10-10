import React from 'react';
import MomentAdapter from "@mui/lab/AdapterMoment";
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DatePicker from '@mui/lab/DatePicker';
import { Typography, TextField, InputAdornment, Button, Box, Container } from '@mui/material';
import { Student } from '../../common/models/student.model';
import { useAppDispatch } from '../../app/hooks';
import { addStudent, updateStudent } from './studentSaga';
import moment, { Moment } from 'moment';

interface StudentFormProps {
  setOpen: (value: boolean) => void;
  item: Student;
}

export const StudentForm = (props: StudentFormProps) => {
  const { setOpen, item } = props
  const dispatch = useAppDispatch()
  const [firstNameInput, setFirstNameInput] = React.useState<string>(item.firstname || "");
  const [lastNameInput, setLastNameInput] = React.useState<string>(item.lastname || "");
  const [dobInput, setDobInput] = React.useState<Moment | null>(moment(item.dob, 'DD/MM/YYYY'));
  const [courseNameInput, setCourseNameInput] = React.useState<string>(item.course || "");
  const [hoursInput, setHoursInput] = React.useState<string>(item.hours.toString() || "");
  const [priceInput, setPriceInput] = React.useState<string>(item.price.toString() || "");

  const handleSubmit = (event: { preventDefault: () => void; }) => {
    event.preventDefault()
    if (item?._id) {
      const data = {
        _id: item._id,
        firstname: firstNameInput,
        lastname: lastNameInput,
        dob: moment(dobInput).format("DD/MM/YYYY"),
        course: courseNameInput,
        hours: parseInt(hoursInput),
        price: parseInt(priceInput),
      }
      dispatch(updateStudent(data))
    } else {
      const data = {
        firstname: firstNameInput,
        lastname: lastNameInput,
        dob: moment(dobInput).format("DD/MM/YYYY"),
        course: courseNameInput,
        hours: parseInt(hoursInput),
        price: parseInt(priceInput),
      }
      dispatch(addStudent(data))
    }
    setOpen(false)
  }
  return (
    <>
      <Container sx={{ mx: 7 }}>
        <Typography sx={{ my: 3 }} id="transition-modal-title" variant="h6" component="h2">
          {item._id ? "Edit Student" : "Add Student"}
        </Typography>
        <TextField
          label="First Name"
          id="outlined-start-adornment"
          sx={{ m: 1, width: '30ch' }}
          InputLabelProps={{
            shrink: true,
          }}
          value={firstNameInput}
          onChange={event => setFirstNameInput(event.target.value)}
        />
        <TextField
          label="Last Name"
          id="outlined-start-adornment"
          sx={{ m: 1, width: '30ch' }}
          InputLabelProps={{
            shrink: true,
          }}
          value={lastNameInput}
          onChange={event => setLastNameInput(event.target.value)}
        />
        <LocalizationProvider dateLibInstance={moment} dateAdapter={MomentAdapter}>
          <DatePicker
            label="Date of Birth"
            value={dobInput}
            inputFormat="DD/MM/YYYY"
            onChange={(newValue) => {
              setDobInput(newValue);
            }}
            renderInput={(params) =>
              <TextField
                sx={{ m: 1, width: '30ch' }}
                InputLabelProps={{
                  shrink: true,
                }}
                {...params} />}
          />
        </LocalizationProvider>
        <TextField
          label="Course Name"
          id="outlined-start-adornment"
          sx={{ m: 1, width: '30ch' }}
          InputLabelProps={{
            shrink: true,
          }}
          value={courseNameInput}
          onChange={event => setCourseNameInput(event.target.value)}
        />
        <TextField
          label="Hours"
          type="number"
          InputLabelProps={{
            shrink: true,
          }}
          id="outlined-start-adornment"
          sx={{ m: 1, width: '30ch' }}
          value={hoursInput}
          onChange={event => setHoursInput(event.target.value)}
        />
        <TextField
          label="Price"
          type="number"
          InputLabelProps={{
            shrink: true,
          }}
          InputProps={{
            endAdornment: <InputAdornment position="start">€</InputAdornment>,
          }}
          id="outlined-start-adornment"
          sx={{ m: 1, width: '30ch' }}
          value={priceInput}
          onChange={event => setPriceInput(event.target.value)}
        />
      </Container>
      <Box style={{ backgroundColor: "#16295a", height: 70, marginTop: 20 }}>
        <div style={{ float: 'right', marginRight: 30 }}>
          <Button sx={{ my: 2 }} variant="contained" color="error" style={{ width: 100 }} onClick={() => setOpen(false)}>Cancel</Button>
          <Button sx={{ mx: 2 }} variant="contained" style={{ backgroundColor: "#4cc2b1", width: 100 }} onClick={handleSubmit}>Confirm</Button>
        </div>
      </Box>
    </>
  );
}