"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.acceptRequest = exports.deleteUser = exports.sendFriendRequest = exports.unLikeUser = exports.likeUser = exports.viewUser = exports.createUser = void 0;
const client_1 = require("@prisma/client");
const email_1 = require("../Utils/email");
const prisma = new client_1.PrismaClient();
const createUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, email, location } = req.body;
        const avatar = yield name.charAt().toUpperCase();
        const user = yield prisma.userModel.create({
            data: {
                name,
                email,
                location,
                requests: [],
                friends: [],
                likes: [],
                avatar,
            },
        });
        return res.status(200).json({
            message: "Creted User Successfuly",
            data: user,
        });
    }
    catch (error) {
        return res.status(400).json({
            message: "Error Creating User",
            data: error,
            error
        });
    }
});
exports.createUser = createUser;
const viewUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield prisma.userModel.findMany({});
        return res.status(200).json({
            message: "Viewed User Successfuly",
            data: user,
        });
    }
    catch (error) {
        return res.status(400).json({
            message: "Error Viewing User",
            data: error,
        });
    }
});
exports.viewUser = viewUser;
const likeUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userID, friendID } = req.params;
        const user = yield prisma.userModel.findUnique({
            where: { id: userID },
        });
        const friend = yield prisma.userModel.findUnique({
            where: { id: friendID },
        });
        const check = yield friend.likes.some((el) => el === userID);
        if (user) {
            if (friend) {
                if (!check) {
                    const data = [...friend === null || friend === void 0 ? void 0 : friend.likes, userID];
                    const liked = yield prisma.userModel.update({
                        where: { id: friendID },
                        data: { likes: data },
                    });
                    return res.status(200).json({
                        message: "Liked User Successfuly",
                        data: liked,
                    });
                }
                else {
                    return res.status(400).json({
                        message: "You've Liked this User already"
                    });
                }
            }
            else {
                return res.status(404).json({
                    message: "Friend Not Found",
                });
            }
        }
        else {
            return res.status(404).json({
                message: "User Not Found",
            });
        }
    }
    catch (error) {
        return res.status(400).json({
            message: "Error Liking User",
            data: error,
        });
    }
});
exports.likeUser = likeUser;
const unLikeUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userID, friendID } = req.params;
        const user = yield prisma.userModel.findUnique({
            where: { id: userID },
        });
        const friend = yield prisma.userModel.findUnique({
            where: { id: friendID },
        });
        if (user) {
            if (friend) {
                const data = friend === null || friend === void 0 ? void 0 : friend.friends.filter((el) => el !== userID);
                const unliked = yield prisma.userModel.update({
                    where: { id: friendID },
                    data: { likes: data },
                });
                return res.status(200).json({
                    message: "unLiked User Successfuly",
                    data: unliked,
                });
            }
            else {
                return res.status(404).json({
                    message: "Friend Not Found",
                });
            }
        }
        else {
            return res.status(404).json({
                message: "Users Not Found",
            });
        }
    }
    catch (error) {
        return res.status(400).json({
            message: "Error unLiking User",
            data: error,
        });
    }
});
exports.unLikeUser = unLikeUser;
const sendFriendRequest = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userID, friendID } = req.params;
        const user = yield prisma.userModel.findUnique({
            where: { id: userID },
        });
        const friend = yield prisma.userModel.findUnique({
            where: { id: friendID },
        });
        if (user && friend) {
            (0, email_1.sendfriendMail)(user, friend).then(() => {
                console.log("Mail Sent");
            });
        }
        const update = [...friend.requests, userID];
        const updated = yield prisma.userModel.update({
            where: { id: friendID },
            data: {
                requests: update,
            },
        });
        return res.status(200).json({
            message: "Sent Request Successfuly",
            data: updated,
        });
    }
    catch (error) {
        return res.status(400).json({
            message: "Error Sending Request",
            data: error,
        });
    }
});
exports.sendFriendRequest = sendFriendRequest;
const deleteUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userID } = req.params;
        const user = yield prisma.userModel.delete({
            where: {
                id: userID,
            },
        });
        return res.status(200).json({
            message: "Deleted User Successfuly",
            data: user,
        });
    }
    catch (error) {
        return res.status(400).json({
            message: "Error Deleting User",
            data: error.message,
        });
    }
});
exports.deleteUser = deleteUser;
const acceptRequest = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userID, friendID } = req.params;
        const user = yield prisma.userModel.findUnique({
            where: { id: userID },
        });
        const friend = yield prisma.userModel.findUnique({
            where: { id: friendID },
        });
        if (user && friend) {
            const newRequests = yield friend.requests.filter((el) => el !== userID);
            const update = yield prisma.userModel.update({ where: { id: friendID }, data: {
                    requests: newRequests
                } });
            const userUpdate = [...user.friends, friendID];
            const friendUpdate = [...friend.friends, userID];
            const newUserFriend = yield prisma.userModel.update({
                where: { id: userID },
                data: {
                    friends: userUpdate,
                },
            });
            const newFriendFriend = yield prisma.userModel.update({
                where: { id: friendID },
                data: {
                    friends: friendUpdate,
                },
            });
            return res.status(200).json({
                message: "You're both friends now",
                data: { newUserFriend, newFriendFriend },
            });
        }
    }
    catch (error) {
        return res.status(400).json({
            message: "Error Accepting Request",
            data: error,
            error,
        });
    }
});
exports.acceptRequest = acceptRequest;
