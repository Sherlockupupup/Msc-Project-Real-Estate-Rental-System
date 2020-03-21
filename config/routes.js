/**
 * Route Mappings
 * (sails.config.routes)
 *
 * Your routes tell Sails what to do each time it receives a request.
 *
 * For more information on configuring custom routes, check out:
 * https://sailsjs.com/anatomy/config/routes-js
 */

module.exports.routes = {

  /***************************************************************************
  *                                                                          *
  * Make the view located at `views/homepage.ejs` your home page.            *
  *                                                                          *
  * (Alternatively, remove this and add an `index.html` file in your         *
  * `assets` directory)                                                      *
  *                                                                          *
  ***************************************************************************/

  '/': { view: 'pages/homepage' },


  /***************************************************************************
  *                                                                          *
  * More custom routes here...                                               *
  * (See https://sailsjs.com/config/routes for examples.)                    *
  *                                                                          *
  * If a request to a URL doesn't match any of the routes in this file, it   *
  * is matched against "shadow routes" (e.g. blueprint routes).  If it does  *
  * not match any of those, it is matched against static assets.             *
  *                                                                          *
  ***************************************************************************/
  'GET /Estate/view/:id': 'EstateController.view',
  //'POST /Estate/delete/:id': 'EstateController.delete',
  'DELETE /Estate/:id': 'EstateController.delete',
  'GET /Estate/update/:id': 'EstateController.update',
  'POST /Estate/update/:id': 'EstateController.update',
  'GET /Estate/details/:id': 'EstateController.details',
  'GET /Estate/occupants/:id': 'EstateController.occupants',
  'GET /': 'EstateController.firstpage',
  'GET /Estate/paginate/:id': 'EstateController.paginate',

  'GET /user/login': 'UserController.login',
  'POST /user/login': 'UserController.login',
  'POST /user/logout': 'UserController.logout',
  'GET /Estate/shows': 'EstateController.populate',
  'GET /Estate/:id/shows': 'EstateController.populate',
  // 'GET /user/:id/manages': 'UserController.populate',     //12.7modified
  // 'POST /user/:id/manages/add/:fk': 'UserController.add',    //12.7modified
  // 'POST /user/:id/manages/remove/:fk': 'UserController.remove',    //12.7modified
  'GET /user/manages': 'UserController.populate',
  'POST /user/manages/add/:fk': 'UserController.add',
  'POST /user/manages/remove/:fk': 'UserController.remove',

  'GET /Estate/myrentals' : 'UserController.myrentals',
  'POST /Estate/corent/:id' : 'UserController.corent',
  'POST /Estate/cancel/:id' : 'UserController.cancel',
  'POST /Estate/full/:id' : 'UserController.corent',

};
