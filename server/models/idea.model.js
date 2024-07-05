import mongoose from 'mongoose';


const ideaSchema = new mongoose.Schema({
    type: {
        type: String, 
        required: true,
        enum: ["Education", "Relaxation", "Social", "Recreational", "Sport"],
    },
    activity: {
        type: String,
        required: true
    }
}, {timestamps: true});

const Idea = mongoose.model('Idea', ideaSchema);

export default Idea;