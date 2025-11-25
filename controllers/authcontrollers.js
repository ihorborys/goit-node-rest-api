import {loginUser, registerUser} from "../services/authServices.js";


export const registerController = async (req, res) => {
    const newUser = await registerUser(req.body);

    res.status(201).json({
        user: {
            email: newUser.email,
            subscription: newUser.subscription
        }
    });
};

export const loginController = async (req, res) => {
    const token = await loginUser(req.body);

    res.json({
        token,

    });

};

export const getCurrentController = async (req, res) => {
    const {email, subscription} = req.user;

    res.json({
        email,
        subscription
    });
};