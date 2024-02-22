const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const SECRET_KEY = process.env.SECRET_KEY

const User = require('../models/users')

exports.signup = async (req, res, next) => {
    try {
        const hashedPassword = await bcrypt.hash(req.body.password, 10)
        const user = new User({
            name: req.body.name,
            email: req.body.email,
            password: hashedPassword
        });
        await user.save()
        res.status(201).json({ message: 'Utilisateur créé !' })

    } catch (error) {
        res.status(400).json({ error })
    }
}

exports.login = async (req, res, next) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email: email });
        if (user) {
            bcrypt.compare(password, user.password, (err, response) => {
                if (err) {
                    throw new Error(err);
                }
                if (response) {
                    delete user._doc.password;
                    const expireIn = 24 * 60 * 60;
                    const token = jwt.sign({
                        userId: user._id
                    }, 'SECRET_KEY', {
                        expiresIn: expireIn
                    });
                    res.header('Authorization', 'Bearer ' + token);
                    res.cookie('token', token, { maxAge: expireIn * 1000, httpOnly: true });
                    return res.status(200).render('welcome');
                } else {
                    return res.status(403).json('wrong_credentials');
                }
            });
        } else {
            return res.status(404).json('user_not_found');
        }
    } catch (error) {
        res.status(500).json({ error });
    }
};

exports.createUser = async (req, res, next) => {
    try {
        const userObject = req.body.user
        delete userObject._id
        delete userObject._userId
        const user = new User({
            name: req.body.name,
            email: req.body.email,
            password: req.body.password,
        })
        await user.save()
        res.status(201).redirect('/users');
    } catch (error) {
        res.status(400).json({ error })
    }
};

exports.getOneUser = async (req, res, next) => {
    try {
        const user = await User.findOne({ _id: req.params.id })
        if (!user) {
            return res.status(400).json({ message: 'Utilisateur non trouvé' })
        }
        res.status(200).render('user_detail', { user: user })

    } catch (error) {
        res.status(400).json({ error })
    }
};

exports.getAllUsers = async (req, res, next) => {
    try {
        const users = await User.find()
        res.status(200).render('users', { users: users })
    } catch (error) {
        res.status(400).json({ error })
    }
};

exports.updateUser = async (req, res, next) => {
    try {
        await User.updateOne({ _id: req.params.id }, {
            _id: req.params.id,
            name: req.body.name,
            email: req.body.email,
            password: req.body.password,

        })
        return res.status(200).json('Utilisateur modifié')
    } catch (error) {
        res.status(400).json({ error })
    }
};

exports.deleteUser = async (req, res, next) => {
    try {
        await User.deleteOne({ _id: req.params.id })
        res.status(200).json({ message: 'Utilisateur supprimé !' })
    } catch (error) {
        res.status(400).json({ error })
    }
}