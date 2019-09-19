import { default as Train } from '../models/trains.mjs';


export const getTrains = (cb) => {
    Train.find({},['_id', 'number_carriages', 'route_id', 'weather', 'headlights', 'youtube_id'], cb);
}

export const getTrain = (id, cb) => {
    Train.findOne({_id: id},['_id', 'number_carriages', 'route_id', 'weather', 'headlights', 'youtube_id'], cb);
}


export const createTrain = (number_carriages, route_id, weather, headlights, youtubeId, cb) => {
    const train = new Train();
    train.number_carriages = number_carriages;
    train.route_id = route_id;
    train.weather = weather;
    train.headlights = headlights;
    train.youtube_id = youtubeId;
    train.save(cb);
}

