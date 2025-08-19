import 'dotenv/config'; // Loads .env file
import express from 'express';
import subscriberRouter from './routes/subscribers.js';
import deviceRouter from './routes/devices.js';
import adminRouter from './routes/admins.js';
import { db } from'./utilities/firebase.js';
import { collection, addDoc, getDocs, doc } from 'firebase/firestore'; 

const app = express();
const port = process.env.PORT;

app.use(express.urlencoded());
app.use(express.json());

app.use('/subscribers', subscriberRouter);
app.use('/devices', deviceRouter);
app.use('/admins', adminRouter);


app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
