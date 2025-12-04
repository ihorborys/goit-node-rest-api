import bcrypt from "bcrypt";

import User from "../db/models/User.js";

import HttpError from "../helpers/HttpError.js";

import {createToken} from "../helpers/jwt.js";
import gravatar from "gravatar";

export const findUser = where => User.findOne({where});

export const registerUser = async payload => {
    const {email, password} = payload;

    const hashPassword = await bcrypt.hash(password, 10);

    const avatarURL = gravatar.url(email, {
        s: '250',
        r: 'pg',
        d: 'identicon',
    }, true);

    return User.create({...payload, password: hashPassword, avatarURL});
};


export const loginUser = async ({email, password}) => {
    const user = await findUser({email});
    if (!user) throw HttpError(401, "Email or password invalid");

    const passwordCompare = await bcrypt.compare(password, user.password);
    if (!passwordCompare) throw HttpError(401, "Email or password invalid");

    const payload = {
        id: user.id,
    };

    const token = createToken(payload);

    await user.update({token});

    return {
        token,
        user: {
            email: user.email,
            subscription: user.subscription
        }
    };
};

export const refreshUser = async user => {
    const token = createToken({id: user.id});

    await user.update({token});

    return {
        token,
        user: {
            email: user.email,
            subscription: user.subscription
        }
    };
};

export const logoutUser = async user => {
    await user.update({token: null});
    return true;
};