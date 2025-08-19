import express from 'express';
import { db, auth } from'../utilities/firebase.js';
import { collection, addDoc, getDocs, doc, setDoc } from 'firebase/firestore';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, updateEmail, updatePassword } from 'firebase/auth';
import e from 'express';

const adminRouter = express.Router();

adminRouter.post('/login', (req, res) => {
    const email = req.body.email;
    const password = req.body.password;

    signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
        res.status(200).send({user: userCredential.user}); 
    })
    .catch((error) => {
        res.send({error: `${error}`});
    });
});

adminRouter.post('/register', (req, res) => {
    const email = req.body.email;
    const password = req.body.password;

    createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
        res.status(201).send({message: `User successfully created.`});
    })
    .catch((error) => {
        res.send({error: `${error}`});
    });
});

adminRouter.post('/update-email', (req, res) => {
    const email = req.body.email;
    console.log(auth.currentUser)
    updateEmail(auth.currentUser, email)
    .then(() => {
        res.send({message: `Email updated.`});
    })
    .catch((error) => {
        res.send({error: `${error}`});
    });
});

adminRouter.post('/update-password', (req,res) => {
    const newPassword = req.body.newPassword;
    updatePassword(auth.currentUser, newPassword)
    .then(() => {
        res.send({message: `Password updated.`});
    })
    .catch((error) => {
        
    })
    .catch((error) => {
        res.send({error: `${error}`});
    });
});

adminRouter.post('/logout', (req, res) => {
    signOut(auth)
    .then(() => {
        res.send({message: `Logout successful.`});
    })
    .catch((error) => {
        res.send({error: `${error}`});
    });
});


export default adminRouter;