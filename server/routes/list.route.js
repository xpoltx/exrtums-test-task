import { achieveIdea, addNewIdea, getCompletedIdeas, getIdeasInList } from "../controllers/list.controller.js"

export default (router)=>{
    router.post('/list', addNewIdea);
    router.get('/slider', getIdeasInList);
    router.get('/completed', getCompletedIdeas);
    router.patch('/achieve', achieveIdea);
}