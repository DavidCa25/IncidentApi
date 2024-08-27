import mongoose, { mongo } from "mongoose";

const incidentSchema = new mongoose.Schema({
    description: {
        type: String, 
        required: true
    },
    lat:{
        type: Number,
        required: true
    },
    long:{
        type: Number,
        required: true
    }
});

export const incidentModel = mongoose.model('Incident', incidentSchema);