import express from "express";
import { saveLocation } from "../controllers/saveLocationController.js";
import { distanceController } from "../controllers/distanceController.js";
import { closestController } from "../controllers/getClosestController.js";
import { validateToken } from "../middlewares/validateTokenHandler.js";

const router = express.Router();
router.use(validateToken);


/**
 * @swagger
 * /api/location:
 *   post:
 *     tags:
 *         - 2.) API
 *     summary: Save location in the database
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      properties:
 *                          latitude:
 *                              default: 50
 *                              type: Number
 *                          longitude:
 *                              default: 100
 *                              type: Number
 *     produces:
 *       - application/json
 *     responses:
 *       201:
 *         description: Location saved successfully
 *       400:
 *         description: Bad request
 *       401:
 *         description: Unauthorized
 *       409:
 *         description: Location already exist ( Conflict )
 */
router.route('/location').post(saveLocation);

/**
 * @swagger
 * /api/distance:
 *   post:
 *     tags:
 *         - 2.) API
 *     summary: Calculate Haversine Distance between two Coordinates
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      properties:
 *                          location1:
 *                              type: object
 *                              properties:
 *                                  latitude:
 *                                      default: 50
 *                                      type: Number
 *                                  longitude:
 *                                      default: 100
 *                                      type: Number
 *                          location2:
 *                              type: object
 *                              properties:
 *                                  latitude:
 *                                      default: 80
 *                                      type: Number
 *                                  longitude:
 *                                      default: 180
 *                                      type: Number
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: Distance calculated successfully
 *       400:
 *         description: Bad request
 *       401:
 *         description: Unauthorized
 */
router.route('/distance').post(distanceController);

/**
 * @swagger
 * /api/closest:
 *   post:
 *     tags:
 *         - 2.) API
 *     summary: Get Closest Location from Saved locations in the database
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      properties:
 *                          latitude:
 *                              default: 80
 *                              type: Number
 *                          longitude:
 *                              default: 180
 *                              type: Number
 *     responses:
 *       200:
 *         description: Closest location found successfully
 *       400:
 *         description: Bad request
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Not Found
 */
router.route('/closest').post(closestController);

export default router;