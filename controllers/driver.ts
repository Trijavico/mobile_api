import { Request, Response } from "express";
import EntityService from "../services/entityService";

class DriverController {

    private static entityService = new EntityService("driver");

    static async getConductor(req: Request, res: Response){
        DriverController.entityService.setCollection("driver");
        const { id } = req.params;

        const conductor = await DriverController.entityService.findById(id);
        res.json({ok: true, conductor: conductor});
    }

    static async getVehicle(req: Request, res: Response){
        DriverController.entityService.setCollection("vehicles");
        const { id } = req.params;

        const vehicle = await DriverController.entityService.findById(id);
        res.json({ok: true, vehicle: vehicle});
    }

}

export default DriverController;