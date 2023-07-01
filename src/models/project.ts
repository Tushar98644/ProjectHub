import monogoose, { models } from 'mongoose'

const projectSchema = new monogoose.Schema({
    title: {
        type: String,
        required: true,
        // unique: true
    },
    description: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    github: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    approved : {
        type: Boolean,
        default: false
    }
})

export default models.Project || monogoose.model('Project', projectSchema)

