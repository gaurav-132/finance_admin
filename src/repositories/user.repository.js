import { findUserById, findUserByMobile, insertAndGetId } from "../models/user.model.js";


const getUser = async (id) => {
    return findUserById(id);
};

const findUser = async (mobile) => {
    const user = await findUserByMobile(mobile);

    return user;
}

const insertGetId = async (userObj) => {

    return await insertAndGetId(userObj);
};


export {
    getUser,
    findUser,
    insertGetId
}