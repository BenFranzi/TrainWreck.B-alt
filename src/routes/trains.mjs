import express from 'express';
import * as TrainsService from '../services/trains.mjs';
import checkAPIs from 'express-validator';
const { check, validationResult } = checkAPIs;

const router = express.Router();

router.get('/test', async (req, res) => {
    console.log(req.user);
    return res.status(200).json({
        msg: 'you did it'
    });
});

router.get('/', async (req, res) => {
    const trains = await TrainsService.getTrains((err, trains) => {
        if (!!err) {
            return res.status(500).json({
                error: `Failed to get trains: ${e}`,
            });
        }
        res.json({
            trains: trains,
            count: trains.length
        });
    });
});

router.post('/create',
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
        const train = await TrainsService.createTrain(req.body.number_carriages, req.body.route_id, req.body.weather, req.body.headlights, req.body.youtubeId, (err, train) => {
            if (err) {
                console.log('failed to save train', err)
                throw new Error('Failed to save train to the database', err);
            }
            return res.send({id: train.id});
        });
        
    } catch (e) {
        return res.status(500).json({
            error: `Failed to create train: ${e}`,
        });
    }
    
});

router.get('/:id', async (req, res) => {
    const trains = await TrainsService.getTrain(req.params.id, (err, train) => {
        if (!!err) {
            return res.status(500).json({
                error: `Failed to get train`,
            });
        }
        res.json(train);
    });
});

//id, number_carriages, route_id, weather, headlights, youtubeId

export default router;