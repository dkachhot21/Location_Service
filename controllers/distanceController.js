import { constants } from "../constants.js";
import { haversine } from "../services/haversineDistance.js";
import Joi from 'joi';

// Define JOI schema for the request body
const LocationsSchema = Joi.object({
    location1: Joi.object({
        latitude: Joi.number().min(-90).max(90).required(),
        longitude: Joi.number().min(-180).max(180).required(),
    }).required(),
    location2: Joi.object({
        latitude: Joi.number().min(-90).max(90).required(),
        longitude: Joi.number().min(-180).max(180).required(),
    }).required()
});


//@desc     Calculate distance between two coordinates
//@route    POST /api/distance
//@access   Public(For now)
export const distanceController = (req, res) => {
    // Validate request body against schema
    const { error } = LocationsSchema.validate(req.body);
    if (error) {
        res.status(constants.BAD_REQUEST).json({error:error.details[0].message});
        return
    }

    const { location1, location2 } = req.body;

    const haversineDistance = haversine(location1, location2);
    res.status(constants.OK).json({ message: "Distance Calculated(in KM)", distance: haversineDistance });

}