import expressAsyncHandler from "express-async-handler";
import { constants } from "../constants.js";
import { Location } from "../models/locationSchema.js";
import Joi from "joi";


// Define JOI schema for location data
const locationSchema = Joi.object({
    name: Joi.string(),
    latitude: Joi.number().min(-90).max(90).required(),
    longitude: Joi.number().min(-180).max(180).required(),
});

//@desc     Save Location in DB
//@route    POST /api/location
//@access   Public(For now)
export const saveLocation = expressAsyncHandler(async (req, res) => {
    const { id } = req.user;
    const {error} = locationSchema.validate(req.body);
    if(error){
        res.status(constants.BAD_REQUEST).json({error:error.details[0].message});
        return
    }
    const { name, latitude, longitude } = req.body;

    const locationExists = await Location.findOne({
        userId: id,
        'location.coordinates.lat': latitude,
        'location.coordinates.lng': longitude
    })
    if (locationExists) {
        res.status(constants.CONFLICT);
        throw new Error("Location already exists");
    }

    const location = await Location.create({
        userId: id,
        location: {
            name: name,
            coordinates: {
                lat: latitude,
                lng: longitude
            },
        }
    })

    if (!location) {
        res.send(constants.INTERNAL_SERVER_ERROR);
        throw new Error("Location Could not be saved")
    } else {
        res.status(constants.CREATED).json({
            message: "Location Saved Successfully",
            locations: location
        });
    }
})