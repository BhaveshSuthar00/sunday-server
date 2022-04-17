const mongoose = require("mongoose");


const residentSchema = new mongoose.Schema({
        userId: { type: mongoose.Schema.Types.ObjectId, ref:"user",required:true}, 
        gender : {type : String, default : "male", reqrired : true},
        age : {type : Number, default : 18, required : true},
        flatId : {type : mongoose.Schema.Types.ObjectId, ref : "flat", required : true},
    },
    {
    versionKey: false,
    }
);

module.exports =  mongoose.model("resident", residentSchema);
