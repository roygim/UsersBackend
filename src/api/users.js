module.exports = (router) => {
    router.get("/users/signup", async (req, res, next) => {
        try {
            console.log('/users/signup')
            res.send('users, World!');
        } catch (err) {
            next(err);
        }
    });
};
