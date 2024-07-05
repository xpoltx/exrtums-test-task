import express from 'express';
import path from 'path';
import ideaRoute from './idea.route.js';
import listRoute from './list.route.js';
import statsRoute from './stats.route.js';
import { fileURLToPath } from 'url';

const router = express.Router();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default ()=>{
    
    router.get('/', (req, res) => {
        res.sendFile(path.join(__dirname, '../../client/src/index.html'));
    });
    
    ideaRoute(router);
    listRoute(router);
    statsRoute(router);
    
    return router;
}