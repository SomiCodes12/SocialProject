import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import { friendMail } from "../Utils/email";

const prisma = new PrismaClient();

export const createUser = async (req: Request, res: Response) => {
  try {
    const { name, email, location } = req.body;

    const user = await prisma.userModel.create({
      data: {
        name,
        email,
        location,
      },
    });

    return res.status(200).json({
        message : "Creted User Successfuly",
        data : user
    })
  } catch (error) {
    return res.status(400).json({
      message: "Error Creating User",
      data: error,
    });
  }
};

export const viewUser = async (req: Request, res: Response) => {
  try {

    const user = await prisma.userModel.findMany();

    return res.status(200).json({
        message : "Viewed User Successfuly",
        data : user
    })
  } catch (error) {
    return res.status(400).json({
      message: "Error Viewing User",
      data: error,
    });
  }
};

export const likeUser = async (req: Request, res: Response) => {
  try {
    const { userID , friendID } = req.params;

    const user = await prisma.userModel.findUnique({
        where : {id : userID}
    })
    const friend : any = await prisma.userModel.findUnique({
        where : {id : friendID}
    })

    const like = friend?.likes.push(userID)
    friend?.save();
    

    return res.status(200).json({
        message : "Liked User Successfuly",
        data : like
    })
  } catch (error) {
    return res.status(400).json({
      message: "Error Liking User",
      data: error,
    });
  }
};

export const sendFriendRequest = async (req: Request, res: Response) => {
  try {
    const { userID , friendID } = req.params;

    const user = await prisma.userModel.findUnique({
        where : {id : userID}
    })
    const friend : any = await prisma.userModel.findUnique({
        where : {id : friendID}
    })

    if (user && friend) {
        friendMail(user , friend).then(() => {
            console.log("Mail Sent");
        });

    //     const accept = await prisma.userModel.update({
    //         where : {id : friend.id},
    //         data : {
                
    //         }
    //     })
    }
    

    return res.status(200).json({
        message : "Sent Request Successfuly"
    })
  } catch (error) {
    return res.status(400).json({
      message: "Error Liking User",
      data: error,
    });
  }
};

export const deleteUser = async (req: Request, res: Response) => {
  try {
    const { userID  } = req.params;

    const user = await prisma.userModel.delete({
        where : {
            id : userID
        }
    })

    return res.status(200).json({
        message : "Deleted User Successfuly",
        data : user
    })
  } catch (error) {
    return res.status(400).json({
      message: "Error Deleting User",
      data: error,
    });
  }
};


