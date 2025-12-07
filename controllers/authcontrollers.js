import {loginUser, logoutUser, refreshAvatar, refreshUser, registerUser, verifyUser} from "../services/authServices.js";


export const registerController = async (req, res) => {
    const newUser = await registerUser(req.body);

    res.status(201).json({
        user: {
            email: newUser.email,
            subscription: newUser.subscription,
            avatarURL: newUser.avatarURL,
        }
    });
};

export const verifyController = async (req, res) => {
    const {verificationToken} = req.params;
    await verifyUser(verificationToken);

    res.json({
        message: "Email successfully verified",
    });

};

export const loginController = async (req, res) => {
    const result = await loginUser(req.body);

    res.json(result);

};

export const getCurrentController = async (req, res) => {
    const result = await refreshUser(req.user);

    res.json(result);
};

export const logoutController = async (req, res) => {
    await logoutUser(req.user);

    res.status(204).send();
};

export const refreshAvatarController = async (req, res) => {
    const refreshedUser = await refreshAvatar(req);

    res.status(200).json({
        avatarURL: refreshedUser.avatarURL,
    });
};