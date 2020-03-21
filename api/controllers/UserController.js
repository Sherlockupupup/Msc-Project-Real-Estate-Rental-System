/**
 * UserController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {

    //function - login 
    login: async function (req, res) {

        if (req.method == "GET") return res.view('user/login');

        if (!req.body.username || !req.body.password) return res.badRequest();

        var user = await User.findOne({ username: req.body.username });

        if (!user) return res.status(401).send("User not found");

        // if (user.password != req.body.password) 
        //     return res.status(401).send("Wrong Password");
        const match = await sails.bcrypt.compare(req.body.password, user.password);

        if (!match) return res.status(401).send("Wrong Password");

        req.session.regenerate(function (err) {

            if (err) return res.serverError(err);

            req.session.username = req.body.username;
            req.session.userid = user.id;
            req.session.role = user.role;

            sails.log("[Session] ", req.session);

            // return res.redirect("/");
            if (req.wantsJSON) {
                return res.json({ message: "login successfully.", url: '/Estate/firstpage' });    // for ajax request
            } else {
                return res.redirect('/Estate/firstpage');           // for normal request
            }
        });

    },

    //function - logout
    logout: async function (req, res) {

        req.session.destroy(function (err) {

            if (err) return res.serverError(err);

            // return res.redirect("/");
            if (req.wantsJSON) {
                return res.json({ message: "log out successfully.", url: '/Estate/firstpage' });    // for ajax request
            } else {
                return res.redirect('/Estate/firstpage');           // for normal request
            }
        });
    },

    populate: async function (req, res) {

        var model = await User.findOne(req.session.userid).populate("manages");    //12.7modified.
        //var model = await User.populate("manages");

        if (!model) return res.notFound();

        return res.json(model);

    },

    //function - corent
    corent: async function (req, res) {

        //if (!await User.findOne(req.session.username)) return res.notFound();

        //use Estate function to find Estate's id and populate to show user's id.
        var thatEstate = await Estate.findOne(req.params.id).populate("shows", { id: req.session.userid });
        console.log(1234);
        console.log(thatEstate);
        console.log(5678);
        var thatNumber = await Estate.findOne(req.params.id).populate("shows");   //定义房子下已租人数的变量number
        console.log(thatNumber);
        console.log(thatNumber.shows);
        console.log(thatNumber.shows.length);


        if (thatEstate.shows.length)
            // {
            return res.status(409).send("Already added.");   // conflict
        // return 0;
        // }
        // else{
        //     return 1;
        //     }
        // await User.addToCollection(req.session.userid, "manages").members(req.params.id); //12.7modified
        await User.addToCollection(req.session.userid, "manages").members(req.params.id);
        
        var thatEquiry = await Estate.findOne(req.params.id).populate("shows", { id: req.session.userid });
        console.log(thatEquiry.shows); //做一个输出来查看corent之后的userid

        // return res.redirect("/Estate/myrentals");
        if (req.wantsJSON) {
            return res.json({ message: "corent successfully.", url: '/Estate/myrentals' });    // for ajax request
        } else {
            return res.redirect('/');           // for normal request
        }

    },

    // function - cancel corent
    cancel: async function (req, res) {

        //if (!await User.findOne(req.params.id)) return res.notFound();

        var thatEstate = await Estate.findOne(req.params.id).populate("shows", { id: req.session.userid });

        if (!thatEstate) return res.notFound();

        if (!thatEstate.shows.length)
            return res.status(409).send("Nothing to cancel.");    // conflict

        await User.removeFromCollection(req.session.userid, "manages").members(req.params.id);

        // return res.redirect("/Estate/myrentals");
        if (req.wantsJSON) {
            return res.json({ message: "move out successfully.", url: '/Estate/myrentals' });    // for ajax request
        } else {
            return res.redirect('/');           // for normal request
        }

    },

    // //function - full corent
    // full: async function(req, res){
    //     var thatEstate = await Estate.findOne(req.params.id).populate("shows",{id:req.session.userid});//查房子id下的有几人已租，跟tenants作比较

    //     if 

    //     if(!thatEstate) return res.notFound();


    // },

    //function - myrentals records
    myrentals: async function (req, res) {
        var model = await User.findOne({ username: req.session.username }).populate("manages");

        manages = model.manages; // 
        console.log(1);
        console.log(manages);

        if (!model) return res.notFound();


        return res.view('Estate/myrentals', { manages: manages });

    }
};

