const express = require('express');
const jwt = require('jsonwebtoken');
const Bot = require('..modelsBot');
const User = require('..modelsUser');
const router = express.Router();

 Middleware para autenticação
const auth = (req, res, next) = {
    const token = req.header('x-auth-token');
    if (!token) return res.status(401).json({ msg 'No token, authorization denied' });

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded.user;
        next();
    } catch (err) {
        res.status(401).json({ msg 'Token is not valid' });
    }
};

 Criar um bot
router.post('', auth, async (req, res) = {
    const { name, token } = req.body;
    try {
        const user = await User.findById(req.user.id);
        const bot = new Bot({ name, user user.id, token });
        await bot.save();
        res.json(bot);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

 Obter bots do usuário
router.get('', auth, async (req, res) = {
    try {
        const bots = await Bot.find({ user req.user.id });
        res.json(bots);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

module.exports = router;
