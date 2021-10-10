import React from 'react';
import { Typography, Button, Box } from '@mui/material';
import { useAppDispatch } from '../../app/hooks';
import { deletetStudent } from './studentSaga';

interface DeleteModalProps {
  setOpen: (value: boolean) => void;
  id: string;
}

export const DeleteModal = (props: DeleteModalProps) => {
  const { setOpen, id } = props
  const dispatch = useAppDispatch()
  const handleSubmit = (event: { preventDefault: () => void; }) => {
    event.preventDefault()
    dispatch(deletetStudent(id))
    setOpen(false)
  }
  return (
    <>
      <Typography sx={{ mx: 2}} id="transition-modal-title" variant="h6" component="h2">
        Do you want to delete it ?
      </Typography>
      <Box  style={{ backgroundColor: "#16295a", height: 70, marginTop: 20}}>
        <Button sx={{mx:2, my: 2 }} variant="contained" color="error" style={{ width: 100 }}onClick={() => setOpen(false)}>Cancel</Button>
        <Button variant="contained" style={{ marginLeft:10,  backgroundColor: "#4cc2b1" ,width: 100}} onClick={handleSubmit}>Confirm</Button>
      </Box>
    </>
  );
}