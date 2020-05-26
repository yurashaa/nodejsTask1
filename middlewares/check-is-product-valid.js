module.exports = (req, res, next) => {
    try {
        const {id, name, price} = req.body;

        if (!id || !name || !price) {
            throw new Error('Not valid data');
        }

        if (id < 1) {
            throw new Error('Id is not valid');
        }

        if (price < 0) {
            throw new Error('Price is not valid');
        }

        next();
    } catch (e) {
        console.log(e.message);
        res.json(e.message);
    }
};
