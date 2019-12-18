var request = require('supertest');
const faker = require("faker");
faker.locale = "ja";

const { User } = require('../../models/user');
const { Job } = require('../../models/job');
const { Token } = require('../../models/token');

let server;
let testUser;
let testBusinessUser;
let numberOfJobs1 = 10;
let testBusinessUser2;
let numberOfJobs2 = 5;
let testPassword = '123456';

jest.setTimeout(60000);

async function createTestJobs(userId, count) {
  let jobs = [];
  for (let i = 0; i < count; i++) {
    let job = new Job({
      user: userId,
      area: null,
      title: faker.lorem.words(3),
      details: faker.lorem.paragraphs(3)
    });
    jobs.push(job);
  }
  await Job.insertMany(jobs);
}

describe('/api/user', function () {
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

    testBusinessUser = new User({
      email: 'test_business@test.com',
      password: testPassword,
      name: 'Test business user 1',
      verified: true,
      profile: { user_type: 'Business' }
    });
    await testBusinessUser.save();

    await createTestJobs(testBusinessUser._id, numberOfJobs1);

    testBusinessUser2 = new User({
      email: 'test_business2@test.com',
      password: testPassword,
      name: 'Test business user 2',
      verified: true,
      profile: { user_type: 'Business' }
    });
    await testBusinessUser2.save();

    await createTestJobs(testBusinessUser2._id, numberOfJobs2);

  })
  afterEach(async () => {
    await server.close();
    await Job.deleteMany({});
    await User.deleteMany({});
    await Token.deleteMany({});
  })

  describe('GET /jobs', () => {
    it('returns number of posted job when no parameter provide', async () => {
      let token = testBusinessUser.generateAuthToken();
      const res = await request(server).get('/api/user/jobs')
        .set('Cookie', [`jwt=${token}`])
        .send();

      expect(res.status).toBe(200);
      expect(res.body.length).toBe(numberOfJobs1);
    })

    it('returns number of saved job when provided the parameter', async () => {
      let numberOfLikes = 3;
      let jobs = await Job.find({});

      for(let i=0; i<numberOfLikes; i++){
        testUser.profile.savedJobs.push(jobs[i]._id);
      }
      await testUser.save();
      
      let token = testUser.generateAuthToken();
      const res = await request(server).get('/api/user/jobs?type=saved')
        .set('Cookie', [`jwt=${token}`])
        .send();

      expect(res.status).toBe(200);
      expect(res.body.length).toBe(numberOfLikes);
    })

    it('returns number of applied job when provided the parameter', async () => {
      let numberOfApply = 3;
      let jobs = await Job.find({});

      for(let i=0; i<numberOfApply; i++){
        testUser.profile.appliedJobs.push(jobs[i]._id);
      }
      await testUser.save();
      
      let token = testUser.generateAuthToken();
      const res = await request(server).get('/api/user/jobs?type=applied')
        .set('Cookie', [`jwt=${token}`])
        .send();

      expect(res.status).toBe(200);
      expect(res.body.length).toBe(numberOfApply);
    })
  })

  xdescribe('POST /', () => {
    it('returns 400 if input is invalid', async () => {
      const res = await request(server).post('/api/user').send({ email: 'abc@gmail.com', password: '123456' });

      expect(res.status).toBe(400);
    });

    it('returns 400 if email is already used and verified', async () => {
      const res = await request(server).post('/api/user').send({
        email: testUser.email,
        password: '123456',
        name: 'Test user',
        profile: { user_type: 'Personal' }
      });

      expect(res.status).toBe(400);
    });

    it('returns 400 if profile is missing', async () => {
      const res = await request(server).post('/api/user').send({
        email: 'abc@gmail.com',
        password: '123456',
        name: 'Test user'
      });

      expect(res.status).toBe(400);
    });

    it('returns 201 when parameters are valid', async () => {
      const res = await request(server)
        .post('/api/user')
        .send({
          email: 'abc@gmail.com',
          password: '123456',
          name: 'Test user',
          profile: { user_type: 'Personal' }
        });
      expect(res.status).toBe(201);
    });

    it('returns 201 when email arleady exists but not verified', async () => {
      await request(server)
        .post('/api/user')
        .send({
          email: 'abc@gmail.com',
          password: '123456',
          name: 'Test user',
          profile: { user_type: 'Personal' }
        });

      const res = await request(server)
        .post('/api/user')
        .send({
          email: 'abc@gmail.com',
          password: '123456',
          name: 'Test user again',
          profile: { user_type: 'Personal' }
        });

      expect(res.status).toBe(201);
    });
  })

  describe('PATCH /', () => {

  })
});