import { model , Schema } from "mongoose";

const courseSchema = new Schema({
    title:{
        type:String,
        required:[true,'Title is required'],
        minlength:[8,'Title must be atleast 8 characters'],
        maxlength:[50,'Title cannot be more than 50 characters'],
        trim:true
    },
    description:{
        type:String,
        required:[true,'Description is required'],
        minlength:[20,'Description must be atleast 20 characters long'],
        maxlength:[2000,'Description cannot be more than 2000 characters'],
    },
    category:{
        type:String,
        required:[true,'Category is required']
    },
    lectures:[
        {
            title:String,
            description:String,
            lecture:{
                public_id:{
                    type:String,
                    required:[true,'Public id is required']
                },
                secure_url:{
                    type:String,
                    required:[true,'Secure url is required']
                }
            }
        }
    ],
    thumbnail:{
        public_id:{
            type:String
        },
        secure_url:{
            type:String
        }
    },
    numberOfLectures:{
        type:Number,
        default:0
    },
    createdBy:{
        type:String,
        required:[true,'Course instructor name is required']
    }
},
{
    timestamps:true
})

const Course = model('Course',courseSchema);
export default Course;