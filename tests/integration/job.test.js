var request = require('supertest');
const { User } = require('../../models/user');
const { Token } = require('../../models/token');
const { Job } = require('../../models/job');
const { Area } = require('../../models/area');

let server;
let testUser;
let testPassword = '123456';
let token;
let tokenBusiness;

xdescribe('/api/job', function () {
  beforeEach(async () => {
    server = require('../../server');
    testUser = new User({
      email: 'test@test.com',
      password: testPassword,
      name: 'Test user 1',
      verified: true,
      profile: { user_type: 'Personal' }
    });
    await testUser.save();
    token = testUser.generateAuthToken();
    
    testUserBusiness = new User({
        email: 'business@test.com',
        password: testPassword,
        name: 'Test user B',
        verified: true,
        profile: { user_type: 'Business' }
    });
    await testUserBusiness.save();
    tokenBusiness = testUserBusiness.generateAuthToken();
  })
  afterEach(async () => {
    await server.close();
    await Job.deleteMany({});
    await User.deleteMany({});
    await Token.deleteMany({});
  })

  describe('POST /', () => {

    it('returns 400 if input is invalid', async () => {
        let area = await Area.findOne({name: 'オークランド'});

      const res = await request(server)
                .post('/api/job')
                .set('Cookie', [`jwt=${tokenBusiness}`])
                .send({ user: testUserBusiness._id,
                    area: area._id,
                    title: 'いい仕事あるよ'});

      expect(res.status).toBe(400);
    });

    it('returns 201 when parameters are valid', async () => {
        let area = await Area.findOne({name: 'オークランド'});

      const res = await request(server)
        .post('/api/job')
        .set('Cookie', [`jwt=${tokenBusiness}`])
        .send({
            user: testUserBusiness._id,
            area: area._id,
            title: 'いい仕事あるよ',
            details: 'とても楽しい！！\nお仕事\nｄす！！！',
            tags: ['未経験歓迎','ワーホリ歓迎'],
        });
      expect(res.status).toBe(201);
    });
  })
});