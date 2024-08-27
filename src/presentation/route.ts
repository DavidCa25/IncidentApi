import { Router } from "express";
import { IncidentRoutes } from "./incidents/route";

export class AppRoutes{
    static get routes(){
        const router =  Router();
        router.use("/api/incidents", IncidentRoutes.routes);
        return router;
    }
}