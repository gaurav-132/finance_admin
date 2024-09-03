import knex from "../config/db.js";

const addLocationDB = async (locationObj) => {
    await knex("locations").insert(locationObj);
};

const applyFilters = (query, filterObj) => {};

const getLocationsDB = async (filterObj) => {
    const totalQuery = knex("locations").count("id as count");
    applyFilters(totalQuery, filterObj);

    const totalResult = await totalQuery.first();
    const total = totalResult.count;

    let locationsQuery = knex("locations").select("*");

    if (filterObj.limit) {
        locationsQuery.limit(filterObj.limit);
    }

    if (filterObj.offset) {
        locationsQuery.offset(filterObj.offset);
    }

    const locations = await locationsQuery;

    return { locations, total };
};

export { addLocationDB, getLocationsDB };
