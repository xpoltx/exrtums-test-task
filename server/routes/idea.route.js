import { createIdea, getAllIdeas } from "../controllers/idea.controller.js"

export default (router) =>{
    router.post('/idea', createIdea);
    router.get('/ideas', getAllIdeas);
}