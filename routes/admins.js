import express from 'express';
import { db } from'../utilities/firebase.js';
import { collection, addDoc, getDocs, doc, setDoc } from 'firebase/firestore';

const adminRouter = express.Router();
