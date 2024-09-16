import knex from "../config/db.js";

const addLocationDB = async (locationObj) => {
    const { id, ...data } = locationObj;
    const existingEntry = await knex("locations").where({ id }).first();

    if (existingEntry) {
        // Update the existing entry
        await knex("locations").where({ id }).update(data);
    } else {
        // Insert a new entry
        await knex("locations").insert(data);
    }
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

const getTopLocationsDB = async (limit = 3) => {
    const topLocations = await knex("locations")
        .select("locationName")
        .count("id as loanCount")
        .groupBy("locationName")
        .orderBy("loanCount", "desc")
        .limit(limit);  

    return topLocations;
};
export { addLocationDB, getLocationsDB , getTopLocationsDB};
