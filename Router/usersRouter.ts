import { Router } from "express";
import { acceptRequest, createUser, deleteUser, likeUser, sendFriendRequest, unLikeUser, viewUser } from "../Controllers/usersController";

const  router = Router();

router.route("/create-user").post(createUser)
router.route("/view-all-users").get(viewUser)
router.route("/:userID/:friendID/send-request").get(sendFriendRequest)
router.route("/:userID/:friendID/accept-request").get(acceptRequest)
router.route("/:userID/:friendID/like-user").patch(likeUser)
router.route("/:userID/:friendID/unlike-user").patch(unLikeUser)
router.route("/:userID/delete-user").delete(deleteUser)

export default router;