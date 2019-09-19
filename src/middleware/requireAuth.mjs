import jwt from 'jsonwebtoken';
import {default as config} from '../config.mjs';
import { default as User } from '../models/users.mjs';

export default (req, res, next) => {
    const { authorization } = req.headers;
    // authorization === 'Bearer laksjdflaksdjasdfklj'

    if (!authorization) {
        return res.status(401).send({ error: 'You must be logged in.' });
    }

    const token = authorization.replace('Bearer ', '');
    jwt.verify(token, config.JWT.SECRET, async (err, payload) => {
        if (err) {
            return res.status(401).send({ error: 'You must be logged in.' });
        }
        const user = await User.findById(payload._id, ['_id', 'name', 'email', 'role', 'updated_at']);
        //TODO: compare updated at from token with user profile
        req.user = user;
        next();
    });
};