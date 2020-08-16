import jwt from 'jsonwebtoken';

export default (token: string) =>
    new Promise((resolve, reject) => {
        jwt.verify(token, process.env.JWT_SECRET as string || '', (err, decodedData) => {
            if (err || !decodedData) {
                return reject(err);
            }

            resolve(decodedData)
        })
    })