import {Router} from "express";
import {deleteUser, getUser, getUsers, postUser, putUser} from "../controllers/user.controller";
import authMiddleware from "../middlewares/auth.middleware";

const router = Router();

router.get('/', [authMiddleware],getUsers);
router.get('/:id', getUser);
router.post('/', postUser);
router.put('/:id', putUser);
router.delete('/:id', deleteUser);

export default router;