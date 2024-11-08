const request = require('supertest');
const app = require('../index'); // Đảm bảo đường dẫn chính xác đến file app.js
const { default: mongoose } = require('mongoose');

describe('GET /api/cpu/load', () => {
    it('should return CPU load data with load1, load5, and load15', async () => {
        const response = await request(app).get('/api/cpu/load');
        
        expect(response.status).toBe(200);

        expect(response.body).toHaveProperty('load1');
        expect(response.body).toHaveProperty('load5');
        expect(response.body).toHaveProperty('load15');

        expect(response.body.load1).toBeGreaterThanOrEqual(0);
        expect(response.body.load5).toBeGreaterThanOrEqual(0);
        expect(response.body.load15).toBeGreaterThanOrEqual(0);

        expect(response.body.load1).not.toBeNull();
        expect(response.body.load5).not.toBeNull();
        expect(response.body.load15).not.toBeNull();

        expect(response.body.load1).not.toBeUndefined();
        expect(response.body.load5).not.toBeUndefined();
        expect(response.body.load15).not.toBeUndefined();

        expect(typeof response.body.load1).toBe('number');
        expect(typeof response.body.load5).toBe('number');
        expect(typeof response.body.load15).toBe('number');
    });
});

afterAll(async () => {
    await new Promise(resolve => setTimeout(() => resolve(), 500)); // wait for server to close
});

afterAll(async () => {
    await mongoose.connection.close();
});