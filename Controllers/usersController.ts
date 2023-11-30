import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import { sendfriendMail } from "../Utils/email";

const prisma = new PrismaClient();

export const createUser = async (req: Request, res: Response) => {
  try {
    const { name, email, location } = req.body;

    const avatar = await name.charAt().toUpperCase();

    const user = await prisma.userModel.create({
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
  } catch (error : any) {
    return res.status(400).json({
      message: "Error Creating User",
      data: error,
      error 
    });
  }
};

export const viewUser = async (req: Request, res: Response) => {
  try {
    const user = await prisma.userModel.findMany();

    return res.status(200).json({
      message: "Viewed User Successfuly",
      data: user,
    });
  } catch (error) {
    return res.status(400).json({
      message: "Error Viewing User",
      data: error,
    });
  }
};

export const likeUser = async (req: Request, res: Response) => {
  try {
    const { userID, friendID } = req.params;

    const user: any = await prisma.userModel.findUnique({
      where: { id: userID },
    });
    const friend: any = await prisma.userModel.findUnique({
      where: { id: friendID },
    });

    const check = await friend.likes.some((el : any) => el === userID)
    if (user) {
      if (friend) {
       if (!check) {
        const data = [...friend?.likes, userID];

        const liked = await prisma.userModel.update({
          where: { id: friendID },
          data: { likes: data },
        });

        return res.status(200).json({
          message: "Liked User Successfuly",
          data: liked,
        });
       } else {
        return res.status(400).json({
          message: "You've Liked this User already"
        });
       }
      } else {
        return res.status(404).json({
          message: "Friend Not Found",
        });
      }
    } else {
      return res.status(404).json({
        message: "User Not Found",
      });
    }
  } catch (error) {
    return res.status(400).json({
      message: "Error Liking User",
      data: error,
    });
  }
};

export const unLikeUser = async (req: Request, res: Response) => {
  try {
    const { userID, friendID } = req.params;

    const user: any = await prisma.userModel.findUnique({
      where: { id: userID },
    });
    const friend: any = await prisma.userModel.findUnique({
      where: { id: friendID },
    });

    if (user) {
      if (friend) {
        const data = friend?.friends.filter((el: any) => el !== userID);

        const unliked = await prisma.userModel.update({
          where: { id: friendID },
          data: { likes: data },
        });

        return res.status(200).json({
          message: "unLiked User Successfuly",
          data: unliked,
        });
      } else {
        return res.status(404).json({
          message: "Friend Not Found",
        });
      }
    } else {
      return res.status(404).json({
        message: "Users Not Found",
      });
    }
  } catch (error) {
    return res.status(400).json({
      message: "Error unLiking User",
      data: error,
    });
  }
};

export const sendFriendRequest = async (req: Request, res: Response) => {
  try {
    const { userID, friendID } = req.params;

    const user: any = await prisma.userModel.findUnique({
      where: { id: userID },
    });
    const friend: any = await prisma.userModel.findUnique({
      where: { id: friendID },
    });

    if (user && friend) {
      sendfriendMail(user, friend).then(() => {
        console.log("Mail Sent");
      });
    }
    const update = [...friend.requests, userID];

    const updated = await prisma.userModel.update({
      where: { id: friendID },
      data: {
        requests: update,
      },
    });

    return res.status(200).json({
      message: "Sent Request Successfuly",
      data: updated,
    });
  } catch (error) {
    return res.status(400).json({
      message: "Error Sending Request",
      data: error,
    });
  }
};

export const deleteUser = async (req: Request, res: Response) => {
  try {
    const { userID } = req.params;

    const user = await prisma.userModel.delete({
      where: {
        id: userID,
      },
    });

    return res.status(200).json({
      message: "Deleted User Successfuly",
      data: user,
    });
  } catch (error : any) {
    return res.status(400).json({
      message: "Error Deleting User",
      data: error.message,
    });
  }
};

export const acceptRequest = async (req: Request, res: Response) => {
  try {
    const { userID, friendID } = req.params;

    const user: any = await prisma.userModel.findUnique({
      where: { id: userID },
    });
    const friend: any = await prisma.userModel.findUnique({
      where: { id: friendID },
    });

    if (user && friend) {
      const newRequests = await friend.requests.filter((el : any) =>  el !== userID)

      const update = await prisma.userModel.update({where : {id : friendID} , data : {
        requests : newRequests
      }})
      const userUpdate = [...user.friends, friendID];
      const friendUpdate = [...friend.friends, userID];

      const newUserFriend = await prisma.userModel.update({
        where: { id: userID },
        data: {
          friends: userUpdate,
        },
      });
      const newFriendFriend = await prisma.userModel.update({
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
  } catch (error: any) {
    return res.status(400).json({
      message: "Error Accepting Request",
      data: error,
      error,
    });
  }
};
