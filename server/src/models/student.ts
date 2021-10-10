import { IStudent } from './../types/student';
import { model, Schema } from 'mongoose'

const studentSchema: Schema = new Schema({
    firstname: {
        type: String,
        required: true
    },

    lastname: {
        type: String,
        required: true
    },
    dob: {
        type: String,
        required: true
    },
    course: {
        type: String,
        required: true
    },
    hours: {
        type: Number,
        required: true
    },
    price: {
        type: Number,
        required: true
    }

}, { timestamps: true })


export default model<IStudent>('Student', studentSchema)