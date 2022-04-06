const passport = require('passport');
const JwtCookieComboStrategy = require('passport-jwt-cookiecombo');
const { Strategy: LocalStrategy } = require('passport-local');
const { Strategy: JwtStrategy, ExtractJwt } = require('passport-jwt');
const testPassword = require('bcrypt').compare;
const user = require('../models/user');

passport.use(
    new LocalStrategy(
        { usernameField: 'email', passwordField: 'password' },
        async (email, password, done) => {
            //TODO implement findOne method on model
            const result = await user.findOne(email);

            if (!result.ok) return done(result.message);

            if (result.rows.length === 0)
                return done(null, false, {
                    message: 'Invalid email of password',
                });

            const [userData] = result.rows;

            const isValidPassword = await testPassword(
                password,
                userData.password
            );

            if (!isValidPassword)
                return done(null, false, {
                    message: 'Invalid email or password',
                });

            return done(null, userData.id, { message: 'Login successful' });
        }
    )
);

//by default, JWT tokens will expire after 15 minutes = 900 seconds
const jwtExpirationTime = Number(process.env.JWT_EXPIRATION_TIME) || 900;
passport.use(
    new JwtCookieComboStrategy(
        {
            secretOrPublicKey: process.env.JWT_SECRET,
            jwtVerifyOptions: {
                expiresIn: jwtExpirationTime,
            },
            passReqToCallback: false,
        },
        (payload, done) => {
            return done(null, payload, {
                message: 'authentication successful',
            });
        }
    )
);
