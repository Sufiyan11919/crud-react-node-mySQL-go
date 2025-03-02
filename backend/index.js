import express from "express";
import mysql2 from "mysql2";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config(); // Load environment variables

const app = express();

// Database connection using environment variables
const db = mysql2.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    port: process.env.DB_PORT || 3306
});

// Connect to the database
db.connect((err) => {
    if (err) {
        console.error("Database connection failed:", err.stack);
        return;
    }
    console.log("Connected to the MySQL database.");
});


// Ensure the books table exists
const createBooksTable = `
CREATE TABLE IF NOT EXISTS books (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    price DECIMAL(10,2),
    cover VARCHAR(255)
)`;

db.query(createBooksTable, (err, result) => {
    if (err) {
        console.error("Failed to create table:", err);
    } else {
        console.log("Books table is ready.");
    }
});

// Middleware
app.use(express.json());

// Allow frontend requests from the correct origin
const allowedOrigins = ['http://www.sufiyancreates.live'];
app.use(cors({
  origin: allowedOrigins,
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true
}));
// Routes
app.get("/", (req, res) => {
    res.json("Hello World from the backend!!!");
});

app.get("/books", (req, res) => {
    const query = "SELECT * FROM books";
    db.query(query, (err, data) => {
        if (err) return res.status(500).json({ error: err.message });
        return res.json(data);
    });
});

app.post("/books", (req, res) => {
    const query = "INSERT INTO books (`title`, `description`, `price`, `cover`) VALUES (?)";
    const values = [
        req.body.title,
        req.body.description,
        req.body.price,
        req.body.cover
    ];

    db.query(query, [values], (err, data) => {
        if (err) return res.status(500).json({ error: err.message });
        return res.json({ message: "Book has been created successfully!" });
    });
});

app.delete("/books/:id", (req, res) => {
    const bookID = req.params.id;
    const query = "DELETE FROM books WHERE id = ?";

    db.query(query, [bookID], (err, data) => {
        if (err) return res.status(500).json({ error: err.message });
        return res.json({ message: "Book has been deleted successfully!" });
    });
});

app.put("/books/:id", (req, res) => {
    const bookID = req.params.id;
    const query = "UPDATE books SET `title`= ?, `description`= ?, `price`= ?, `cover`= ? WHERE id = ?";

    const values = [
        req.body.title,
        req.body.description,
        req.body.price,
        req.body.cover
    ];

    db.query(query, [...values, bookID], (err, data) => {
        if (err) return res.status(500).json({ error: err.message });
        return res.json({ message: "Book has been updated successfully!" });
    });
});


const PORT = process.env.PORT || 8800;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});