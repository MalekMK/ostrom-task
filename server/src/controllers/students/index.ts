import { Response, Request } from 'express'
import { IStudent } from './../../types/student'
import Student from '../../models/student'

const getStudents = async (req: Request, res: Response): Promise<void> => {
    try {
        const allStudents: IStudent[] = await Student.find()
        res.status(200).json(allStudents)
    } catch (error) {
        throw error
    }
}

const addTStudent = async (req: Request, res: Response): Promise<void> => {
    try {
        const body = req.body as Pick<IStudent, 'firstname' | 'lastname' | 'dob' | 'course' | 'hours' | 'price'>
		const student: IStudent = new Student({
            firstname: body.firstname,
            lastname: body.lastname,
            dob: body.dob,
            course: body.course,
            hours: body.hours,
            price: body.price,
        }) 
        await student.save()
        const allStudents: IStudent[] = await Student.find()
        res.status(201).json(allStudents)
    } catch (error) {
        throw error
    }
}

const updateStudent = async (req: Request, res: Response): Promise<void> => {
    try {
        const {
            params: { id },
            body,
        } = req
        await Student.findByIdAndUpdate(
            { _id: id },
            body
        )
        const allStudents: IStudent[] = await Student.find()
        res.status(200).json(allStudents)
    } catch (error) {
        throw error
    }
}

const deleteStudent = async (req: Request, res: Response): Promise<void> => {
    try {
        await Student.findByIdAndRemove(
            req.params.id
        )
        const allStudents: IStudent[] = await Student.find()
        res.status(200).json(allStudents)
    } catch (error) {
        throw error
    }
}

export { getStudents, addTStudent, updateStudent, deleteStudent }
