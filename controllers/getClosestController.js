import expressAsyncHandler from "express-async-handler";
import { constants } from "../constants.js";
import { haversine } from "../services/haversineDistance.js";
import { Location } from "../models/locationSchema.js";
import Joi from "joi";

// Define JOI schema for location data
const locationSchema = Joi.object({
    latitude: Joi.number().min(-90).max(90).required(),
    longitude: Joi.number().min(-180).max(180).required(),
});


//@desc     Get closet location from the saved locations in DB
//@route    POST /api/closest
//@access   Public(For now)
export const closestController = expressAsyncHandler(async (req, res) => {
    const { error } = locationSchema.validate(req.body);
    if (error) {
        res.status(constants.BAD_REQUEST).json({error:error.details[0].message});
        return
    }

    const { latitude, longitude } = req.body;
    const locations = await Location.find({ userId: req.user.id });

    if (!locations) {
        res.status(constants.NOT_FOUND);
        res.json({ message: "No location found" });
    }

    const location1 = { latitude, longitude };
    let closestDistance = 2 * Number.MAX_VALUE;
    let closestLocations = [];

    for (const location of locations) {
        const location2 = { latitude: location.location.coordinates.lat, longitude: location.location.coordinates.lng };
        //Get Haversine distance for the coordinates
        const haversineDistance = haversine(location1, location2);
        if (haversineDistance < closestDistance) {
            closestDistance = haversineDistance;
            closestLocations = [location2];
        } else if (haversineDistance === closestDistance) {
            closestLocations.push(location2);
        }
    }
    res.status(constants.OK);
    res.json({ closestLocations, closestDistance });
})