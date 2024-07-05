import { addNewStat, getAllStats } from "../controllers/stats.controller.js";

export default (router)=>{
    router.post('/stat', addNewStat);
    router.get('/stats', getAllStats);
}