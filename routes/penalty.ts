import { Router } from "express";
import PenaltyController from "../controllers/penalty";

const router = Router();

router.get('/penalty', PenaltyController.getAllPenaltyTypes);
router.post('/penalty/:id', PenaltyController.getPenaltyById);

router.get('/penalties/:id', PenaltyController.getAllPenalties);
router.post('/penalties', PenaltyController.createPenalty);
router.post('/penalties/:id', PenaltyController.getUserPenalty);

export default router;