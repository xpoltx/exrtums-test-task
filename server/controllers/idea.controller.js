import Idea from '../models/idea.model.js';

export const createIdea = async (req,res)=>{
    try {
        const {type, activity} = req.body;
        const newIdea = new Idea({
            type,
            activity
        });

        await newIdea.save();
        res.status(201).json(newIdea);
    } catch (error) {
        res.status(500).json({error: "Internal server error"});
    }
}

export const getAllIdeas = async(req,res)=>{
    try {
        const ideas = await Idea.find();
        res.status(200).json(ideas);
    } catch (error) {
        res.status(500).json({error: "Internal server error"});
    }
}