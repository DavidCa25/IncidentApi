import { incidentModel } from "../../data/models/incindent.models"
import { IIncident, IIncidentDocument } from "../entities/incident.entitiy"

export class IncidentDataSource{
    public updateIncident = async(id: String, incident:Partial<IIncidentDocument>)=>{
        await incidentModel.findByIdAndUpdate(id,{
            title: incident.title,
            description: incident.description,
            lat: incident.lat,
            long: incident.long,
            isEmailSent: incident.isEmailSent
        })
    }
}