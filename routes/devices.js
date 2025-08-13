import express, { json } from 'express';
import { db } from'../utilities/firebase.js';
import { collection, addDoc, getDocs, doc, setDoc, where, query} from 'firebase/firestore';

const deviceRouter = express.Router();

deviceRouter.post('/recordWaterLevel', (req, res) => {
    let deviceId = req.body.id;
    let waterLevel = req.body.waterLevel;
    try {
        setDoc(doc(db, 'locations', deviceId), {
            'waterLevel': waterLevel,
            'longitude': longitude,
            'latitude': latitude
        }, {merge: true});
        res.status(200).send({message: `Successfully recorded water level.`})
    } catch (error) {
        res.status(500).send({error: `${error}`});
    }
});

deviceRouter.post('/addLocation', (req, res) => {
    let deviceId = req.body.id;
    let waterLevel = req.body.waterLevel;
    let longitude = req.body.longitude;
    let latitude = req.body.latitude;

    try {
        addDoc(doc(db, 'locations', deviceId), {
            'waterLevel': 0,
            'longitude': longitude,
            'latitude': latitude
        });
        res.status(201).send({message: `Successfully added a location.`});
    } catch(error) {
        res.status(500).send({error: `${error}`})
    }
});

deviceRouter.post('/editLocation', (req, res) => {
    let locationsDetails = validate(
        req.body.id,
        req.body.waterLevel,
        req.body.longitude,
        req.body.latitude
    );

    try {
        setDoc(doc(db, 'locations', locationsDetails.id), {
            'waterLevel': locationsDetails.waterLevel,
            'longitude': locationsDetails.longitude,
            'latitude': locationsDetails.latitude
        });
        res.status(200).send({message: `Successuly updated location.`});
    } catch(error) {
        res.status(500).send({erorr: `${error}`});
    }
});

deviceRouter.get('/getLocationDetails/:id', async (req, res) => {
    let deviceId = req.params.id;
    try {
        const q = query(collection(db, 'locations'), where('__name__', '==', deviceId));
        
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
            // res.send(`${doc.id} => `);
            res.send(doc.data());
        });
    }catch (error){
        res.send(`${error}`);

    }
});

function validate(id, waterLevel, longitude, latitude){
    if (id == null && waterLevel == null && longitude == null && latitude == null){
        console.log("Can't process null value.");
        return -1;
    }

    if(!isFloat(waterLevel) && !isFloat(longitude) && !isFloat(latitude)){
        console.log("Given values needs to be numeric.");
        return -1;
    }

    return {
        'id': id,
        'waterLevel': waterLevel,
        'longitude': longitude,
        'latitude': latitude
    };
}

function isFloat(num) {
  return typeof num === 'number' && !Number.isNaN(num) && !Number.isInteger(num);
}


export default deviceRouter;