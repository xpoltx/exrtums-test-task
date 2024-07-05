import mongoose from 'mongoose';

const statsSchema = new mongoose.Schema({
    type: {
        type: String,
        required: true,
        enum: ["Education", "Relaxation", "Social", "Recreational", "Sport"],
    },
    count: {
        type: Number,
        default: 0
    }
});

const Stats = mongoose.model('Stats', statsSchema);

export default Stats;