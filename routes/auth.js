import express from 'express';
import jwt from 'jsonwebtoken';
import passport from 'passport';

const router = express.Router();
router.post(
  '/',
  passport.authenticate('basic', {session: false}),
  (req, res) => {
    const token = jwt.sign(req.user.toJSON(), process.env.TOKEN_SECRET, {
      expiresIn: '7 days'
    });
    res.send(token);
  }
);

export default router;
