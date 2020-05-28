module.exports = (req, res, next) => {
    try {
        let {name, price} = req.body;


        if ( !name || !price) {
            throw new Error('Not valid data');
        }

        if(name.length < 2){
            throw new Error('Name is too short');
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
