const cookieAge = 60 * 60 * 24 * 1000; //1 Day
const cookieOptions = { maxAge: cookieAge, httpOnly: true, sameSite: false };

module.exports.setAuthTokenToCookie = (res, token) => {
    res.cookie('jwt', token, cookieOptions);
}

module.exports.setRefreshTokenToCookie = (res, refreshToken) => {
    res.cookie('refresh', refreshToken, cookieOptions);
}

module.exports.setTokensToCookie = async (res, user) => {
    const authToken = user.generateAuthToken();
    const refreshToken = await user.generateRefreshToken();

    this.setAuthTokenToCookie(res, authToken);
    this.setRefreshTokenToCookie(res, refreshToken);

    //   res.cookie('jwt', authToken, cookieOptions);
    //   res.cookie('refresh', refreshToken, cookieOptions);
}

module.exports.getJwtFromRequest = (req) => {
    return req.cookies['jwt'];
}

module.exports.getRefreshTokenFromRequest = (req) => {
    return  req.cookies['refresh'];
}