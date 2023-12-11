import { Request, Response } from "express";
import EntityService from "../services/entityService";

class PenaltyController{

    private static entityService = new EntityService("penaltytypes");

    static async getUserPenalty(req: Request, res: Response){
        PenaltyController.entityService.setCollection("users");
        const { id } = req.params;
        const uid = req.query.uid as string;

        const penalty = await PenaltyController.entityService.findPenalty(uid, id);
        
        res.json({ok: true, penalties: penalty});
    }

    static async getAllPenalties(req: Request, res: Response){
        const {id} = req.params;
        const penalties = await PenaltyController.entityService.getPenalties(id);

        res.json({ok: true, penalties: penalties});
    }

    static async getPenaltyById(req: Request, res: Response){
        const {id} = req.params;
        const penalty = await PenaltyController.entityService.findById(id);

        res.json({ok: true, penalty: penalty});
    }

    static async getAllPenaltyTypes(req: Request, res: Response){
        const penalties = await PenaltyController.entityService.findAll();
        res.json({ok: true, penalties: penalties});
    }

    static async createPenalty(req: Request, res: Response){
        PenaltyController.entityService.setCollection("users");
        const {
            id, 
            cedula, 
            placa, 
            motivo, 
            comentario, 
            lat, 
            lon,
            fecha,
            hora,
        } = req.body;

        const penalty = {
            cedula: cedula,
            placa: placa,
            motivo: motivo,
            comentario: comentario,
            lat: lat,
            lon: lon,
            fecha: fecha,
            hora: hora,
        };

        await PenaltyController.entityService.save(id, penalty);
        res.json({ok: true,});
    }
}

export default PenaltyController;