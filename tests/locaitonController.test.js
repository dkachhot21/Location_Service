import request from 'supertest';
import express from 'express';
import mongoose from 'mongoose';
import { saveLocation } from "../controllers/saveLocationController.js";
import { closestController } from "../controllers/getClosestController.js";
import { Location } from '../models/locationSchema';
import { constants } from '../constants';
import { validateToken } from '../middlewares/validateTokenHandler';
import jwt from 'jsonwebtoken';
import { configDotenv } from 'dotenv';

configDotenv();


const app = express();
app.use(express.json());
app.post('/api/location', validateToken, saveLocation);
app.post('/api/closest', validateToken, closestController);

jest.mock('../models/locationSchema');

describe('Location Endpoints', () => {
    const mockUser = {
        _id: new mongoose.Types.ObjectId(),
        username: 'testuser',
        email: 'testuser@example.com',
    };

    const token = jwt.sign(
        { user: { id: mockUser._id, username: mockUser.username, email: mockUser.email } },
        process.env.ACCESS_TOKEN_KEY,
        { expiresIn: '30m' }
    );

    describe('POST /api/closest', () => {
        it('should get closest location', async () => {
            Location.find.mockResolvedValue([
                {
                    _id: new mongoose.Types.ObjectId(),
                    userId: mockUser._id,
                    location: {
                        name: 'Test Location 1',
                        coordinates: {
                            lat: 40.7128,
                            lng: -74.0060,
                        },
                    },
                },
                {
                    _id: new mongoose.Types.ObjectId(),
                    userId: mockUser._id,
                    location: {
                        name: 'Test Location 2',
                        coordinates: {
                            lat: 34.0522,
                            lng: -118.2437,
                        },
                    },
                },
            ]);

            const response = await request(app)
                .post('/api/closest')
                .set('Authorization', `Bearer ${token}`)
                .send({
                    latitude: 40.73061,
                    longitude: -73.935242,
                });

            expect(response.status).toBe(constants.OK);
            expect(response.body.closestLocations).toHaveLength(1);
            expect(response.body.closestLocations[0]).toHaveProperty('latitude', 40.7128);
        });

        it('should return error for invalid input', async () => {
            const response = await request(app)
                .post('/api/closest')
                .set('Authorization', `Bearer ${token}`)
                .send({
                    latitude: 200,
                    longitude: 200,
                });

            expect(response.status).toBe(constants.BAD_REQUEST);
            expect(response.body.error).toBeDefined();
        });
    });

    describe('POST /api/location', () => {
        it('should save a location', async () => {
            Location.findOne.mockResolvedValue(null);
            Location.create.mockResolvedValue({
                _id: new mongoose.Types.ObjectId(),
                userId: mockUser._id,
                location: {
                    name: 'Test Location',
                    coordinates: {
                        lat: 40.7128,
                        lng: -74.0060,
                    },
                },
            });

            const response = await request(app)
                .post('/api/location')
                .set('Authorization', `Bearer ${token}`)
                .send({
                    name: 'Test Location',
                    latitude: 40.7128,
                    longitude: -74.0060,
                });

            expect(response.status).toBe(constants.CREATED);
        });

        it('should return error if location already exists', async () => {
            Location.findOne.mockResolvedValue({
                _id: new mongoose.Types.ObjectId(),
                userId: mockUser._id,
                location: {
                    name: 'Test Location',
                    coordinates: {
                        lat: 40.7128,
                        lng: -74.0060,
                    },
                },
            });

            const response = await request(app)
                .post('/api/location')
                .set('Authorization', `Bearer ${token}`)
                .send({
                    name: 'Test Location',
                    latitude: 40.7128,
                    longitude: -74.0060,
                });

            expect(response.status).toBe(constants.CONFLICT);
        });

        it('should return error for invalid input', async () => {
            const response = await request(app)
                .post('/api/location')
                .set('Authorization', `Bearer ${token}`)
                .send({
                    name: 'Test Location',
                    latitude: 200,
                    longitude: 200,
                });

            expect(response.status).toBe(constants.BAD_REQUEST);
            expect(response.body.error).toBeDefined();
        });
    });
});
