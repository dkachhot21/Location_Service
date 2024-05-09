import request from 'supertest';
import express from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import mongoose from 'mongoose';
import { configDotenv } from 'dotenv';
import { registerUser, loginUser, currentUser } from '../controllers/userController';
import { User } from '../models/userSchema';
import { constants } from '../constants';
import { validateToken } from '../middlewares/validateTokenHandler';
configDotenv();

const app = express();
app.use(express.json());
app.post('/user/register', registerUser);
app.post('/user/login', loginUser);
app.get('/user/current', validateToken, currentUser);

jest.mock('../models/userSchema');

describe('User Endpoints', () => {
    describe('POST /user/register', () => {
        it('should register a new user', async () => {
            User.findOne.mockResolvedValue(null);
            User.create.mockResolvedValue({
                _id: new mongoose.Types.ObjectId(),
                username: 'testuser',
                email: 'testuser@example.com',
                password: 'hashedpassword',
            });

            const response = await request(app)
                .post('/user/register')
                .send({
                    username: 'testuser',
                    email: 'testuser@example.com',
                    password: 'password123',
                });

            expect(response.status).toBe(constants.CREATED);
        });

        it('should return error if user already exists', async () => {
            User.findOne.mockResolvedValue({
                _id: new mongoose.Types.ObjectId(),
                username: 'testuser',
                email: 'testuser@example.com',
                password: 'hashedpassword',
            });

            const response = await request(app)
                .post('/user/register')
                .send({
                    username: 'testuser',
                    email: 'testuser@example.com',
                    password: 'password123',
                });

            expect(response.status).toBe(constants.BAD_REQUEST);
        });

        it('should return error for invalid input', async () => {
            const response = await request(app)
                .post('/user/register')
                .send({
                    username: '',
                    email: 'invalidemail',
                    password: '',
                });

            expect(response.status).toBe(constants.BAD_REQUEST);
            expect(response.body.error).toBeDefined();
        });
    });

    describe('POST /user/login', () => {
        it('should login a user', async () => {
            const user = {
                _id: new mongoose.Types.ObjectId(),
                username: 'testuser',
                email: 'testuser@example.com',
                password: await bcrypt.hash('password123', 10),
            };

            User.findOne.mockResolvedValue(user);

            const response = await request(app)
                .post('/user/login')
                .send({
                    email: 'testuser@example.com',
                    password: 'password123',
                });

            expect(response.status).toBe(constants.OK);
            expect(response.body).toHaveProperty('accessToken');
        });

        it('should return error if user not found', async () => {
            User.findOne.mockResolvedValue(null);

            const response = await request(app)
                .post('/user/login')
                .send({
                    email: 'nonexistentuser@example.com',
                    password: 'password123',
                });

            expect(response.status).toBe(constants.NOT_FOUND);
        });

        it('should return error for incorrect password', async () => {
            const user = {
                _id: new mongoose.Types.ObjectId(),
                username: 'testuser',
                email: 'testuser@example.com',
                password: await bcrypt.hash('password123', 10),
            };

            User.findOne.mockResolvedValue(user);

            const response = await request(app)
                .post('/user/login')
                .send({
                    email: 'testuser@example.com',
                    password: 'wrongpassword',
                });

            expect(response.status).toBe(constants.UNAUTHORIZED);
        });
    });

    describe('GET /user/current', () => {
        it('should get current user', async () => {
            const user = {
                _id: new mongoose.Types.ObjectId(),
                username: 'testuser',
                email: 'testuser@example.com',
            };

            const token = jwt.sign(
                { user: { id: user._id, username: user.username, email: user.email } },
                process.env.ACCESS_TOKEN_KEY,
                { expiresIn: '30m' }
            );

            const response = await request(app)
                .get('/user/current')
                .set('Authorization', `Bearer ${token}`);

            expect(response.status).toBe(constants.OK);
            expect(response.body).toHaveProperty('username', 'testuser');
        });

        it('should return error if no token provided', async () => {
            const response = await request(app).get('/user/current');
            expect(response.status).toBe(constants.UNAUTHORIZED);
        });
    });
});
