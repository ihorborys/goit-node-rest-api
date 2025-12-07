import bcrypt from "bcrypt";
import User from "../db/models/User.js";
import HttpError from "../helpers/HttpError.js";
import {createToken} from "../helpers/jwt.js";
import gravatar from "gravatar";
import sendEmail from "../helpers/sendEmail.js";
import * as fs from "node:fs/promises";
import path from "node:path";

const {PUBLIC_URL} = process.env;

const postersDir = path.resolve("public", "avatars");

export const findUser = where => User.findOne({where});

export const registerUser = async payload => {
    const {email, password} = payload;

    const hashPassword = await bcrypt.hash(password, 10);

    const avatarURL = gravatar.url(email, {
        s: '250',
        r: 'pg',
        d: 'identicon',
    }, true);

    const user = await User.create({...payload, password: hashPassword, avatarURL});

    const verificationToken = createToken({email: payload.email});

    const verifyEmail = {
        to: payload.email,
        subject: "Verify your email",
        html: `<a href="${PUBLIC_URL}/auth/verify/${verificationToken}/"  target="_blank">Click to verify Your email></a>`,
    };

    await sendEmail(verifyEmail);

    return user;
};


export const loginUser = async ({email, password}) => {
    const user = await findUser({email});
    if (!user) throw HttpError(401, "Email or password invalid");

    if (!user.verify) throw HttpError(401, "Email not verified");

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

export const refreshAvatar = async req => {
    const user = req.user;
    const file = req.file;

    let avatar = null;

    if (file) {
        const newPath = path.join(postersDir, file.filename);
        await fs.rename(file.path, newPath);
        avatar = path.join("avatars", file.filename);
    }

    return user.update({avatarURL: avatar});

};