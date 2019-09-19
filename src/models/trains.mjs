import mongoose from 'mongoose';

export const ControlSignals = {
  STOP: 'stop',
  ACCELERATING: 'accelerating'
}


const trainsSchema = mongoose.Schema({
  'number_carriages'  : {type: Number,  required:true},
  'route_id'          : {type: String,  required:true},
  'weather'           : {type: String,  required:true},
  'headlights'        : {type: Boolean, required:true},
  'youtube_id'        : {type: String,  required:true}
});

// {id: "12345678", number_carriages : 10, route_id: "green", weather: "sunny", headlights: true, youtubeId: "asksd123" }

export default mongoose.model('Trains', trainsSchema);
