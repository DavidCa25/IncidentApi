import { Request, Response } from "express";
import { incidentModel } from "../../data/models/incindent.models";

export class IncidentController{
    public getIncidents = async (req: Request, res: Response) =>{
        try{
            const incidents = await incidentModel.find();
            res.json(incidents)
        }catch(error){
    
        }
    }

    public createIncident = async (req: Request, res: Response) => {
        try{
            const {title, description, lat, long} = req.body;
            const newIncident = await incidentModel.create({
                title,
                description, 
                lat, 
                long
            })
            return res.json(newIncident)
        }catch(error){
    
        }
    }
    public getIncidentById = async (req:Request, res: Response)=>{
        const id = req.params
        try{
            const incident = await incidentModel.findById(id);
            res.json(incident);
        }catch(error){
            console.log(error)
        }
    }

    public updateIncident = async (req:Request, res: Response)=>{
        const { id } = req.params;
        const { title, description, lat, long } = req.body
        try{
            const incident = await incidentModel.findByIdAndUpdate(id, {
                title,
                description,
                lat, 
                long
            })
        }catch(error){
            console.log(error)
        }
    }

    public deleteIncident = async (req: Request, res: Response) =>{
        const {id} = req.params;
        try{
            await incidentModel.findByIdAndDelete(id);
            res.json({message: "Registro borrardo"})
        }catch(error){
            console.log(error)
        }
    }
}