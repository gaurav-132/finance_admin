import middlewareLoader from './middlewareLoader.js';
import routesLoader from './routesLoader.js';
import errorHandlerLoader from './errorHandlerLoader.js';


const loadAll = (app) => {
    middlewareLoader(app);
    routesLoader(app);
    errorHandlerLoader(app);
};

export default loadAll;
