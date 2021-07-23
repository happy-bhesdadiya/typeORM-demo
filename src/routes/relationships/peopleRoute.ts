import { Router } from "express";
import { PeopleController } from "../../controllers/relationships/PeopleController";

const router = Router();

router.post("/people/create", PeopleController.createUser);
router.post("/note/create", PeopleController.createNote);
router.post("/sharedNote/create", PeopleController.sharedNote);
router.get("/sharedNote/find", PeopleController.findSharedNote);
router.get("/user/find", PeopleController.findUser);

export default router;
