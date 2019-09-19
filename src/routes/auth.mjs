import express from 'express';
import checkAPIs from 'express-validator';
import * as AuthService from '../services/auth.mjs';
import requireAuth from '../middleware/requireAuth.mjs';
const { check, validationResult } = checkAPIs;

const router = express.Router();

router.get('/check', async (req, res) => {
    return res.send({error: 'Use POST'});
});


router.post('/', 
[
    check('email').isEmail(),
    check('password').isLength({ min: 5 })
], 
async (req, res) => {
    
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(200).send({
            error: 'invalid username or password',
        });
    }    
    await AuthService.isAuthorised(req.body.email, req.body.password, async (isAuthorised) => {
        if (!isAuthorised) {
            return res.status(200).send({
                error: 'incorrect credentials',
            });
        } else {
            const token = await AuthService.makeTokenWithEmail(req.body.email, (token) => {
                if (!token) {
                    return res.status(500).send({
                        error: 'failed to make token'
                    });
                } else {
                    return res.status(200).send({
                        token: token
                    });
                }
            });
            
        }
    }); 
});

 
router.post('/refresh', requireAuth,
async (req, res) => {
    // If you have reached this point, the middleware has worked and you are authorised
    const token = AuthService.makeTokenWithEmail(req.user.email, (token) => {
        if (!token) {
            return res.status(401).send({
                error: 'token could not be generated'
            });
        } else {
            return res.status(200).send({
                message: 'success', 
                token: token
            });
        }
    });   
});


export default router;