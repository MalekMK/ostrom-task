import { Router } from 'express'
import { getStudents, addTStudent, updateStudent, deleteStudent } from '../controllers/students'

const router: Router = Router()

router.get('/api/students/all', getStudents)

router.post('/api/students/add', addTStudent)

router.put('/api/students/edit/:id', updateStudent)

router.delete('/api/students/delete/:id', deleteStudent)

export default router
