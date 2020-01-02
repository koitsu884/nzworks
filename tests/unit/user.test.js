const {User} = require('../../../mobile/user');
const jwt = require('jsonwebtoken');
const config = require('config');
const mongoose = require('mongoose');

describe('user.generateAuthToken', () => {
  it('should return a valid JWT', () => {
    let user = new User({
        name: 'Test',
        email: 'test@test.com',
        verified: true,
        password: 'P@ss1234!!',
        profile: { user_type: 'Personal' }
    });
    const refreshToken = user.generateRefreshToken();
    const decoded = jwt.verify(token, config.get('jwtPrivateKey'));
    expect(decoded).toMatchObject(payload);
  });
});