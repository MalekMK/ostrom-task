import React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Backdrop, Button, Container, Fade, Modal, TablePagination, Box } from '@mui/material';
import { useAppSelector } from '../../app/hooks';
import { StudentForm } from './StudentForm';
import { DeleteModal } from './DeleteModal';
import { Student } from '../../common/models/student.model';

interface Column {
  id: 'firstname' | 'lastname' | 'dob' | 'course' | 'hours' | 'price' | 'handlers';
  label: string;
  minWidth: number;
}

const columns: readonly Column[] = [
  { id: 'firstname', label: 'FIRST NAME', minWidth: 170 },
  { id: 'lastname', label: 'LAST NAME', minWidth: 100 },
  { id: 'dob', label: 'DATE OF BIRTH', minWidth: 100 },
  { id: 'course', label: 'COURSE', minWidth: 100 },
  { id: 'hours', label: 'HOURS', minWidth: 100 },
  { id: 'price', label: 'PRICE', minWidth: 100 },
  { id: 'handlers', label: '', minWidth: 100 },
];

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
};

const mainStyle = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
};
const emptyItem = {
  firstname: "",
  lastname: "",
  dob: "",
  course: "",
  hours: 0,
  price: 0,
}

const StudentDashboard = () => {
  const studentsList = useAppSelector(state => state.student.studentsList)
  const [data, setData] = React.useState(studentsList);
  React.useEffect(() => {
    setData(studentsList)
  }, [studentsList]);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };
  const [open, setOpen] = React.useState(false);
  const [item, setItem] = React.useState<Student>(emptyItem);
  const [deletedItem, setDeletedItem] = React.useState<string>("");
  const [openModalIndex, setOpenModalIndex] = React.useState(0);
  const handleOpen = (number: number) => {
    setOpen(true)
    setOpenModalIndex(number)
  }
  const handleClose = () => setOpen(false);
  return (
    <Container sx={mainStyle}>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <Box sx={style}>
            {openModalIndex === 0 && (
              <StudentForm setOpen={setOpen} item={emptyItem} />
            )}
            {openModalIndex === 1 && (
              <StudentForm setOpen={setOpen} item={item} />
            )}
            {openModalIndex === 2 && (
              <DeleteModal setOpen={setOpen} id={deletedItem} />
            )}
          </Box>
        </Fade>
      </Modal>
      <Button style={{ backgroundColor: "#4cc2b1" }} variant="contained" onClick={() => handleOpen(0)}>Add Student</Button>
      <Paper sx={{ width: '100%', overflow: 'hidden' }}>
        <TableContainer sx={{ maxHeight: 460 }}>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow >
                {columns.map((column) => (
                  <TableCell
                    key={column.id}
                    align="left"
                    style={{ minWidth: column.minWidth, backgroundColor: "#f9fafb" }}
                  >
                    {column.label}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {data
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, index) => {
                  return (
                    <TableRow hover key={row._id}>
                      <TableCell style={index % 2 === 1 ? { backgroundColor: "#f9fafb" } : {}} align="left">{row.firstname}</TableCell>
                      <TableCell style={index % 2 === 1 ? { backgroundColor: "#f9fafb" } : {}} align="left">{row.lastname}</TableCell>
                      <TableCell style={index % 2 === 1 ? { backgroundColor: "#f9fafb" } : {}} align="left">{row.dob}</TableCell>
                      <TableCell style={index % 2 === 1 ? { backgroundColor: "#f9fafb" } : {}} align="left">{row.course}</TableCell>
                      <TableCell style={index % 2 === 1 ? { backgroundColor: "#f9fafb" } : {}} align="left">{row.hours}</TableCell>
                      <TableCell style={index % 2 === 1 ? { backgroundColor: "#f9fafb" } : {}} align="left">{row.price} €</TableCell>
                      <TableCell style={index % 2 === 1 ? { backgroundColor: "#f9fafb" } : {}} align="left">
                        <Button style={{ color: "#4cc2b1" }} onClick={() => {
                          handleOpen(1)
                          setItem(row)
                        }}>Edit</Button>
                        <Button style={{ color: "#4cc2b1" }} onClick={() => {
                          handleOpen(2)
                          setDeletedItem(row._id || "")
                        }}>Delete</Button>
                      </TableCell>
                    </TableRow>
                  );
                })}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[10, 25, 100]}
          component="div"
          count={studentsList.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    </Container >
  );
}

export default StudentDashboard;