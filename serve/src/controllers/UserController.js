const User = require('../models/Usermodel');
const bcrypt = require('bcrypt');



const GetAllUser = (req, res) => {
    console.log(req.body);
    User.find((err, usuarios) => {
        if(!err) {
            res.status(200).json(usuarios);
        }else {
            res.status(400).send(err.message);
        }
    });
}

const UserFindId = (req, res) => {
    User.findById(req.params.id,(err, usuarios) => {
        if(!err) {
            res.status(200).json(usuarios)
        }else {
            res.status(400).send(err.message);
        }
    })
}

const Register = async (req, res) => {
    const {username, email, password, pais} = req.body;
    const PasswordHashed = await bcrypt.hash(password, 10);
    const NewUser = new User({
        username, 
        email,
        password: PasswordHashed,
        pais,
    });
    try {
        const Save_Data_Form = await NewUser.save();
        if(!Save_Data_Form) {
            res.status(400).json('No se pudo registrar el usuario');
        }
        res.status(200).json({status: 'Agregado :D'});
    } catch (error) {
        res.status(400).send(error.message)
    }
}

const Login = async (req, res) => {
    const {username, password} = req.body;
    try {
        const user = await User.findOne({
            username
        });
        const Validate_PasswordHashed = await bcrypt.compare(password, user.password);
        if (!user) {
            res.status(400).json('Nombre de usuario no existe');
            return user;
        }
        if(!Validate_PasswordHashed) {
            res.status(400).json('clave no coincide');
        }
        res.status(200).json({Status: 'Ok successfully logueated :D'})
    } catch (error) {
        res.status(400).send(error.message);    }

}

const UpdateUser = async (req, res) => {
    const {username, email, password, pais} = req.body;
    const PasswordHashed = await bcrypt.hash(password, 10);
    const id = req.params.id;
    const updated_user = ({
        username,
        email,
        password:PasswordHashed,
        pais,
    });
    const opciones = { opciones: true };
    try {
        const Update_Form_DataUser = await User.findByIdAndUpdate(
            id,
            updated_user, 
            opciones,
        );
        if(!Update_Form_DataUser) {
            res.status(400).json('Upss no se ha podido actualizar');
        }
        res.status(200).json({ Status: 'user updated successfully' });
    } catch (error) {
        res.status(400).send(error.message);
    }
}

const Delete_User = async (req, res) => {
    const id = req.params.id;
    try {
        const Delete_Form_User = await User.findByIdAndDelete(
            id,
        );
        if(!Delete_Form_User) {
            res.status(400).json('No se pudo Elimnar el usuario :D')
        }
        res.status(200).json({status: 'Elimando :D'});
    } catch (error) {
        res.status(400).send(error.message);
    }
}



module.exports = {GetAllUser, UserFindId, Register, Login, UpdateUser, Delete_User};