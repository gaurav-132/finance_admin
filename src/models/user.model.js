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

const applyFilters = (query, filterObj) => {
    
    if (filterObj.name) {
        const nameParts = filterObj.name.trim().split(' ');
    
        if (nameParts.length === 1) {
            query.where(function() {
                this.where('firstName', 'like', `%${nameParts[0]}%`)
                    .orWhere('lastName', 'like', `%${nameParts[0]}%`);
            });
        } else if (nameParts.length >= 2) {
            query.where(function() {
                this.where('firstName', 'like', `%${nameParts[0]}%`)
                    .andWhere('lastName', 'like', `%${nameParts[nameParts.length - 1]}%`);
            });
        }
    }
    
    
};

const getUsersData = async (filterObj) => {

    const totalQuery = knex('users').count('id as count');
    applyFilters(totalQuery, filterObj);
    const totalResult = await totalQuery.first();
    const total = totalResult.count; 

    
    let usersQuery = knex('users').select('*');
    applyFilters(usersQuery, filterObj);

    if (filterObj.limit) {
        usersQuery.limit(filterObj.limit);
    }

    if (filterObj.page && filterObj.limit) {
        usersQuery.offset(filterObj.offset);
    }

    const users = await usersQuery;

    return { users, total };
};

export { 
    findUserById, 
    findUserByMobile ,
    insertAndGetId,
    getUsersData,
};
