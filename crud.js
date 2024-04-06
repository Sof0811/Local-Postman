const express = require("express"),
  app = express(),
  port = 3300,
  cors = require("cors");

app.use(express.json());
app.use(
  cors({
    origin: "*", // Replace with your frontend URL
  })
);

app.listen(port, () => {
  console.log(`app listening http://localhost:${port}`);
});

const books = [
  { id: 1, title: "love", author: "franklin" },
  { id: 2, title: "hate story", author: "Leo" },
  { id: 3, title: "Good mind", author: "Karlin" },
];


//Read - Get
app.get("/booksdetails", (req, res) => {
  // res.status(200).send(books);
  res.send(books);
});


//get specfic details
app.get("/booksdetailsData/:id", (req, res) => {
  const { id } = req.params;
  const book = books.find((val) => val["id"] === parseInt(id));
  res.status(200).send(book);
});


//Create - post method
app.post("/postBookdetails", (req, res) => {
  const { id, title, author } = req.body;
  const book = {
    id,
    title,
    author,
  };
  books.push(book);
  res.status(200).send(books);
});

// Edit a book by ID
app.put("/booksdetailsEdit/:id", (req, res) => {
  console.log("booksdetailsEdit ====> ", req.body);
  const { id } = req.params;
  const index = books.findIndex((book) => book.id === parseInt(id));

  if (index !== -1) {
    books[index] = { id: parseInt(id), ...books[index], ...req.body };
    res.status(200).send(books);
  } else {
    res.status(202).send({ data: "Book not found." });
  }
});

// delete
app.delete("/deleteBook/:id", (req, res) => {
  console.log("requested params", req.params);
  const { id } = req.params;
  const index = books.findIndex((book) => book.id === parseInt(id));
  if (index !== -1) {
    books.splice(index, 1);
    res.status(200).send(books); //send("Book deleted successfully.");
  } else {
    res.status(202).send({ data: "Book not found." });
    // res.status(404).send("Book not found.");
  }
});


