const PDFDocument = require('pdfkit');
const fs = require('fs');
const path = require('path');

const notesDir = path.join(__dirname, '../frontend/public/notes');
if (!fs.existsSync(notesDir)) {
  fs.mkdirSync(notesDir, { recursive: true });
}

const doc = new PDFDocument({ margin: 50 });
doc.pipe(fs.createWriteStream(path.join(notesDir, 'system-design.pdf')));

// Custom styling functions
const title = (text) => doc.fontSize(28).fillColor('#7C3AED').text(text, { align: 'center' }).moveDown();
const header = (text) => doc.fontSize(20).fillColor('#4C1D95').text(text, { underline: true }).moveDown(0.5);
const subheader = (text) => doc.fontSize(16).fillColor('#1F2937').text(text).moveDown(0.3);
const body = (text) => doc.fontSize(12).fillColor('#4B5563').text(text, { align: 'justify' }).moveDown();
const code = (text) => {
  doc.rect(doc.x, doc.y, 500, doc.heightOfString(text) + 20).fill('#F3F4F6');
  doc.fillColor('#111827').fontSize(10).font('Courier').text(text, doc.x + 10, doc.y + 10).moveDown();
  doc.font('Helvetica');
};
const newPage = () => doc.addPage();

// PAGE 1: Cover and Introduction
title('System Design for SDE Roles');
doc.fontSize(16).fillColor('#4B5563').text('The Ultimate Guide to Designing Scalable Systems', { align: 'center' }).moveDown(3);

try {
  doc.image('C:\\Users\\HARSHAVARDHANA J M\\.gemini\\antigravity\\brain\\7db080da-e2fe-4281-9ffb-2b24501fd6cd\\system_architecture_overview_1777032910008.png', {
    fit: [500, 300],
    align: 'center',
    valign: 'center'
  }).moveDown(15);
} catch (e) {
  console.log("Image 1 not found or failed to load");
}

header('1. Introduction to System Design');
body('System Design is the process of defining the architecture, components, modules, interfaces, and data for a system to satisfy specified requirements. In software engineering interviews, it tests your ability to take a vague problem (e.g., "Design Twitter") and architect a scalable, robust, and efficient solution.');
body('It bridges the gap between knowing how to code a feature and knowing how to serve that feature to 100 million concurrent users without the server crashing.');

newPage();

// PAGE 2: Scaling (Vertical vs Horizontal)
header('2. Scalability Basics');
body('When a system receives more traffic than it can handle, it needs to scale. There are two primary ways to scale a system: Vertical Scaling (Scaling Up) and Horizontal Scaling (Scaling Out).');

subheader('Vertical Scaling:');
body('Adding more power (CPU, RAM) to your existing server. It is easy to implement but has a hard physical limit. You cannot add infinite RAM to a single machine, and it introduces a Single Point of Failure (SPOF).');

subheader('Horizontal Scaling:');
body('Adding more servers to your pool of resources. This is how massive systems like Google and Amazon scale. It requires more complex architecture, like Load Balancers, to distribute traffic evenly.');

subheader('Load Balancing:');
body('A Load Balancer acts as the "traffic cop" sitting in front of your servers and routing client requests across all servers capable of fulfilling those requests in a manner that maximizes speed and capacity utilization.');

code(`// A simple Nginx Load Balancer Configuration Example
http {
    upstream backend_servers {
        server 10.0.0.1;
        server 10.0.0.2;
        server 10.0.0.3;
    }

    server {
        listen 80;
        location / {
            proxy_pass http://backend_servers;
        }
    }
}`);

newPage();

// PAGE 3: The CAP Theorem
header('3. The CAP Theorem');
body('In theoretical computer science, the CAP theorem states that any distributed data store can only provide two of the following three guarantees simultaneously:');

try {
  doc.image('C:\\Users\\HARSHAVARDHANA J M\\.gemini\\antigravity\\brain\\7db080da-e2fe-4281-9ffb-2b24501fd6cd\\cap_theorem_1777032942152.png', {
    fit: [450, 250],
    align: 'center'
  }).moveDown(12);
} catch (e) {
  console.log("Image 2 not found");
}

subheader('1. Consistency (C):');
body('Every read receives the most recent write or an error. All nodes see the same data at the same time.');

subheader('2. Availability (A):');
body('Every request receives a (non-error) response, without the guarantee that it contains the most recent write.');

subheader('3. Partition Tolerance (P):');
body('The system continues to operate despite an arbitrary number of messages being dropped (or delayed) by the network between nodes.');

subheader('Interesting Fact:');
body('The CAP Theorem was introduced by computer scientist Eric Brewer in 2000 as "Brewer\'s Conjecture". It was formally proven by Nancy Lynch and Seth Gilbert in 2002. In the real world, network partitions (P) are unavoidable, so engineers usually have to trade-off between Consistency and Availability (CP vs AP).');

newPage();

// PAGE 4: Microservices & Caching
header('4. Microservices vs Monolith');
body('A Monolithic architecture is built as one large system and is usually one codebase. Microservices architecture structures an application as a collection of loosely coupled, independently deployable services.');

try {
  doc.image('C:\\Users\\HARSHAVARDHANA J M\\.gemini\\antigravity\\brain\\7db080da-e2fe-4281-9ffb-2b24501fd6cd\\microservices_monolith_1777032969063.png', {
    fit: [450, 250],
    align: 'center'
  }).moveDown(12);
} catch (e) {
  console.log("Image 3 not found");
}

subheader('Caching for Performance:');
body('A Cache is a short-term memory that has a limited amount of space, but is extremely fast. It contains the most recently accessed items. Systems like Redis or Memcached store data in RAM to prevent repeated expensive database queries.');

subheader('Caching Strategies:');
body('- Cache Aside: The application checks the cache first. If a miss occurs, it checks the DB and writes to the cache.\n- Write-Through: Data is written into the cache and the corresponding database simultaneously.\n- Write-Behind (Write-Back): Data is written to the cache alone, and writing to the DB is delayed until later.');

newPage();

// PAGE 5: Databases & Interview Blueprint
header('5. Databases & Interview Blueprint');
body('Choosing the right database is half the battle in System Design.');

subheader('SQL vs NoSQL:');
body('SQL (Relational): Best for structured data, strict schemas, and ACID compliance (e.g., Banking systems). Examples: PostgreSQL, MySQL.\nNoSQL (Non-Relational): Best for unstructured/semi-structured data, rapid development, and easy horizontal scaling (e.g., Social media feeds). Examples: MongoDB, Cassandra, DynamoDB.');

subheader('Database Sharding:');
body('Sharding is a method for distributing data across multiple machines. It is a type of database partitioning that separates very large databases into smaller, faster, more easily managed parts called data shards.');

subheader('The 5-Step System Design Interview Blueprint:');
body('1. Requirements Clarification: (5 mins) Ask questions to define exact scope. Understand Read vs Write heavy.\n2. Back-of-the-envelope Estimation: (5 mins) Estimate storage, bandwidth, and QPS (Queries Per Second).\n3. High-Level Design: (10 mins) Draw the core components (Client -> LB -> Servers -> DB).\n4. Deep Dive: (15 mins) Discuss specific components, trade-offs (e.g., choosing Cassandra over MySQL for high write throughput).\n5. Identify Bottlenecks: (5 mins) Discuss SPOFs, how to handle massive spikes, and resolving caching issues.');

doc.moveDown(3);
doc.fontSize(10).fillColor('#999999').text('End of System Design Notes. Generated for CareerMind AI Students.', { align: 'center' });

doc.end();

console.log('5-page System Design PDF Notes generated successfully!');
