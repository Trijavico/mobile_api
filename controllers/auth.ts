import { Request, Response } from "express";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import EntityService from "../services/entityService";
import firebase from "../config/db";



class AuthController {

    private static entityService = new EntityService("users");
    private static auth = getAuth(firebase.app); 

    static async login(req: Request, res: Response){
        try {
            const { email, password } = req.body;
            const userCredential = await signInWithEmailAndPassword(AuthController.auth, email, password);
            const user = userCredential.user;
            
            res.json({ msg: "Login successful", userid: user.uid });
        } catch (error) {
            console.error("Error logging in:", error);
            
        }
    }

    static async register(req: Request, res: Response){
        try {
            const { email, password } = req.body;
            const userCredential = await createUserWithEmailAndPassword(AuthController.auth, email, password);
            const user = userCredential.user;
            const ref = AuthController.entityService.save(user.uid, {});

            res.json({ msg: "Registration successful", user: user.uid});
        } catch (error) {
            res.status(400).json({ error: "Email already in use" });
        }
    }

}

export default AuthController;