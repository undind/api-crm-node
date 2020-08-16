import jwt from 'jsonwebtoken';
import { reduce } from 'lodash';

interface ILoginData {
    username: string;
    password: string;
}

export default (user: ILoginData) => {
    let token = jwt.sign(
        {
            data: reduce(user, (result: any, value: string, key: string) => {
                if (key !== 'password') {
                    result[key] = value;
                }
                return result;
            },{})
        },
        process.env.JWT_SECRET as string || '',
        {
            expiresIn: process.env.JWT_MAX_AGE as string,
            algorithm: 'HS256',
        },
    )

    return token;
}