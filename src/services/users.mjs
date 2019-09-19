import { default as User, UserRole, getRole } from '../models/users.mjs';

export const checkRole = (role) => {
    if (!role) throw new Error('No role specified');
    // if (!(role === UserRole.OPERATOR || role === UserRole.ADMIN))
    //     throw new Error('Invalid role specified');
    return true;
}

export const createUser = (name, email, password, role) => {
    const user = new User();
    user.name = name;
    user.email = email;
    user.password = password;
    user.role = getRole(role); //Note: will throw error if role doesn't exist
    user.save((err) => {
        if (err) {
            console.log('failed to save user', err)
            throw new Error('Failed to save user to the database', err);
        }
    });
    return user;
}

export const getUserByEmail = (email, cb) => {
    User.findOne({email: email}, cb);
};

export const getUsers = (cb) => {
    User.find({},['name', 'email', 'role'], cb);
}

export const getUser = (id, cb) => {
    User.findById(id,['name', 'email', 'role'], cb);
}

export const setPassword = (password, user) => {
    user.password = password;
    user.save(err => {
        if (err) {
            throw new Error('Failed to save user password to the database', err);
        }
    });
}