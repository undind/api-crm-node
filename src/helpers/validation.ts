import { check } from 'express-validator';

export const validateSignIn = [
    check('username').isLength({ min: 3 }).withMessage('Username must be at least 3 chars long'),
    check('password').isLength({ min: 5 }).withMessage('Password must be at least 5 chars long'),
];

export const validateSignUp = [
    check('email').isEmail().withMessage('Must be a email format'),
    check('username').isLength({ min: 3 }).withMessage('Username must be at least 3 chars long'),
    check('password').isLength({ min: 5 }).withMessage('Password must be at least 5 chars long'),
];
