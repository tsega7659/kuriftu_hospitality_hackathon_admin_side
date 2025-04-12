const express = require('express');
const cors = require('cors');
const path = require('path');
const app = express();

// CORS configuration
const corsOptions = {
  origin: '*', // Allow all origins for testing
  optionsSuccessStatus: 200
};

// Middleware
app.use(cors(corsOptions));
app.use(express.json());

// API Routes
// Health check endpoint
app.get('/api', (req, res) => {
  res.json({ status: 'ok', message: 'Kuriftu API is running' });
});

// Mock data
let users = [
  {
    id: 1,
    name: "John Doe",
    email: "john@example.com",
    phone: "+1234567890",
    membershipTier: "Explorer",
    loyaltyCoins: 100,
    status: "Active",
    joinDate: "2024-01-01"
  },
  {
    id: 2,
    name: "Jane Smith",
    email: "jane@example.com",
    phone: "+1987654321",
    membershipTier: "Adventurer",
    loyaltyCoins: 250,
    status: "Active",
    joinDate: "2024-02-15"
  }
];

// Routes
app.get('/api/users', (req, res) => {
  res.json(users);
});

app.get('/api/users/:id', (req, res) => {
  const user = users.find(u => u.id === parseInt(req.params.id));
  if (!user) return res.status(404).json({ error: 'User not found' });
  res.json(user);
});

app.post('/api/users', (req, res) => {
  const newUser = {
    id: users.length + 1,
    ...req.body,
    joinDate: new Date().toISOString().split('T')[0]
  };
  users.push(newUser);
  res.status(201).json(newUser);
});

app.put('/api/users/:id', (req, res) => {
  const index = users.findIndex(u => u.id === parseInt(req.params.id));
  if (index === -1) return res.status(404).json({ error: 'User not found' });
  
  users[index] = {
    ...users[index],
    ...req.body,
    id: users[index].id // Preserve the original ID
  };
  res.json(users[index]);
});

app.delete('/api/users/:id', (req, res) => {
  const index = users.findIndex(u => u.id === parseInt(req.params.id));
  if (index === -1) return res.status(404).json({ error: 'User not found' });
  
  const deletedUser = users.splice(index, 1)[0];
  res.json(deletedUser);
});

// Serve static files from the admin dashboard
// This needs to be after API routes but before the catch-all route
app.use(express.static(path.join(__dirname, 'public')));

// Serve the admin dashboard for any other route
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public/index.html'));
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
