import {DataTypes} from "sequelize";

import sequelize from "../sequelize.js";
import {emailRegExp} from "../constants/authConstants.js";


const User = sequelize.define("user", {
        password: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: {
                args: true,
                msg: "Email already exists"
            },
            validate: {
                is: emailRegExp,
            }
        },
        subscription: {
            type: DataTypes.ENUM,
            values: ["starter", "pro", "business"],
            defaultValue: "starter"
        },
        avatarURL: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        token: {
            type: DataTypes.STRING,
            defaultValue: null,
        },
        verify: {
            type: DataType.BOOLEAN,
            defaultValue: false,
        },
        verificationToken: {
            type: DataType.STRING,
        }
    }
);

// User.sync({alter: true});

export default User;
