import cron from 'node-cron';
import { incidentModel } from '../../data/models/incindent.models';
import { EmailService } from '../service/email.service';
import { IncidentDataSource } from '../datasource/incident.datasource';
import { generateIncidentEmailTemplate } from '../template/Email.template';

export const emailJob = () =>{
    const emailService = new EmailService();
    const incidentDataSource = new IncidentDataSource();
    cron.schedule('* * * * *', async ()=>{
        console.log("Cada 5 segundos")
        try{
            const incidents = await incidentModel.find({isEmailSent:false});
            if(!incidents.length){
                console.log("No hay incidentes pendientes de enviar")
                return;
            }
            console.log(`Procesando ${incidents.length} incidentes.`);
            await Promise.all(
                incidents.map(async (incident)=>{
                    const htmlBody = generateIncidentEmailTemplate(
                        incident.title,
                        incident.description,
                        incident.lat,
                        incident.long
                    )
                await emailService.sendEmail({
                    to: "jesusdavidcasillasrios@gmail.com",
                    subject: `Incidente: ${incident.title}`,
                    htmlBody: htmlBody
                });
                console.log(`Email enviado para el incidente con ID: ${incident._id}`)
                // let incidentModel2 = {
                //     title: incident.title,
                //     description: incident.description,
                //     isEmailSent: true,
                //     lat: incident.lat,
                //     long: incident.long
                // }
                await incidentDataSource.updateIncident(incident._id.toString(),{ ...incident, isEmailSent: true})
                console.log(`Incidente actualizado para el ID: ${incident._id}`);
            })
        );
        }catch(error){
            console.error("Error durante el trabajo de envio de correos");
        }
    })
}