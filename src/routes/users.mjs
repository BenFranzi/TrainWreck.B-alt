import express from 'express';
import checkAPIs from 'express-validator';
import {default as Users} from '../models/users.mjs';
const { param, check, validationResult } = checkAPIs;

import * as UsersService from '../services/users.mjs';

const router = express.Router();

router.get('/',
async (req, res) => {
    const users = await UsersService.getUsers((err, users) => {
        if (!!err) {
            return res.status(500).json({
                error: `Failed to create user: ${e}`,
            });
        }
        res.json({
            users: users,
            count: users.length
        });
    });
});

router.get('/me',
async (req, res) => {
    return res.status(200).json(req.user);
});

router.post('/create',
[
    check('name').exists(),
    check('email').isEmail(),
    check('password').isLength({min: 8}),
    check('role').custom(role => UsersService.checkRole(role)),
],
async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({
            error: errors.errors.map(err => {
                return {
                    msg: err.msg,
                    param: err.param,
                };
            })
        });
    }
    try {
        UsersService.getUserByEmail(req.body.email, async (err, existingUser) => {
            if (!existingUser) {
                const user = await UsersService.createUser(req.body.name, req.body.email, req.body.password, req.body.role);
                return res.send({id: user.id});
            }
            return res.status(500).json({
                error: `User already exists`,
            });
        })
        
    } catch (e) {
        return res.status(500).json({
            error: `Failed to create user: ${e}`,
        });
    }
    
});

router.put('/password/:id',
[
    check('password').isLength({min: 8}),
    param('id').isLength({min: 24, max: 24}),
],
async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({
            error: errors.errors.map(err => {
                return { msg: err.msg };
            })
        });
    }
    try {
        UsersService.getUser(req.params.id, async (err, user) => {
            if (!user) {
                return res.status(400).json({
                    error: `User does not exist`,
                });
            }
            await UsersService.setPassword(req.body.password, user);
            return  res.send({msg: 'success'});
        });    
    } catch (e) {
        return res.status(500).json({
            error: `Failed to set password: ${e}`,
        });
    }
});

router.put('/role/:id',
[
    param('id').isLength({min: 24, max: 24}),
],
async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({
            error: errors.errors.map(err => {
                return { msg: err.msg };
            })
        });
    }
    try {
        UsersService.getUser(req.params.id, async (err, user) => {
            if (!user) {
                return res.status(400).json({
                    error: `User does not exist`,
                });
            }
            await UsersService.setRole(req.body.role, user);
            return  res.send({msg: 'success'});
        });    
    } catch (e) {
        return res.status(500).json({
            error: `Failed to set role: ${e}`,
        });
    }
});

router.put('/name/:id',
[
    param('id').isLength({min: 24, max: 24}),
],
async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({
            error: errors.errors.map(err => {
                return { msg: err.msg };
            })
        });
    }
    try {
        UsersService.getUser(req.params.id, async (err, user) => {
            if (!user) {
                return res.status(400).json({
                    error: `User does not exist`,
                });
            }
            await UsersService.setName(req.body.name, user);
            return  res.send({msg: 'success'});
        });    
    } catch (e) {
        return res.status(500).json({
            error: `Failed to set name: ${e}`,
        });
    }
});

router.delete('/remove/:id',
[
    param('id').isLength({min: 24, max: 24}),
],
async (req, res) => {
    const user = await UsersService.getUser(req.params.id, (err, user) => {
        if (!!err) {
            return res.status(404).json({
                error: `User not found`,
            });
        }
        user.remove();
    });
    
    return res.send({message: 'Deleted User'});
});

router.get('/:id',
[
    param('id').isLength({min: 24, max: 24}),
],
async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({
            error: errors.errors.map(err => {
                return {
                    msg: err.msg,
                    param: err.param,
                };
            }),
        });
    }
    try {
        UsersService.getUser(req.params.id, async (err, user) => {
            if (!user) {
                res.status(400).json({
                    error: `User does not exist ${err}`,
                });
            }
            return res.send({
                _id: user._id,
                name: user.name,
                email: user.email,
                role: user.role,
            });
        });
    } catch (e) {
        return res.status(500).json({
            error: `Could not get user ${e}`,
        });
    }
});

export default router;