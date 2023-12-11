import { Router } from "express";
import DriverController from "../controllers/driver";

const router = Router();

router.get('/conductor/:id', DriverController.getConductor);
router.get('/vehicle/:id', DriverController.getVehicle);

export default router;