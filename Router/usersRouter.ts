import { Router } from "express";
import { createUser, deleteUser, likeUser, sendFriendRequest, viewUser } from "../Controllers/usersController";

const  router = Router();

router.route("/create-user").post(createUser)
router.route("/view-all-users").get(viewUser)
router.route("/:userID/:friendID/send-request").get(sendFriendRequest)
router.route("/:userID/:friendID/like-user").patch(likeUser)
router.route("/delete-user").delete(deleteUser)



export default router;