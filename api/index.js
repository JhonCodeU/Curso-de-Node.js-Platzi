import express from 'express';
import config from '../config.js';

const app = express();

//Router configuration
import user from './components/user/network.js';
app.use('/api/users', user);

app.listen(config.api.port, () => {
    console.log(`Listening http://localhost:${config.api.port}`);
});