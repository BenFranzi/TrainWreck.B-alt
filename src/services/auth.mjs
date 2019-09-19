import jwt from 'jsonwebtoken';
import { default as User, UserRole, getRole } from '../models/users.mjs';
import {default as config} from '../config.mjs';

export const isAuthorised = async (email, password, cb) => {
    return User.findOne({email}, async (err, user) => {
        if (!!user) {
            const result = await user.validatePassword(password);
            return cb(result);
        }
        return cb(false);
    })
};

export const makeTokenWithEmail = (email, cb) => {
    User.findOne({email}, async (err, user) => {
        if (!user) {
            return cb(null);
        } else {
            return cb(jwt.sign(
                {
                    _id: user._id,
                    name: user.name,
                    email: user.email,
                    updated_at: user.updated_at,
                    role: user.role
                },
                config.JWT.SECRET,
                {expiresIn: config.JWT.TIMEOUT},
            ));
        }

        
    });
    
 };

export const verifyToken = (token) =>{
    jwt.verify(token, config.JWT.SECRET, function(err, decoded) {
        return err;
    });
}