import request from 'supertest';
import app from '../app.js';
import { configDotenv } from 'dotenv';

configDotenv();
let token

describe('Test user routes', () => {
    // Test user registration
    it('should register a new user', async () => {
        const res = await request(app)
            .post('/user/register')
            .send({
                username: 'test',
                email: 'test@gmail.com',
                password: 'test'
            });
        expect(res.statusCode).toEqual(200);
    });

    // Test user login
    it('should login a user and get auth token', async () => {
        const res = await request(app)
            .post('/user/login')
            .send({
                email: 'test@gmail.com',
                password: 'test'
            });
        expect(res.statusCode).toEqual(200);
        token = res.body.accessToken;
    });

    // Test Current User Route
    it('should return Current user', async ()=> {
        const res = await request(app)
            .get('/user/current')
            .set('Authorization', `Bearer ${authToken}`)
        expect(res.statusCode).toEqual(200);
    });
});

describe('API Endpoints', () => {
    it('should create a new location', async () => {
        const response = await request(app)
            .post('/api/location')
            .send({ latitude: 27.7749, longitude: -152.4194 })
            .set('Authorization', token);

        expect(response.statusCode).toBe(201);
        expect(response.body).toHaveProperty('Location');
    });

    it('should calculate distance between two coordinates', async () => {
        const response = await request(app)
            .post('/api/distance')
            .send({
                coordinate1: { latitude: 37.7749, longitude: -122.4194 },
                coordinate2: { latitude: 40.7128, longitude: -74.0060 }
            })
            .set('Authorization', token);

        expect(response.statusCode).toBe(200);
        expect(response.body).toHaveProperty('Distance in Meters');
    });

    it('should find the closest location', async () => {
        const response = await request(app)
            .post('/api/closest')
            .send({ latitude: 37.7749, longitude: -122.4194 })
            .set('Authorization', token);

        expect(response.statusCode).toBe(200);
        expect(response.body).toHaveProperty('Location');
    });
});