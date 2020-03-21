/**
 * EstateController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
    // action - create
    create: async function (req, res) {


        if (req.method == "GET")
            return res.view('Estate/create');

        if (!req.body.Estate)
            return res.badRequest("Form-data not received.");

        await Estate.create(req.body.Estate);

        return res.ok("A new record has been successfully created!");
    },
    // json function
    json: async function (req, res) {

        var Estates = await Estate.find();

        return res.json(Estates);
    },
    // action - index
    index: async function (req, res) {

        var models = await Estate.find();
        return res.view('Estate/index', { Estates: models });

    },
    // action - view
    view: async function (req, res) {

        var model = await Estate.findOne(req.params.id);

        if (!model) return res.notFound();

        return res.view('Estate/view', { Estate: model });

    },
    // action - delete 
    // delete: async function (req, res) {

    //     if (req.method == "GET") return res.forbidden();

    //     var models = await Estate.destroy(req.params.id).fetch();

    //     if (models.length == 0) return res.notFound();

    //     return res.ok("The Estate record has been deleted.");

    // },
    delete: async function (req, res) {

        if (req.method == "GET") return res.forbidden();

        var models = await Estate.destroy(req.params.id).fetch();

        if (models.length == 0) return res.notFound();

        if (req.wantsJSON) {
            return res.json({ message: "Estate record deleted.", url: '/Estate/index' });    // for ajax request
        } else {
            return res.redirect('/');           // for normal request
        }
    },
    // action - update
    update: async function (req, res) {

        if (req.method == "GET") {

            var model = await Estate.findOne(req.params.id);

            if (!model) return res.notFound();

            return res.view('Estate/update', { Estate: model });

        } else {

            if (!req.body.Estate)
                return res.badRequest("Form-data not received.");

            var models = await Estate.update(req.params.id).set({
                Propertytitle: req.body.Estate.Propertytitle,
                ImageURL: req.body.Estate.ImageURL,
                Estate: req.body.Estate.Estate,
                Bedrooms: req.body.Estate.Bedrooms,
                GrossArea: req.body.Estate.GrossArea,
                ExpectedTenants: req.body.Estate.ExpectedTenants,
                Rent: req.body.Estate.Rent,
                Highlighted: req.body.Estate.Highlighted || ""
            }).fetch();

            if (models.length == 0) return res.notFound();

            return res.ok("The record has been updated");

        }
    },




    // action - search
    paginate: async function (req, res) {
        const numOfItemsPerPage = 2;
        const qPage = Math.max(req.query.page - 1, 0) || 0;
        // const global = req.query.global || ''; //define a global constance

        const qEstate = req.query.Estate || '';
        const qBedrooms = parseInt(req.query.Bedrooms);
        const qGrossAreaMin = parseInt(req.query.GrossAreaMin) || 0;
        const qGrossAreaMax = parseInt(req.query.GrossAreaMax) || 5000;
        const qRentMin = parseInt(req.query.RentMin) || 0;
        const qRentMax = parseInt(req.query.RentMax) || 50000;


        if (isNaN(qBedrooms)) {
            var numOfPage = Math.ceil(await Estate.count({
                where: {
                    Estate: { contains: qEstate },
                    GrossArea: { '>=': qGrossAreaMin, '<=': qGrossAreaMax },
                    Rent: { '>=': qRentMin, '<=': qRentMax }
                }
            }) / numOfItemsPerPage);
            var models = await Estate.find({
                where: {
                    Estate: { contains: qEstate },
                    GrossArea: { '>=': qGrossAreaMin, '<=': qGrossAreaMax },
                    Rent: { '>=': qRentMin, '<=': qRentMax }
                },

                limit: numOfItemsPerPage,
                skip: numOfItemsPerPage * qPage
            });
            return res.view('Estate/paginate', { Estates: models, count: numOfPage });
        } else {
            var numOfPage = Math.ceil(await Estate.count({
                where: {
                    Bedrooms: qBedrooms,
                    Estate: { contains: qEstate },
                    GrossArea: { '>=': qGrossAreaMin, '<=': qGrossAreaMax },
                    Rent: { '>=': qRentMin, '<=': qRentMax }
                },
            }) / numOfItemsPerPage)
            var models = await Estate.find({
                where: {
                    Bedrooms: qBedrooms,
                    Estate: { contains: qEstate },
                    GrossArea: { '>=': qGrossAreaMin, '<=': qGrossAreaMax },
                    Rent: { '>=': qRentMin, '<=': qRentMax }
                },
                limit: numOfItemsPerPage,
                skip: numOfItemsPerPage * qPage
            });


        }

        return res.view('Estate/paginate', { Estates: models, count: numOfPage });
    },















    //action - firstpage
    firstpage: async function (req, res) {

        var models = await Estate.find({
            where: {
                Highlighted: "on",
            },
            limit: 4,
            sort: ('createdAt DESC'),
        });

        return res.view('Estate/firstpage', { Estates: models });
    },
    //action - details
    details: async function (req, res) {
        var model = await Estate.findOne(req.params.id);

        if (!model) return res.notFound();

        var thatEstate = await Estate.findOne(req.params.id).populate("shows", {id: req.session.userid});
        console.log(thatEstate);
        var thatNumber = await Estate.findOne(req.params.id).populate("shows");   //定义房子下已租人数的变量number
        numberOfClients = thatNumber.shows.length;   //房子下的租客人数
        UserRentStatus = thatEstate.shows.length;    //user是否租过这房子，有=1，无=0
        maxTenants = model.ExpectedTenants;  //定义一个最大的租客人数，因为在details页面取model的值不方便。

        return res.view('Estate/details', { Estate: model, numberOfClients: numberOfClients , UserRentStatus: UserRentStatus, maxTenants: maxTenants });
    },
    //action - occupants
    occupants: async function (req, res) {
        var models = await Estate.findOne(req.params.id).populate("shows");

        if (!models) return res.notFound();

        return res.view('Estate/occupants', { Estates: models.shows});
    },
    // // action - index
    // index: async function (req, res) {

    //     var models = await Estate.find();
    //     return res.view('Estate/index', { Estates: models });

    // },
    //action - populate
    populate: async function (req, res) {

        var model = await Estate.find(req.params.id).populate("shows");

        if (!model) return res.notFound();

        return res.json(model);

    },

    rentalJSON: async function (req, res) {

        var model = await Estate.find(req.params.id).populate("shows");

        if (!model) return res.notFound();

        return res.json(model);

    },
    

};

