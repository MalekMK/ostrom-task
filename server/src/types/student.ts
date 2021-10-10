import { Document } from 'mongoose'

export interface IStudent extends Document {
    firstname: string
    lastname: string
    dob: string
    course: string
    hours: number
    price: number
}