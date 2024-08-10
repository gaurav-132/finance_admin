import knex from '../config/db.js';


const findUserById = async (id) => {
    const user = await knex('users')
        .select('id','firstName', 'lastName', 'isActive', 'isAdmin', 'mobile')
        .where('id', id)
        .first();
    return user;
};

const findUserByMobile = async (mobile) => {
    const user = await knex('users')
        .select('id','firstName', 'lastName', 'isActive', 'isAdmin', 'mobile', 'password')
        .where('mobile', mobile)
        .first();
    return user;
};

const insertAndGetId = async (userObj) => {
    console.log(userObj);
    const [result] = await knex('users')
        .insert(userObj);
        console.log(result);
    return result; 
};

export { 
    findUserById, 
    findUserByMobile ,
    insertAndGetId,
};
