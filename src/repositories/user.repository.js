import { deleteUser, findUserById, findUserByMobile, getUsersData, insertAndGetId } from "../models/user.model.js";
import bycrypt from 'bcryptjs'

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

const getUsersService = async(filterObj) => {
    return await getUsersData(filterObj);
};

const deleteUserService = async (userId) => {
    return await deleteUser(userId);
};

export {
    getUser,
    findUser,
    insertGetId,
    getUsersService,
    deleteUserService
}