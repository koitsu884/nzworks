const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
const { User } = require('../models/user');
const config = require('config');

/*================================================
Google Oauth
==================================================*/
const setupGoogleStrategy = passport => {
    const goaOpts = {
        clientID: config.get('googleClientID'),
        clientSecret: config.get('googleClientSecret'),
        callbackURL: config.get('googleCallbackURL')
    };
    // console.log(goaOpts);
    passport.use(new GoogleStrategy(goaOpts, async (accessToken, tokenSecret, profile, done) => {
        return done(null, profile);
    }));

    passport.serializeUser(function (user, done) {
        done(null, user);
    });

    passport.deserializeUser(function (user, done) {
        done(null, user);
    });
}

/*================================================
 JWT
==================================================*/
const opts = {};
// opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.jwtFromRequest = req => {
    if( req && req.cookies){
        return req.cookies['jwt'];
    }
    return null;
};
opts.secretOrKey = config.get('jwtPrivateKey');

const setupJwtStrategy = passport => {
    passport.use(new JwtStrategy(opts, (jwt_payload, done) => {
        if (Date.now() > jwt_payload.expires) {
            return done('jwt expired');
        }

        User.findById(jwt_payload._id)
            .then(user => {
                if (user) {
                    return done(null, user);
                }
                return done(null, false);
            })
            .catch(err => {
                console.log(err);
                return done('Failed to fetch user');
            });
    }));
}


module.exports = passport => {
    setupJwtStrategy(passport);
    setupGoogleStrategy(passport);
}