import mongoose from 'mongoose';

const listSchema = new mongoose.Schema({
    ideaId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Idea",
        required: true,
    },
    achieved: {
        type: Boolean,
        default: false
    }
},{timestamps: true});

const List = mongoose.model('List', listSchema);

export default List;