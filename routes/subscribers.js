import express from 'express';
import { db } from'../utilities/firebase.js';
import { collection, addDoc, getDocs, doc } from 'firebase/firestore';
import { getAuth, signInWithPhoneNumber } from 'firebase/auth';

const subscriberRouter = express.Router();
const auth = getAuth();

subscriberRouter.post('/register', (req, res) => {
    let validated = validate(req.body.phoneNumber);
    if (validated == -1){
        res.status(422).send({error: "Invalid phone number."});
    }
    try {
        addDoc(collection(db,'users'),{
            'phoneNumber': validated,
            'isVerified': false
        });
        res.status(201).send({message: `Successfully registered number.`});
    } catch (error) {
        res.status(500).send({error: `${error}`});
    }
});


// READS ALL ENTRY?
subscriberRouter.get('/get', async (req, res) => {
    try {
        const query = await getDocs(collection(db, 'users'));
        query.forEach((doc) => {
            console.log(`${doc.id} => `);
            console.log(doc.data());
        });
    }catch (error){
        console.error(`${error}`);

    }
});

function validate(phoneNumber){
    if (phoneNumber == null){
        console.log("Phone number is null.");
        return -1;
    }

    if (phoneNumber.length == 11 && phoneNumber.charAt(0) == '0'){
        return phoneNumber; 
    } else {
        console.log('Phone number format is wrong.');
        return -1;
    }
}


export default subscriberRouter;