const express = require('express');
const cors = require('cors')

const { MongoClient, ObjectId } = require("mongodb");


// Create Express app

const app = express();
app.use(cors("http://localhost:3000/"))
// Connect to MongoDB

const client = new MongoClient("mongodb://127.0.0.1:27017");

let db = null;

async function main() {
  await client.connect();
  db = client.db("cs415MongProject");

}
main()
  .then(() => console.log("DB is connected....."))
  .catch((error) => console.log(error));

// Middleware for parsing JSON

app.use(express.json());

// Middleware for setting the database object on the request object

app.use(function (req, res, next) {
  req.db = db;
  next();
});

// Middleware to check unique member id and address:
// addressMiddleware.js

function checkAddress(req, res, next) {
  const { address } = req.body;
  if (address.includes('Fairfield')) {
    next();
  } else {
    res.status(400).json({ error: 'Address must include Fairfield' });
  }

}

// memberMiddleware.js
async function checkMemberID(req, res, next) {
  const { memberID } = req.body;

  const existingMember = await db.collection('libraryMembers').find({ memberID });
  if (existingMember) {
    res.status(400).json({ error: 'Member ID must be unique' });
  } else {
    next();
  }
}





// app.use('/users', usersRoute);

app.get('/', async (req, res) => {

  res.send("Hello")

})

// adding books

app.post('/books', async (req, res) => {

  try {

    const book = req.body;

    const result = await req.db.collection('books').insertOne(book);

    res.status(201).json(result);

  } catch (error) {

    res.status(400).json({ error: error.message });

  }

});

// // search book by everything:
// app.get('/books', async (req, res) => {
//   try {
//     const books = await req.db.collection('books').find().toArray();
//     res.status(200).json(books);
//   } catch (error) {
//     res.status(400).json({ error: error.message });
//   }
// });


// search a book by either of the following:
app.get('/books', async (req, res) => {
  try {
    const { author, title, bookID, isbn, subject, quantity, publisher } = req.query;
    const query = {};

    if (author) {
      query.author = { $regex: author, $options: 'i' };
    }

    if (title) {
      query.title = { $regex: title, $options: 'i' };
    }

    if (bookID) {
      query.bookID = { $eq: +bookID };
    }


    if (isbn) {
      query.isbn = isbn;
    }

    if (subject) {
      query.subject = { $regex: subject, $options: 'i' };
    }

    if (quantity) {
      query.quantity = { $gte: +quantity };
    }

    if (publisher) {
      query.publisher = { $eq: Object(publisher) };
    }

    console.log(query);
    const books = await req.db.collection('books').find(query).toArray();
    res.status(200).json(books);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Create a staffs collection

app.post('/staffs', async (req, res) => {

  try {

    const staff = req.body;

    const result = await req.db.collection('staffs').insertOne(staff);

    res.status(201).json(result);

  } catch (error) {

    res.status(400).json({ error: error.message });

  }

});


app.get('/members', async (req, res) => {
  try {
    const { author, title, bookID, isbn, subject, quantity, publisher } = req.query;
    const query = {};

    if (author) {
      query.author = { $regex: author, $options: 'i' };
    }

    if (title) {
      query.title = { $regex: title, $options: 'i' };
    }

    if (bookID) {
      query.bookID = { $eq: +bookID };
    }


    if (isbn) {
      query.isbn = isbn;
    }

    if (subject) {
      query.subject = { $regex: subject, $options: 'i' };
    }

    if (quantity) {
      query.quantity = { $gte: +quantity };
    }

    if (publisher) {
      query.publisher = { $eq: Object(publisher) };
    }

    console.log(query);
    const books = await req.db.collection('books').find(query).toArray();
    res.status(200).json(books);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Create a staffs collection

app.post('/staffs', async (req, res) => {

  try {

    const staff = req.body;

    const result = await req.db.collection('staffs').insertOne(staff);

    res.status(201).json(result);

  } catch (error) {

    res.status(400).json({ error: error.message });

  }

});


// Create a library member
app.post('/members', async (req, res) => {

  try {

    const member = req.body;
    if (member.city == 'Fairfield') {
      const result = await req.db.collection('members').insertOne(member);

      res.status(201).json(result);
    } else {
      throw Error("City must be Fairfield!")
    }

  } catch (error) {

    res.status(400).json({ error: error.message });

  }

});

// update library members info
app.put('/members', async (req, res) => {

  try {

    const updatedMember = req.body;

    const memberId = updatedMember._id; // Assuming the member ID is provided in the request body
    const result = await req.db.collection('members').updateOne({ _id: memberId }, { $set: updatedMember });

    if (result.modifiedCount === 1) {
      res.status(200).json({ message: 'Member information updated successfully' });
    } else {
      res.status(404).json({ error: 'Member not found' });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }

});




// delete memeber by id

app.delete('/members/:id', async (req, res) => {

  try {

    const id = +req.params.id;

    const result = await db.collection('members').deleteOne({ _id: id });

    if (result.deletedCount === 1) {

      res.status(200).json({ message: 'Member deleted successfully' });
    } else {
      res.status(404).json({ message: 'Member not found' });

    }

  } catch (error) {

    res.status(400).json({ error: error.message });

  }

});




// search by name or phone number library memebers

app.get('/members/:phone', async (req, res) => {

  try {

    const phone = req.params.phone;



    // Search for members matching the name or phone number

    const members = await req.db.collection('members').find({ phoneNumber: phone }).toArray();



    res.status(200).json(members);

  } catch (error) {

    res.status(400).json({ error: error.message });

  }

});




// app.get('/members/:name', async (req, res) => {

//   try {

//     console.log("1")

//     const nameI= req.params.name;



//     // Search for members matching the name or phone number

//     const members = await db.collection('libraryMembers').find({name: nameI}).toArray();

//     console.log("testname", members);

//     res.status(200).json(members);

//   } catch (error) {

//     res.status(400).json({ error: error.message });

//   }

// });

app.get('/booksout', async (req, res) => {
  try {
    const result = await req.db.collection('bookrental').aggregate([
      { $group: { _id: "$bookId", totalBooksOut: { $sum: 1 } } }
    ]).toArray(); // Convert the result to an array



    res.json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});






app.get('/overduebooks', async (req, res) => {
  try {
    const currentDate = new Date(); // Get the current date
    const result = await req.db.collection('bookrental').aggregate([
      {
        $project: {
          overdueDays: {
            $ceil: {
              $divide: [
                {
                  $subtract: [
                    currentDate,
                    { $toDate: "$checkoutDate" } // Convert checkoutDate to Date type
                  ]
                },
                86400000 // Number of milliseconds in a day
              ]
            }
          }
        }
      }
    ]).toArray();

    res.json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});


app.get('/borrowedbooksByMember', async (req, res) => {
  try {
    const result = await req.db.collection('books').aggregate([
      {
        $lookup: {
          from: 'bookrental',
          localField: 'bookID',
          foreignField: 'bookId',
          as: 'bookInfo'
        }
      },
      { $unwind: '$bookInfo' },
      {
        $group: {
          _id: '$bookInfo.memberId',
          borrowedBooks: { $addToSet: '$bookID' }
        }
      },
      {
        $project: {
          _id: 0,
          memberId: '$_id',
          borrowedBooks: 1
        }
      }
    ]).toArray();

    res.json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});



// app.get('/amounttopay', async (req, res) => {
//   try {
//     const currentDate = new Date(); // Get the current date
//     const result = await req.db.collection('members').aggregate([
//       {
//         $lookup: {
//           from: 'bookrental',
//           localField: '_id',
//           foreignField: 'memberId',
//           as: 'rental'
//         }
//       },
//       { $unwind: '$rental' },
      
//       {
//         $project: {
//           _id: 0,
//           memberId: '$_id',
//           borrowedBooks: 1,
//           overdueDays: +({
//             $ceil: {
//               $divide: [
//                 {
//                   $subtract: [
//                     currentDate,
//                     { $toDate: '$rental.checkoutDate' }
//                   ]
//                 },
//                 86400000 // Number of milliseconds in a day
//               ]
//             }
//           }),
//           amount: {
//             $multiply: ["$overdueDays",
              
//               '$memberTypeFee'
//             ]
//           }
//         }
//       }
//     ]).toArray();

//     res.json(result);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// });


app.get('/amounttopay', async (req, res) => {
  try {
    const currentDate = new Date(); // Get the current date
    const result = await req.db.collection('members').aggregate([
      {
        $lookup: {
          from: 'bookrental',
          localField: '_id',
          foreignField: 'memberId',
          as: 'rental'
        }
      },
      { $unwind: '$rental' },
      {
        $project: {
          _id: 0,
          memberId: '$_id',
          borrowedBooks: 1,
          overdueDays: {
            $ceil: {
              $divide: [
                {
                  $subtract: [
                    currentDate,
                    { $toDate: '$rental.checkoutDate' }
                  ]
                },
                86400000 // Number of milliseconds in a day
              ]
            }
          },
          amount: {
            $multiply: [
              {
            $ceil: {
              $divide: [
                {
                  $subtract: [
                    currentDate,
                    { $toDate: '$rental.checkoutDate' }
                  ]
                },
                86400000 // Number of milliseconds in a day
              ]
            }
          },
              "$memberTypeFee"
            ]
          }
        }
      }
    ]).toArray();

    res.json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Error handling middleware

app.use((error, req, res, next) => {

  if (error && error.message) {

    return res.status(error.status || 400).send(error.message);

  } else {

    return res.status(500).send("Something went Wrong!!!");

  }

});







// Default route handler

app.all("*", (req, res) => {

  res.status(501).send("API not Supported Here");

});




// Start the server

app.listen(3000, () => {

  console.log("Server listening @3000");

});