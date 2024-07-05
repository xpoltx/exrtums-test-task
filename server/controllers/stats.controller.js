import Stats from '../models/statistic.model.js'

export const addNewStat = async(req,res) =>{
    try {
        const {type} = req.body;
        const newStat = new Stats({type});
        await newStat.save();
        res.status(201).json({newStat})
    } catch (error) {
        res.status(500).json('Internal server error');
    }
}

export const getAllStats = async(req,res) =>{
    try {
        const stats = await Stats.find();
        res.status(200).json(stats);
    } catch (error) {
        res.status(500).json('Internal server error');        
    }
}
