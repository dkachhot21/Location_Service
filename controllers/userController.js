import { constants } from '../constants.js';
import expressAsyncHandler from 'express-async-handler';
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { User } from '../models/userSchema.js';
import Joi from 'joi';

// JOI schema for user registration
const registerSchema = Joi.object({
    username: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().required(),
});


//@desc Register a user
//@route POST /user/register
//@access public
export const registerUser = expressAsyncHandler(async (req, res) => {
    // Validate request body against schema
    const { error } = registerSchema.validate(req.body);
    if (error) {
        res.status(constants.BAD_REQUEST).json({error:error.details[0].message});
        return
    }

    const { username, email, password } = req.body;

    const userAvailable = await User.findOne({ email });

    //If the user with this email already exists
    if (userAvailable) {
        res.status(constants.BAD_REQUEST);
        throw new Error("User already exists!");
    }
    //Hashed Password
    const hashedPassword = await bcrypt.hash(password, 10);

    //Create and save a new user
    const user = await User.create({
        username,
        email,
        password: hashedPassword,
    });

    //Check if user is successfully registered
    if (user) {
        res.status(constants.CREATED).json({
            message: 'User has been registered successfully',
        });
    } else {
        res.status(constants.BAD_REQUEST);
        throw new Error("User Data is not Valid");
    }
});


// JOI schema for user login
export const loginSchema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
});

//@desc Login a user
//@route POST /user/login
//@access public
export const loginUser = expressAsyncHandler(async (req, res) => {
    // Validate request body against schema
    const { error } = loginSchema.validate(req.body);
    if (error) {
        res.status(constants.BAD_REQUEST).json({error:error.details[0].message});
        return
    }

    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
        res.status(constants.NOT_FOUND);
        throw new Error("User Not Found");
    }

    //Compare Password
    if (user && (await bcrypt.compare(password, user.password))) {
        const accessToken = jwt.sign({
            user: {
                id: user._id,
                username: user.username,
                email: user.email,
            },
        },
            process.env.ACCESS_TOKEN_KEY,
            { expiresIn: '30m' } //Token Expiration time
        );
        res.status(constants.OK).json({ accessToken });
    } else {
        res.status(constants.UNAUTHORIZED).json({error:"Incorrect Password"});
        return
    }
});




//@desc Get current user
//@route GET /user/current
//@access private
export const currentUser = expressAsyncHandler(async (req, res) => {
    res.json(req.user);
});