/**
 * Estate.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {

    //  ╔═╗╦═╗╦╔╦╗╦╔╦╗╦╦  ╦╔═╗╔═╗
    //  ╠═╝╠╦╝║║║║║ ║ ║╚╗╔╝║╣ ╚═╗
    //  ╩  ╩╚═╩╩ ╩╩ ╩ ╩ ╚╝ ╚═╝╚═╝
    Propertytitle: {
      type: "string"
    },
    
    ImageURL: {
      type: "string"
    },

    Estate: {
      type: "string"
    },

    Bedrooms: {
      type: "number"
    },

    GrossArea: {
      type: "number"
    },

    GrossAreaMin: {
      type: "number"
    },

    GrossAreaMax: {
      type: "number"
    },

    ExpectedTenants: {
      type: "number"
    },

    Rent: {
      type: "number"
    },

    RentMin: {
      type: "number"
    },

    RentMax: {
      type: "number"
    },

    Highlighted: {
      type: "string"
    },

    Latitude: {
      type: "string"
    },
    
    Longitude:{
      type: "string"
    },

    //  ╔═╗╔╦╗╔╗ ╔═╗╔╦╗╔═╗
    //  ║╣ ║║║╠╩╗║╣  ║║╚═╗
    //  ╚═╝╩ ╩╚═╝╚═╝═╩╝╚═╝


    //  ╔═╗╔═╗╔═╗╔═╗╔═╗╦╔═╗╔╦╗╦╔═╗╔╗╔╔═╗
    //  ╠═╣╚═╗╚═╗║ ║║  ║╠═╣ ║ ║║ ║║║║╚═╗
    //  ╩ ╩╚═╝╚═╝╚═╝╚═╝╩╩ ╩ ╩ ╩╚═╝╝╚╝╚═╝

    shows: {
      collection: 'User',
      via: 'manages'
    },
  },

};

