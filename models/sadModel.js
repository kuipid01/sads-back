
import mongoose from 'mongoose';



const sadSchema = new mongoose.Schema({
    text:{
        type:String,
        required:true,
        
    },
   createdAt:Date.now(),
//    updatedAt:Date,
    attachments: [{
        type: String
        }],
    ownerId:{
        type:String,
        required: [true, 'text needs an owner idolo'],
    },

});


  
  const Sad = mongoose.model('Sad', sadSchema);
  
 export default Sad;