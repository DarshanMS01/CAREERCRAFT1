const fs = require('fs');
const path = require('path');

const companyNames = [
  "Google", "Amazon", "Microsoft", "Meta", "Apple", "Netflix", 
  "Oracle", "IBM", "Cisco", "VMware", "Salesforce", "Adobe", "SAP", "Intuit", "ServiceNow", "Workday", "Nutanix", "Splunk", "Snowflake", "Palantir", "Databricks", "Atlassian",
  "Uber", "Lyft", "Airbnb", "DoorDash", "Instacart", "Shopify", "eBay", "Flipkart", "Swiggy", "Zomato", "Booking.com", "Expedia",
  "Stripe", "PayPal", "Block", "Robinhood", "Plaid", "Coinbase", "JPMorgan", "Goldman Sachs", "Morgan Stanley", "Bloomberg", "Visa", "Mastercard", "Razorpay", "Paytm", "Cred", "PhonePe",
  "Intel", "AMD", "Nvidia", "Qualcomm", "Broadcom", "Texas Instruments", "Samsung", "TSMC", "ARM",
  "TCS", "Infosys", "Wipro", "HCLTech", "Cognizant", "Tech Mahindra", "Capgemini", "Accenture", "Deloitte", "PwC", "EY", "KPMG",
  "Epic Games", "EA", "Sony", "Spotify", "ByteDance", "Snap", "Pinterest", "Reddit",
  "Canva", "Notion", "Figma", "OpenAI", "Anthropic", "Tesla"
];

const getIndustry = (name) => {
  if (["Google", "Amazon", "Microsoft", "Meta", "Apple", "Netflix", "Spotify", "ByteDance", "Snap", "Pinterest", "Reddit"].includes(name)) return "bigtech";
  if (["Stripe", "PayPal", "Block", "Robinhood", "Plaid", "Coinbase", "JPMorgan", "Goldman Sachs", "Morgan Stanley", "Bloomberg", "Visa", "Mastercard", "Razorpay", "Paytm", "Cred", "PhonePe"].includes(name)) return "finance";
  if (["TCS", "Infosys", "Wipro", "HCLTech", "Cognizant", "Tech Mahindra", "Capgemini", "Accenture", "Deloitte", "PwC", "EY", "KPMG"].includes(name)) return "service";
  if (["Intel", "AMD", "Nvidia", "Qualcomm", "Broadcom", "Texas Instruments", "Samsung", "TSMC", "ARM", "Tesla"].includes(name)) return "hardware";
  return "enterprise";
};

const data = {};

for (const name of companyNames) {
  const ind = getIndustry(name);
  let info, q1, q2, q3;
  
  if (ind === "bigtech") {
    info = `${name} focuses on extreme scalability, distributed systems, and cutting-edge user experiences. Interviews heavily emphasize complex Data Structures, Algorithms, and System Design.`;
    q1 = { q: `Design ${name}'s core system architecture.`, type: "System Design", level: "Hard" };
    q2 = { q: "Find the median of two sorted arrays.", type: "DSA", level: "Hard" };
    q3 = { q: "Tell me about a time you made a technical tradeoff.", type: "Behavioral", level: "Medium" };
  } else if (ind === "finance") {
    info = `${name} operates in the financial/fintech sector. They look for extreme attention to detail, transactional consistency (ACID), security best practices, and low-latency systems.`;
    q1 = { q: "Design a secure payment gateway/ledger.", type: "System Design", level: "Hard" };
    q2 = { q: "How do you handle idempotency in API requests?", type: "Backend", level: "Medium" };
    q3 = { q: "Explain the two-phase commit protocol.", type: "Databases", level: "Hard" };
  } else if (ind === "service") {
    info = `${name} is a global consulting/services firm. Their interviews test strong fundamentals in OOPs, DBMS, Networking, core programming logic, and client communication.`;
    q1 = { q: "What is the difference between TRUNCATE and DELETE?", type: "DBMS", level: "Easy" };
    q2 = { q: "Explain the concepts of Inheritance and Polymorphism.", type: "OOPs", level: "Easy" };
    q3 = { q: "How do you handle scope creep from a client?", type: "Behavioral", level: "Easy" };
  } else if (ind === "hardware") {
    info = `${name} focuses on hardware-software interfaces, computer architecture, digital logic, and low-level programming (C/C++/Assembly).`;
    q1 = { q: "Explain pipelining and branch prediction.", type: "Architecture", level: "Hard" };
    q2 = { q: "What is a cache miss and how do you optimize for it?", type: "OS", level: "Medium" };
    q3 = { q: "Write a C program using pointers to manipulate memory.", type: "C", level: "Medium" };
  } else {
    info = `${name} builds large-scale enterprise software and platforms. Interviews focus on RESTful APIs, cloud architecture, microservices, and database optimization.`;
    q1 = { q: "Design a Rate Limiter.", type: "System Design", level: "Medium" };
    q2 = { q: "Implement an LRU Cache.", type: "DSA", level: "Medium" };
    q3 = { q: "How do you resolve conflicts in a cross-functional team?", type: "Behavioral", level: "Medium" };
  }

  data[name] = {
    info,
    formLink: "https://docs.google.com/forms/d/e/1FAIpQLSfLEIXTBoTyCaCedxCTl1ndUo9VkxQLceUnRn6bx57Jh3GAtQ/viewform?usp=publish-editor",
    questions: [q1, q2, q3]
  };
}

const fileContent = `export const companyData = ${JSON.stringify(data, null, 2)};`;

const dir = path.join(__dirname, '../frontend/src/data');
if (!fs.existsSync(dir)){
    fs.mkdirSync(dir, { recursive: true });
}

fs.writeFileSync(path.join(dir, 'companyData.js'), fileContent);
console.log("Successfully generated companyData.js with " + companyNames.length + " companies.");
