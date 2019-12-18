var request = require('supertest');
const { User } = require('../../models/user');
const { Token, TOKEN_TYPE_VERIFY } = require('../../models/token');

let server;
let token;
let testUser;
let testPassword = '123456';

xdescribe('/api/user', function () {
    beforeEach(async () => {
        server = require('../../server');
    })
    afterEach(async () => {
        await server.close();
        await User.deleteMany({});
        await Token.deleteMany({});
    })

    describe('GET /me', () => {
        beforeEach(async () => {
            testUser = new User({
                email: 'abc@gmail.com',
                password: testPassword,
                name: 'Test user',
                profile: { user_type: 'Personal' }
            });
            await testUser.save();
            token = testUser.generateAuthToken();
        })

        afterEach(async () => {
            await User.deleteMany({});
            await Token.deleteMany({});
        })

        it('should return 401 if token is invarid', async () => {
            const res = await request(server).get('/api/user/me')
                .set('Cookie', [`jwt=abcdefg`])
                .send();

            expect(res.status).toBe(401);
        });

        it('should return user if token is provided', async () => {
            const res = await request(server)
                .get('/api/user/me')
                .set('Cookie', [`jwt=${token}`])
                .send();

            expect(res.status).toBe(200);
        });
    });

    describe('POST /', () => {
        beforeEach(async () => {
            testUser = new User({
                email: 'abc@gmail.com',
                password: testPassword,
                name: 'Test user',
                profile: { user_type: 'Personal' }
            });
            await testUser.save();
            token = testUser.generateAuthToken();
        })

        afterEach(async () => {
            await User.deleteMany({});
            await Token.deleteMany({});
        })

        it('should return 401 if email is not verified', async () => {
            const res = await request(server)
                .post('/api/auth/')
                .send({ email: testUser.email, password: testPassword });
            // console.log(res);
            expect(res.status).toBe(401);
        });

        it('should set verified true after email verification', async () => {
            let token = new Token({
                _userId: testUser._id,
                type: TOKEN_TYPE_VERIFY
            });
            await token.save();
           
            const res = await request(server)
                .get('/api/auth/verify')
                .query({token:token.token});
            // console.log(res);
            expect(res.status).toBe(200);
            let user = await User.findById(testUser._id);
            expect(user.verified).toBe(true);
        });

        it('should return user if credentials are valid and user is verified', async () => {
            testUser.verified = true;
            testUser.save();
            const res = await request(server)
                .post('/api/auth/')
                .send({ email: testUser.email, password: testPassword });
            // console.log(res);
            expect(res.status).toBe(200);
            expect(res.body).toHaveProperty('name', testUser.name);
        });
    });
});