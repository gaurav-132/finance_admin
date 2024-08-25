const validate = (schema) => async (req, res, next) => {
  try {
    const parseBody = await schema.parseAsync(req.body);
    req.body = parseBody;
    console.log("Parsed Data:", parseBody);
    next();
  } catch (error) {
    if (error.errors && error.errors.length > 0) {
        const errorMessages = error.errors.map((err) => err.message);
        const err = {
            status: 400,
            message: errorMessages[0],
        };
        next(err);
    }
  }
};

export { validate };
