import Sad from '../models/sadModel.js';
import catchAsync from '../utils/catchAsync.js';
import AppError from '../utils/appError.js';




export const createSad = catchAsync(async(req,res,next)=>{
  const userId =  req.user._id.toString()
  if(req.body.text.length<5) {
    res.status(403).json({
        status:'Be creative',

    })
  }
    const newSad = await Sad.create({
        attachments:req.body.attachments,
        ownerId:userId,
        text:req.body.text
    })
    res.status(201).json({
        status:'Sucesss',
        data:{
            newSad
        }
    })
})


export const getAllSads = catchAsync(async(req,res,next)=>{
    const sads = await Sad.find()

    res.status(201).json({
        status:'Sucesss',
        data:{
            sads
        }
    })
})
export const getOneSad = catchAsync(async(req,res,next)=>{
    const id = req.params.id
    const singleSad = await Sad.findById(id)

    res.status(201).json({
        status:'Success',
        data:{
            singleSad
        }
    })
})
export const getParticularUserSads = catchAsync(async(req,res,next)=>{
    const id = req.params.id
    const sads = await Sad.find({
        ownerId:id
    })

    res.status(201).json({
        
        data:{
            sads
        }
    })
})
 export const deleteSad = catchAsync(async(req,res,next)=>{
   
 
     const id = req.params.id
     const singleSad = await Sad.findOneAndDelete(
         {
             _id:id
         }
     )

     res.status(201).json({
         status:'Sucesss',
         data:{
             singleSad
         }
     })
 })

export const update = catchAsync(async(req,res,next)=>{
    const {text,atachments} = req.body()
    const id = req.params.id
    const singleSad = await Sad.findByIdAndUpdate(id,{
        text,
        atachments,
    })

    res.status(201).json({
        status:'Sucesss',
        data:{
            singleSad
        }
    })
})

export const restrictToOwner = catchAsync(async (req, res, next) => {
    const sad = await Sad.findById(req.params.id);
    if (!sad) {
      return next(new AppError('No sad found with that ID', 404));
    }
  
    if (sad.ownerId !== req.user._id.toString()) {
      return next(new AppError('You do not have permission to perform this action', 403));
    }
  
    next();
  });