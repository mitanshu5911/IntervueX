import passport from "passport";
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import User from "../models/User.js";

passport.use(
    new GoogleStrategy(
        {
            clientID: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
            callbackURL: "https://intervuex-8c3f.onrender.com/api/auth/google/callback",
            passReqToCallback: false
        },

        async (accessToken, refreshToken, profile, done) => {
            try {

                const googleId = profile?.id;
                const name = profile?.displayName?.trim() || "";
                const email = profile?.emails?.[0]?.value?.toLowerCase();
                const avatar =
                    profile?.photos?.[0]?.value ||
                    "";

                if (!email || !googleId) {
                    return done(null, false);
                }

                let user = await User.findOne({ email });

                if (user) {
                    let shouldUpdate = false;

                    if (!user.googleId) {
                        user.googleId = googleId;
                        shouldUpdate = true;
                    }

                    if (!user.avatar && avatar) {
                        user.avatar = avatar;
                        shouldUpdate = true;
                    }

                    user.lastLogin = new Date();
                    user.isActive = true;

                    if (shouldUpdate) {
                        await user.save();
                    } else {
                        await User.updateOne(
                            { _id: user._id },
                            { lastLogin: new Date(), isActive: true }
                        );
                    }

                    return done(null, user);
                }

                user = await User.create({
                    name,
                    email,
                    googleId,
                    avatar,
                    isVerified: true,
                    lastLogin: new Date(),
                    isActive: true
                });

                return done(null, user);
            } catch (error) {
                return done(error, null);
            }
        }
    )
);

export default passport;