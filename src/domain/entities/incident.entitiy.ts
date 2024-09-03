export interface IIncident{
    title: string;
    description: string;
    lat: number;
    long: number;
    isEmailSent: boolean;
}

export interface IIncidentDocument extends Document, IIncident{
    
}