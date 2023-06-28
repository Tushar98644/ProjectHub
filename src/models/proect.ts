import monogoose from 'mongoose'

const projectSchema = new monogoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    description: String,
    image: String,
    createdAt: {
        type: Date,
        default: Date.now
    }
})

export default monogoose.models.Project || monogoose.model('Project', projectSchema)

