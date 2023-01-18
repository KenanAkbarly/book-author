const express = require("express");
const { uuid } = require("uuidv4");
const app = express()

const PORT = 8080;
app.use(express.json());

const books = [
  {
    id: uuid(),
    name: "game",
    category: "dram",
    pageCount: 500,
    price: 10,
    discountPercent: 34,
    author: {
      name: "Subhan",
      surname: "Nagiyev",
    },
  },
  {
    id: uuid(),
    name: "salam",
    category: "dram",
    pageCount: 700,
    price: 30,
    discountPercent: 34,
    author: {
      name: "Pehman",
      surname: "Huseinzade",
    },
  },
  {
    id: uuid(),
    name: "1984",
    category: "dram",
    pageCount: 343,
    price: 4,
    discountPercent: 34,
    author: {
      name: "Kenan",
      surname: "Akbarly",
    },
  },
];

const authors = [
  {
    id:987,
    name: "Kenan",
    surname: "Akbarly",
    books: [
      {
        id: uuid(),
        name: "jsjsjj",
      },
    ],
  },
];

app.get("/books", (req, res) => {
  res.send(books);
});

app.get("/authors", (req, res) => {
  res.send(authors);
});

app.get("/api/books/:id", (req, res) => {
  const { id } = req.params;

  const target = books.find((item) => item.id == id);
  if (!target) return res.status(204).send();
  res.send({ message: " success!", target });
});

app.post("/books", (req, res) => {
  const { name, category, pageCount, price, discountPercent, authorId } =
    req.body;
  if (
    !name &&
    !category &&
    !pageCount  &&
    !price &&
    !discountPercent &&
    !authorId
  ) return res.status(204).send();

  let tragetAut = authors.find((item) => item.id == authorId)

  let newBook={
    id:uuid(),
    name:name,
    category: category,
    pageCount: pageCount,
    price: price,
    discountPercent: discountPercent,
    author: {
      name: tragetAut.name,
      surname: tragetAut.surname,
    },
  }
  res.send({message:"successfully added!",newBook})
  books.push(newBook)
});
app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});
