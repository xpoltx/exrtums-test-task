import List from '../models/list.model.js'
import Stats from '../models/statistic.model.js'

export const addNewIdea = async(req,res) =>{
    try {
        const {ideaId} = req.body;
        const newIdea = new List({ideaId});
        await newIdea.save();
        res.status(201).json({newIdea})
    } catch (error) {
        res.status(500).json('Internal server error');
    }
}

export const getIdeasInList = async(req,res) =>{
    try {
        const ideas = await List.find().populate('ideaId');
        res.status(200).json(ideas);
    } catch (error) {
        res.status(500).json('Internal server error');        
    }
}

export const achieveIdea = async(req,res) =>{
    try {
        const {ideaId} = req.body;

        const idea = await List.findByIdAndUpdate(ideaId, {achieved: true}, {new: true}).populate('ideaId');

        if (!idea) {
            return res.status(404).json({ error: 'Idea not found' });
        }

        await updateStats(idea.ideaId.type);
        res.status(200).json({ message: 'Idea achieved successfully', idea });
    } catch (error) {
        res.status(500).json({error: error});                
    }
}

export const getCompletedIdeas = async(req,res)=>{
    try {
        const completed = await List.find({achieved: true}).sort({updatedAt: -1}).populate('ideaId');
        const formattedCompleted = completed.map(idea => {
            const date = new Date(idea.updatedAt).toLocaleString();
            return { ...idea.toObject(), updatedAt: date };
        });
        res.status(200).json(formattedCompleted);

    } catch (error) {
        res.status(500).json({error: error.message});        
    }
}

const updateStats = async(type) => {
    try {
        let stat = await Stats.findOne({type});
        if(stat){
            stat.count +=1;
        }else{
            stat = new Stats({type, count: 1});
        }
        await stat.save();
    } catch (error) {
        console.log('error updating stats');
    }
}