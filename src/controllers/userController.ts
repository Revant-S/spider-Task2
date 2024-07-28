import { Request, Response } from "express";
import { getUserFromRequest } from "./bookControllers";
import User from "../dbModels/userModel";

export async function getMyProfile(req: Request, res: Response) {
  const user = await getUserFromRequest(req);
  if (!user) return res.send("You Are not authorised!!!");
  const populatedUser = await user.populate([{
    path: "books"
  }, {
    path: "favourites"
  }, {
    path: "likedBooks"
  }, {
    path: "reviews", populate: {
      path: "book"
    }
  }])
  res.render("myProfile", {
    user: populatedUser
  })
}

export async function searchUserPage(req: Request, res: Response) {
  const user = await getUserFromRequest(req)
  if (!user) return res.send("You Are Not registered");
  const users = await User.find({ email: { $ne: user.email } }, { password: 0 }).limit(20)
  res.render("searchUserPage", {
    users
  })
}

export const searchUsers = async (req: Request, res: Response) => {
  const user = await getUserFromRequest(req);
  if (!user) return res.send("You dont exit");
  console.log("KJHDopjiwneopiqjghoujihv");

  console.log(req.params);

  const { parameterToSearch } = req.params;
  console.log("HERE!!!!!!!!!!!!!");

  console.log(parameterToSearch);

  if (parameterToSearch === "empty") {
    const matchingUsers = await User.find({ email: { $ne: user.email } }).limit(10);
    console.log(matchingUsers);

    return res.json(matchingUsers)
  }

  const regrex = new RegExp(parameterToSearch, 'i')
  const matchingUsers = await User.find({
    $and: [{ $or: [{ userName: regrex }, { email: regrex }] },
    { email: { $ne: user.email } }]
  }
    , { password: 0 })
  res.json(matchingUsers);

}
export const getUser = async (req: Request, res: Response) => {
  try {
    const userId = req.params.userId;
    const currentUser = await getUserFromRequest(req);

    const user = await User.findById(userId).populate([
      { path: "books" },
      { path: "favourites" },
      { path: "likedReviews" }
    ]);

    if (!user) {
      return res.status(404).send("User Not Found");
    }

    let followThUser = false;

    if (currentUser) {
      followThUser = user.followers.includes(currentUser._id);
    }

    res.render("otherUser", { user, followThUser, currentUser });
  } catch (error) {
    console.error(error);
    res.status(500).send("An error occurred while fetching user data");
  }
};

export const followRequest = async (req: Request, res: Response) => {
  try {
    const user = await getUserFromRequest(req);
    if (!user) return res.status(404).json({ success: false, message: "User Not Found" });

    const { requestedTo } = req.body;
    const targetUser = await User.findById(requestedTo);
    if (!targetUser) return res.status(404).json({ success: false, message: "Target User Not Found" });

    const alreadyFollowing = user.following.includes(targetUser._id);

    if (!alreadyFollowing) {
      user.following.push(targetUser._id);
      targetUser.followers.push(user._id);
      await user.save();
      await targetUser.save();
      return res.json({
        success: true,
        following: true,
      });
    } else {
      user.following = user.following.filter(id => !id.equals(targetUser._id));
      targetUser.followers = targetUser.followers.filter(id => !id.equals(user._id));
      await user.save();
      await targetUser.save();
      return res.json({
        success: true,
        following: false,
      });
    }
  } catch (error: any) {
    console.log(error.message);
    return res.status(500).json({ success: false, message: "Oops! Something went wrong" });
  }
};

