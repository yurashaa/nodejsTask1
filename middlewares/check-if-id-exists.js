module.exports = async (req, res, next) => {
    try{
        let { id } = req.params;

        if(+id < 0 || isNaN(id))
            throw new Error('No element with this id');

        next();
    } catch (e) {
        res.json(e.message);
    }
};
