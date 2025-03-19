import jwt from 'jsonwebtoken';

const generateToken = (res,id) => {
    const token = jwt.sign({id}, process.env.JWT_SECRET, {
        expiresIn: '30d',
    });

    // res.json('jwt',token,{
    //     httpOnly: true,
    //     secure: process.env.NODE_ENV === 'production',
    //     sameSite: 'strict',
    //     maxAge: 30 * 24 * 60 * 60 * 1000,
    // })

  // Return the token as a Bearer Token
  res.json({ token: `Bearer ${token}` });
};

export default generateToken;