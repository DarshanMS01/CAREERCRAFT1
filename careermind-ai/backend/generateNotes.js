const PDFDocument = require('pdfkit');
const fs = require('fs');
const path = require('path');

const notesDir = path.join(__dirname, '../frontend/public/notes');
if (!fs.existsSync(notesDir)) {
  fs.mkdirSync(notesDir, { recursive: true });
}

const doc = new PDFDocument({ margin: 50 });
doc.pipe(fs.createWriteStream(path.join(notesDir, 'mern-stack.pdf')));

// Custom styling functions
const title = (text) => doc.fontSize(28).fillColor('#16A34A').text(text, { align: 'center' }).moveDown();
const header = (text) => doc.fontSize(20).fillColor('#14532D').text(text, { underline: true }).moveDown(0.5);
const subheader = (text) => doc.fontSize(16).fillColor('#1F2937').text(text).moveDown(0.3);
const body = (text) => doc.fontSize(12).fillColor('#4B5563').text(text, { align: 'justify' }).moveDown();
const code = (text) => {
  doc.rect(doc.x, doc.y, 500, doc.heightOfString(text) + 20).fill('#F3F4F6');
  doc.fillColor('#111827').fontSize(10).font('Courier').text(text, doc.x + 10, doc.y + 10).moveDown();
  doc.font('Helvetica');
};
const newPage = () => doc.addPage();

// PAGE 1: Cover and Introduction
title('Full Stack Web Development');
doc.fontSize(16).fillColor('#4B5563').text('The Ultimate MERN Stack Guide', { align: 'center' }).moveDown(3);

try {
  doc.image('C:\\Users\\HARSHAVARDHANA J M\\.gemini\\antigravity\\brain\\7db080da-e2fe-4281-9ffb-2b24501fd6cd\\mern_stack_architecture_1777031079028.png', {
    fit: [500, 300],
    align: 'center',
    valign: 'center'
  }).moveDown(15);
} catch (e) {
  console.log("Image 1 not found or failed to load");
}

header('1. What is the MERN Stack?');
body('MERN stands for MongoDB, Express, React, Node, after the four key technologies that make up the stack. It is designed to make the development process smoother and easier. Each of these 4 powerful technologies provides an end-to-end framework for the developers to work in and each of these technologies play a big part in the development of web applications.');
body('The most impressive part of the MERN stack is that the entire architecture is written in JavaScript. From the client-side UI to the server-side logic and database queries, you only need to master one programming language.');

newPage();

// PAGE 2: React (Frontend)
header('2. React.js: The Frontend');
body('React is a declarative, efficient, and flexible JavaScript library for building user interfaces. It lets you compose complex UIs from small and isolated pieces of code called "components".');

subheader('Interesting Fact:');
body('React was originally created by Jordan Walke, a software engineer at Facebook, and deployed on Facebook\'s newsfeed in 2011. It introduced the concept of the Virtual DOM, which revolutionized how web apps render efficiently.');

try {
  doc.image('C:\\Users\\HARSHAVARDHANA J M\\.gemini\\antigravity\\brain\\7db080da-e2fe-4281-9ffb-2b24501fd6cd\\react_components_diagram_1777031103053.png', {
    fit: [450, 250],
    align: 'center'
  }).moveDown(12);
} catch (e) {
  console.log("Image 2 not found");
}

subheader('Core Concepts:');
body('- Components: The building blocks of React applications.\n- State: An object that determines how a component renders & behaves.\n- Props: Short for properties, they are read-only components that must be kept pure.\n- Hooks: Functions that let you "hook into" React state and lifecycle features from function components (e.g., useState, useEffect).');

code(`function Welcome(props) {
  const [count, setCount] = useState(0);
  return (
    <div>
      <h1>Hello, {props.name}</h1>
      <button onClick={() => setCount(count + 1)}>
        Clicked {count} times
      </button>
    </div>
  );
}`);

newPage();

// PAGE 3: Node & Express (Backend)
header('3. Node.js & Express.js: The Backend');
body('Node.js is an open-source, cross-platform JavaScript runtime environment that executes JavaScript code outside a web browser. Express is a minimal and flexible Node.js web application framework that provides a robust set of features for web and mobile applications.');

subheader('Interesting Fact:');
body('Before Node.js, JavaScript was strictly a client-side language. Ryan Dahl created Node.js in 2009 by embedding Google\'s V8 JavaScript engine inside a C++ program. This allowed JS to access the file system and network, birthing the era of Full-Stack JavaScript.');

subheader('Building APIs with Express:');
body('Express makes it incredibly easy to set up RESTful APIs. It handles routing, middleware, and request/response parsing with minimal overhead.');

code(`const express = require('express');
const app = express();
app.use(express.json());

app.get('/api/users', (req, res) => {
  res.json({ message: "List of users" });
});

app.post('/api/users', (req, res) => {
  const newUser = req.body;
  res.status(201).json(newUser);
});

app.listen(5000, () => console.log('Server running!'));`);

newPage();

// PAGE 4: MongoDB (Database)
header('4. MongoDB: The Database');
body('MongoDB is a source-available cross-platform document-oriented database program. Classified as a NoSQL database program, MongoDB uses JSON-like documents with optional schemas.');

try {
  doc.image('C:\\Users\\HARSHAVARDHANA J M\\.gemini\\antigravity\\brain\\7db080da-e2fe-4281-9ffb-2b24501fd6cd\\mongodb_document_structure_1777031131553.png', {
    fit: [450, 250],
    align: 'center'
  }).moveDown(12);
} catch (e) {
  console.log("Image 3 not found");
}

subheader('Why MongoDB for MERN?');
body('Since MongoDB stores data in BSON (Binary JSON), it perfectly matches the JavaScript ecosystem. When an Express server receives JSON data from a React frontend, it can insert that data directly into MongoDB without complex object-relational mapping (ORM) translations.');

subheader('Mongoose (ODM):');
body('While you can use the native MongoDB driver, most developers use Mongoose. Mongoose provides a straight-forward, schema-based solution to model your application data.');

code(`const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, unique: true },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('User', UserSchema);`);

newPage();

// PAGE 5: Interview Prep & Architecture
header('5. Connecting the Dots (Interview Prep)');
body('In technical interviews, simply knowing the syntax isn\'t enough. You must understand how data flows through the stack and how to handle security, performance, and state.');

subheader('The Request Lifecycle:');
body('1. React (Client) makes an Axios POST request to the Express API with JSON data.\n2. Express receives the request, runs it through Middleware (like CORS and BodyParser).\n3. Express verifies the JWT token for authentication.\n4. The Express Controller uses Mongoose to query MongoDB.\n5. MongoDB returns the Document.\n6. Express sends a JSON response back to React.\n7. React updates its State, triggering a re-render of the Virtual DOM.\n8. The user sees the updated UI.');

subheader('Crucial Interview Questions:');
body('Q: What is the difference between SQL and NoSQL?\nA: SQL databases are relational and table-based with strict schemas. NoSQL databases (like Mongo) are document-based, key-value pairs, or graph databases with flexible schemas.');
doc.moveDown();
body('Q: How does Node.js handle concurrency if it is single-threaded?\nA: Node.js uses an Event Loop and non-blocking I/O operations. When it performs an I/O operation (like reading the DB), it offloads it to the system kernel and continues processing other requests.');
doc.moveDown();
body('Q: Explain React Hooks.\nA: Hooks allow functional components to have state and lifecycle methods. Previously, only Class components could do this. useEffect handles side-effects, and useState manages component memory.');

doc.moveDown(3);
doc.fontSize(10).fillColor('#999999').text('End of Notes. Generated for CareerMind AI Students.', { align: 'center' });

doc.end();

console.log('5-page PDF Notes generated successfully!');
