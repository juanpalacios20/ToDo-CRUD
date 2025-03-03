    import { Router } from "express";
    import * as userController from "../controllers/userController";

    const userRoutes = Router();

    userRoutes.get("/", userController.getUsers);
    userRoutes.get("/:id", userController.getUser);
    userRoutes.post("/", userController.createUser);
    userRoutes.put("/:id", userController.updateUser);
    userRoutes.delete("/:id", userController.deleteUser);

    export default userRoutes;