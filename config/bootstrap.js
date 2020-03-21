/**
 * Seed Function
 * (sails.config.bootstrap)
 *
 * A function that runs just before your Sails app gets lifted.
 * > Need more flexibility?  You can also create a hook.
 *
 * For more information on seeding your app with fake data, check out:
 * https://sailsjs.com/config/bootstrap
 */

module.exports.bootstrap = async function () {

  // By convention, this is a good place to set up fake data during development.
  //
  // For example:
  // ```
  // // Set up fake development data (or if we already have some, avast)
  // if (await User.count() > 0) {
  //   return;
  // }
  //
  // await User.createEach([
  //   { emailAddress: 'ry@example.com', fullName: 'Ryan Dahl', },
  //   { emailAddress: 'rachael@example.com', fullName: 'Rachael Shaw', },
  //   // etc.
  // ]);
  // ```
  sails.bcrypt = require('bcryptjs');
  const saltRounds = 10;


  if (await Estate.count() == 0) {
    
  
  await Estate.createEach([
    { Propertytitle: "City One 3 rooms", Estate: "City One", GrossArea: 400, Rent: 26000, ImageURL: "https://tgi13.jia.com/126/673/26673748.png", Bedrooms: 3, ExpectedTenants: 4, Latitude: "22.386389", Longitude: "114.203889", Highlighted: "on" },
    { Propertytitle: "Taikoo Shing 3 rooms", Estate: "Taikoo Shing", GrossArea: 450, Rent: 27000, ImageURL: "https://tgi1.jia.com/126/673/26673750.png", Bedrooms: 3, ExpectedTenants: 4, Latitude: "22.2863", Longitude: "114.2176", Highlighted: "on" },
    { Propertytitle: "Festival City 4 rooms", Estate: "Festival City", GrossArea: 700, Rent: 22000, ImageURL: "https://tgi1.jia.com/126/673/26673751.png", Bedrooms: 4, ExpectedTenants: 5, Latitude: "22.3692", Longitude: "114.1743", Highlighted: "on" },
    { Propertytitle: "Gold Coast 2 rooms", Estate: "Gold Coast", GrossArea: 400, Rent: 25000, ImageURL: "https://tgi1.jia.com/126/673/26673752.png", Bedrooms: 2, ExpectedTenants: 3, Latitude: "22.3673", Longitude: "113.9944", Highlighted: "on" },
    { Propertytitle: "Calson Court 2 rooms", Estate: "Calson Court", GrossArea: 330, Rent: 18000, ImageURL: "https://tgi12.jia.com/126/673/26673776.jpg", Bedrooms: 2, ExpectedTenants: 4, Latitude: "22.3298657855", Longitude: "114.1926068369", Highlighted: "on" },
    { Propertytitle: "Yau Ma Tei 2 rooms", Estate: "Yau Ma Tei", GrossArea: 400, Rent: 20000, ImageURL: "https://tgi1.jia.com/126/673/26673753.png", Bedrooms: 2, ExpectedTenants: 3, Latitude: "22.3102705106", Longitude: "114.1705424753", Highlighted: "on" },
  ]);
}

  if (await User.count() == 0) {

    const hash = await sails.bcrypt.hash('123', saltRounds);

    await User.createEach([
      { username: "admin", password: hash, role: "admin" },
      { username: "client", password: hash, role: "client" },
      { username: "pig", password:hash, role:"client"}
      // etc.
    ]);

  }
  const CityOne3 = await Estate.findOne({Propertytitle: "City One 3 rooms"});
  const FestivalCity4 = await Estate.findOne({Propertytitle: "Festival City 4 rooms"});
  const TaikooShing3 = await Estate.findOne({Propertytitle: "Taikoo Shing 3 rooms"});
  const GoldCoast2 = await Estate.findOne({Propertytitle: "Gold Coast 2 rooms"});
  const CalsonCourt2 = await Estate.findOne({Propertytitle: "Calson Court 2 rooms"});
  const YauMaTei2 = await Estate.findOne({Propertytitle: "Yau Ma Tei 2 rooms"});

  const admin = await User.findOne({username: "admin"});
  const client = await User.findOne({username: "client"});
  
  await User.addToCollection(client.id, 'manages').members([FestivalCity4.id, CityOne3.id]);
  return;
};
