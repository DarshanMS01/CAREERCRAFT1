const PDFDocument = require('pdfkit');
const fs = require('fs');
const path = require('path');

const notesDir = path.join(__dirname, '../frontend/public/notes');
if (!fs.existsSync(notesDir)) {
  fs.mkdirSync(notesDir, { recursive: true });
}

const doc = new PDFDocument({ margin: 50 });
doc.pipe(fs.createWriteStream(path.join(notesDir, 'dsa-guide.pdf')));

// Custom styling functions
const title = (text) => doc.fontSize(28).fillColor('#2563EB').text(text, { align: 'center' }).moveDown();
const header = (text) => doc.fontSize(20).fillColor('#1E3A8A').text(text, { underline: true }).moveDown(0.5);
const subheader = (text) => doc.fontSize(16).fillColor('#1F2937').text(text).moveDown(0.3);
const body = (text) => doc.fontSize(12).fillColor('#4B5563').text(text, { align: 'justify' }).moveDown();
const code = (text) => {
  doc.rect(doc.x, doc.y, 500, doc.heightOfString(text) + 20).fill('#F3F4F6');
  doc.fillColor('#111827').fontSize(10).font('Courier').text(text, doc.x + 10, doc.y + 10).moveDown();
  doc.font('Helvetica');
};
const newPage = () => doc.addPage();

// PAGE 1: Cover and Introduction
title('DSA Mastery for Interviews');
doc.fontSize(16).fillColor('#4B5563').text('The Ultimate Data Structures & Algorithms Guide', { align: 'center' }).moveDown(3);

try {
  doc.image('C:\\Users\\HARSHAVARDHANA J M\\.gemini\\antigravity\\brain\\7db080da-e2fe-4281-9ffb-2b24501fd6cd\\dsa_overview_1777032472247.png', {
    fit: [500, 300],
    align: 'center',
    valign: 'center'
  }).moveDown(15);
} catch (e) {
  console.log("Image 1 not found or failed to load");
}

header('1. Why Learn DSA?');
body('Data Structures and Algorithms (DSA) are the foundation of computer science. They teach you how to write efficient, optimized code and solve complex problems logically. Mastering DSA is the golden ticket to cracking interviews at top product-based companies like FAANG (Facebook, Amazon, Apple, Netflix, Google).');
body('While frameworks like React or Node.js come and go, the core principles of algorithmic thinking never age.');

newPage();

// PAGE 2: Array & Linked Lists
header('2. Arrays & Linked Lists');
body('An Array is a contiguous block of memory. It provides O(1) time complexity for accessing elements by index but O(n) for insertion and deletion (since elements must be shifted).');
body('A Linked List consists of nodes where each node points to the next. It allows O(1) insertions at the head but O(n) for random access.');

subheader('Interesting Fact:');
body('The first linked list was developed in 1955-1956 by Allen Newell, Cliff Shaw, and Herbert A. Simon at RAND Corporation as the primary data structure for their Information Processing Language.');

subheader('Common Patterns:');
body('- Two Pointers: Fast and Slow pointers (Hare & Tortoise algorithm) to find cycles.\n- Sliding Window: Used to find subarrays or substrings.\n- Dummy Node: Useful in linked list manipulations to avoid edge cases at the head.');

code(`// Reversing a Linked List (Iterative)
function reverseList(head) {
  let prev = null;
  let curr = head;
  while (curr !== null) {
    let nextTemp = curr.next;
    curr.next = prev;
    prev = curr;
    curr = nextTemp;
  }
  return prev;
}`);

newPage();

// PAGE 3: Trees & Graphs
header('3. Trees & Graphs');
body('Trees are hierarchical data structures. A Binary Tree restricts each node to a maximum of two children. A Binary Search Tree (BST) goes further: the left child is smaller, and the right child is larger than the parent.');
body('Graphs represent networks consisting of vertices (nodes) and edges (connections). They can be directed or undirected, weighted or unweighted.');

try {
  doc.image('C:\\Users\\HARSHAVARDHANA J M\\.gemini\\antigravity\\brain\\7db080da-e2fe-4281-9ffb-2b24501fd6cd\\dsa_sorting_1777032506769.png', {
    fit: [450, 250],
    align: 'center'
  }).moveDown(12);
} catch (e) {
  console.log("Image 2 not found");
}

subheader('Tree Traversals:');
body('- Inorder (Left, Root, Right): Gives sorted output in a BST.\n- Preorder (Root, Left, Right): Used to create a copy of the tree.\n- Postorder (Left, Right, Root): Used to delete the tree.');

subheader('Graph Traversal Algorithms:');
body('- BFS (Breadth-First Search): Explores level by level using a Queue. Best for finding the shortest path in unweighted graphs.\n- DFS (Depth-First Search): Explores as deep as possible using a Stack/Recursion. Best for detecting cycles.');

newPage();

// PAGE 4: Sorting & Dynamic Programming
header('4. Sorting & Dynamic Programming');
body('Sorting algorithms arrange data in a specific order. Understanding sorting is crucial because it significantly optimizes search operations (e.g., Binary Search requires a sorted array).');

subheader('Dynamic Programming (DP):');
body('DP is a method for solving complex problems by breaking them down into simpler subproblems. It solves each subproblem just once and stores the result (Memoization/Tabulation), avoiding redundant calculations.');

subheader('Interesting Fact:');
body('Richard Bellman invented Dynamic Programming in the 1950s. He chose the word "Dynamic" because it sounded impressive to his superiors and couldn\'t be easily associated with mathematical research, which they frowned upon at the time!');

code(`// Binary Search (O(log n))
function binarySearch(arr, target) {
  let left = 0, right = arr.length - 1;
  while (left <= right) {
    let mid = Math.floor((left + right) / 2);
    if (arr[mid] === target) return mid;
    if (arr[mid] < target) left = mid + 1;
    else right = mid - 1;
  }
  return -1;
}`);

newPage();

// PAGE 5: Time Complexity & Interview Prep
header('5. Time Complexity (Big-O) & Prep Tips');
body('Big-O notation is used to describe the performance or complexity of an algorithm relative to the input size (n). It determines the worst-case scenario.');

try {
  doc.image('C:\\Users\\HARSHAVARDHANA J M\\.gemini\\antigravity\\brain\\7db080da-e2fe-4281-9ffb-2b24501fd6cd\\big_o_complexity_1777032535009.png', {
    fit: [450, 250],
    align: 'center'
  }).moveDown(12);
} catch (e) {
  console.log("Image 3 not found");
}

subheader('Complexity Cheat Sheet:');
body('- O(1) Constant: Array index lookup, Hash Map lookup.\n- O(log n) Logarithmic: Binary Search, traversing a balanced BST.\n- O(n) Linear: Looping through an array.\n- O(n log n) Linearithmic: Merge Sort, Quick Sort (avg case).\n- O(n^2) Quadratic: Nested loops, Bubble Sort.\n- O(2^n) Exponential: Recursive Fibonacci without memoization.');

subheader('Interview Golden Rules:');
body('1. Clarify the Problem: Always ask constraints and edge cases before coding.\n2. Think Out Loud: The interviewer cares about your thought process, not just the final code.\n3. Start Brute Force: Write a naive O(n^2) solution first, then optimize it to O(n) or O(log n).\n4. Dry Run: Walk through your code with an example input to catch bugs.');

doc.moveDown(3);
doc.fontSize(10).fillColor('#999999').text('End of DSA Notes. Generated for CareerMind AI Students.', { align: 'center' });

doc.end();

console.log('5-page DSA PDF Notes generated successfully!');
