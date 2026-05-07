const express = require('express');
const cors = require('cors');
const fs = require('fs-extra');
const path = require('path');

const app = express();

app.use(cors({
  origin: [
    'https://automations.knavcpa.com',
    'https://us-api.knavcpa.com',
    'http://localhost:5173',
    'http://localhost:3000'
  ]
}));
app.use(express.json());

const TOOLS_FILE = path.join(__dirname, 'tools.json');

if (!fs.existsSync(TOOLS_FILE)) fs.writeJsonSync(TOOLS_FILE, []);

// Health check
app.get('/health', (_req, res) => {
  res.json({ status: 'ok', service: 'knav-toolmgmt2-api', timestamp: new Date().toISOString() });
});

// GET all tools
app.get('/api/tools', async (_req, res) => {
  const data = await fs.readJson(TOOLS_FILE);
  res.json(data);
});

// CREATE tool
app.post('/api/tools', async (req, res) => {
  const tools = await fs.readJson(TOOLS_FILE);
  const tool = { ...req.body, id: Date.now(), createdAt: new Date().toISOString() };
  tools.push(tool);
  await fs.writeJson(TOOLS_FILE, tools, { spaces: 2 });
  res.json({ success: true, tool });
});

// UPDATE tool
app.put('/api/tools/:id', async (req, res) => {
  let tools = await fs.readJson(TOOLS_FILE);
  const id = parseInt(req.params.id);
  tools = tools.map((t) => (t.id === id ? { ...t, ...req.body } : t));
  await fs.writeJson(TOOLS_FILE, tools, { spaces: 2 });
  res.json({ success: true });
});

// DELETE tool
app.delete('/api/tools/:id', async (req, res) => {
  let tools = await fs.readJson(TOOLS_FILE);
  const id = parseInt(req.params.id);
  tools = tools.filter((t) => t.id !== id);
  await fs.writeJson(TOOLS_FILE, tools, { spaces: 2 });
  res.json({ success: true });
});

// Dashboard stats
app.get('/api/dashboard-stats', async (_req, res) => {
  const tools = await fs.readJson(TOOLS_FILE);
  res.json({
    total: tools.length,
    completed: tools.filter((t) => t.step >= 11).length,
    inProgress: tools.filter((t) => t.step > 0 && t.step < 11).length,
    notStarted: tools.filter((t) => t.step === 0).length,
  });
});

// User role
app.get('/api/user-role', async (req, res) => {
  const email = (req.query.email || '').toLowerCase();
  let role = 'User';
  if (email.includes('partner')) role = 'Partner';
  else if (email.includes('it')) role = 'IT';
  else if (email.includes('dt')) role = 'DT';
  else if (email.includes('qc')) role = 'QC';
  res.json({ role });
});

const PORT = process.env.PORT || 3004;
app.listen(PORT, () => {
  console.log(`Tool Management server running on port ${PORT}`);
});
