// db.help();

// user users
use('usersDb');

// --------------------------------

// --- collection (table) / document (row)
// [{},{},...] - collection
// {} - document

// ----- CRUD -----

// C insertOne({})/insertMany([])          INSERT
// R find({},{}).sort({}).limit().skip()   SELECT

// --- C - INSERT - insertOne({})/insertMany([])
// db.users.insertOne({ name: 'Test', age: 20 });
// db.users.insertOne({ name: 'Ivo', age: 35 });
// db.users.insertMany([
//   {
//     firstName: 'Test1',
//     lastName: 'testovych1',
//     email: 'test@test.com',
//     birthday: new Date(1995, 5, 20),
//     isMarried: false,
//     yearsOfExperiense: 8,
//     gender: 'male',
//   },
//   {
//     firstName: 'Test2',
//     lastName: 'testovych2',
//     email: 'test2@test.com',
//     birthday: new Date(1998, 1, 5),
//     yearsOfExperiense: 5,
//     gender: 'female',
//     languages: ['EN', 'UA'],
//     phone: {
//       work: '+380987654321',
//       home: '+380987654322',
//     },
//   },
// ]);
// db.users.insertMany([
//   {
//     name: 'John Smith',
//     email: 'john.smith@example.com',
//     yearsOfExperience: 5,
//     address: {
//       city: 'Kyiv',
//       street: 'Khreshchatyk Street',
//       building: '20',
//     },
//     hobbies: ['football', 'reading', 'traveling'],
//     birthDate: new Date('1993-04-15'),
//     gender: 'male',
//   },
//   {
//     name: 'Olena Petrivna',
//     email: 'olena.petrovna@example.com',
//     yearsOfExperience: 3,
//     address: {
//       city: 'Lviv',
//       street: 'Svobody Avenue',
//       building: '5',
//     },
//     hobbies: ['drawing', 'cycling', 'swimming'],
//     birthDate: new Date('1998-02-10'),
//     gender: 'female',
//   },
//   {
//     name: 'Andriy Sydorov',
//     email: 'andriy.sydorov@example.com',
//     yearsOfExperience: 15,
//     address: {
//       city: 'Odesa',
//       street: 'Derybasivska Street',
//       building: '15',
//     },
//     hobbies: ['fishing', 'chess', 'gardening'],
//     birthDate: new Date('1983-07-25'),
//     gender: 'male',
//   },
//   {
//     name: 'Maria Kovalenko',
//     email: 'maria.kovalenko@example.com',
//     yearsOfExperience: 10,
//     address: {
//       city: 'Kharkiv',
//       street: 'Sumskaya Street',
//       building: '12',
//     },
//     hobbies: ['traveling', 'yoga', 'cooking'],
//     birthDate: new Date('1989-12-05'),
//     gender: 'female', // Gender field
//   },
// ]);
// --- R - SELECT - find()

// пагінація - LIMIT OFFSET - limit skip
// db.users.find().limit(2).skip(2);

// сортування - ORDER BY - sort
//  1 - ASC
// -1 - DESC
// db.users.find().sort({ yearsOfExperience: -1 });

// db.users.find().sort({ email: 1 }).limit(3).skip(3);

// проєкція
// SELECT first_name ...

// ----- проекція ---- SELECT firstName
//           WHERE    SELECT firstName
//               \    /
// db.users.find({}, { firstName: 1 })
// db.users.find({}, { firstName: 1, _id: 0 })

// db.users.find({}, { firstName: 1, lastName: 1 });

// Фільтрація
// фільтрація - WHERE - find({})
// db.users.find({ gender: 'male' });

// WHERE firstName = 'Test1' AND isMarried = false
// db.users.find({ firstName: 'Test1', lastName: 'Testovich' });

// WHERE firstName = 'Test1' OR lastName = 'testovych2'
// db.users.find({ $or: [{ firstName: 'Test1' }, { lastName: 'testovych2' }] });

// WHERE yearsOfExperience > 4
// db.users.find({ yearsOfExperience: { $gt: 4 } });

// db.users.find({
//   $and: [
//     { birthDate: { $gte: new Date(1990, 0, 1) } },
//     { birthDate: { $lte: new Date(1999, 11, 31) } },
//   ],
// });

// Загальний вигляд:
// db.collection.find({ фільтрация }, { проекція }).sort({}).limit().skip()

// db.users.find({ 'address.city': 'Lviv' });

// db.users.insertMany([
//   {
//     firstName: 'Test2',
//     lastName: 'testovych2',
//     email: 'test2@test.com',
//     birthday: new Date(1998, 1, 5),
//     yearsOfExperiense: 5,
//     gender: 'female',
//     languages: ['EN', 'UA'],
//     phone: {
//       work: '+380987654321',
//       home: '+380987654322',
//     },
//   },
//   {
//     firstName: 'Test2',
//     lastName: 'testovych2',
//     email: 'test2@test.com',
//     birthday: new Date(1998, 1, 5),
//     yearsOfExperiense: 5,
//     gender: 'female',
//     languages: ['UA', 'EN'],
//     phone: {
//       work: '+380987654321',
//       home: '+380987654322',
//     },
//   },
//   {
//     firstName: 'Test2',
//     lastName: 'testovych2',
//     email: 'test2@test.com',
//     birthday: new Date(1998, 1, 5),
//     yearsOfExperiense: 5,
//     gender: 'female',
//     languages: ['EN', 'UA', 'PL'],
//     phone: {
//       work: '+380987654321',
//       home: '+380987654322',
//     },
//   },
// ]);

// ['EN', 'UA'], ['EN', 'UA'], ['UA','EN'], ['EN', 'UA', "PL"]

// Вбудовані документи
// from Lviv
// db.users.find({ 'address.city': 'Lviv' });

// Пошук за масивом
// ['EN', 'UA'], ['EN', 'UA'], ['UA','EN'], ['EN', 'UA', "PL"]
// повні відповідність
// db.users.find({ languages: ['EN', 'UA'] });
// мають міститися
// db.users.find({ languages: { $all: ['EN', 'UA'] } });
// має міститися
// db.users.find({ languages: 'PL' });

// U - UPDATE - updateOne/updateMany
// db.collection.updateOne(<filter>, <update>, <options>)
// db.collection.updateMany(<filter>, <update>, <options>)
// db.collection.replaceOne(<filter>, <update>, <options>)

// db.users.updateOne({ name: 'Test' }, { $set: { name: 'newTest' } });

// db.users.updateOne(
//   { _id: ObjectId('671e58a050aa454273dbe05a') },
//   { $set: { age: 21 } }
// );

// D - DELETE - deleteOne/Many({})
// db.users.deleteOne({ _id: ObjectId('671e58a050aa454273dbe05a') });

// db.users.aggregate([
//   {
//     $group: {
//       _id: '$gender',
//       peopleCount: {
//         $count: {},
//       },
//     },
//   },
//   {
//     $sort: {
//       peopleCount: -1,
//     },
//   },
// ]);
