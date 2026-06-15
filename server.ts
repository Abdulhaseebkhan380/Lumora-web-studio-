import express from 'express';
import path from 'path';
import fs from 'fs';
import { createServer as createViteServer } from 'vite';

// Define message interfaces
interface Message {
  id: string;
  type: 'contact' | 'audit';
  name: string;
  email: string;
  message: string;
  website?: string;
  date: string;
  status: 'new' | 'read';
}

const app = express();
const PORT = 3000;
const MESSAGES_FILE = path.join(process.cwd(), 'messages.json');

// Memory cache for messages
let messagesCache: Message[] = [];

// Load initial messages from file
try {
  if (fs.existsSync(MESSAGES_FILE)) {
    const rawData = fs.readFileSync(MESSAGES_FILE, 'utf-8');
    messagesCache = JSON.parse(rawData);
    console.log(`Loaded ${messagesCache.length} messages from storage.`);
  } else {
    // Write an empty array to initialize
    fs.writeFileSync(MESSAGES_FILE, JSON.stringify([]));
  }
} catch (error) {
  console.error('Failed to load messages:', error);
}

// Ensure the cache is updated in the file storage
function saveMessagesToDisk() {
  try {
    fs.writeFileSync(MESSAGES_FILE, JSON.stringify(messagesCache, null, 2));
  } catch (err) {
    console.error('Failed to write messages to file system:', err);
  }
}

// Middleware
app.use(express.json());

// API Routes
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', serverTime: new Date().toISOString() });
});

// SUBMIT Direct Contact Message
app.post('/api/contact', async (req, res) => {
  try {
    const { name, email, message } = req.body;
    
    if (!name || !email || !message) {
      return res.status(400).json({ success: false, error: 'Missing required parameters' });
    }

    const newMessage: Message = {
      id: 'msg-' + Date.now() + Math.random().toString(36).substr(2, 5),
      type: 'contact',
      name,
      email,
      message,
      date: new Date().toISOString(),
      status: 'new'
    };

    messagesCache.unshift(newMessage);
    saveMessagesToDisk();

    // Fire email forward to Google Inbox via FormSubmit
    try {
      await fetch('https://formsubmit.co/ajax/lumorawebstudio.services@gmail.com', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          name,
          email,
          message,
          _subject: `✉️ New Contact request from ${name} (Lumora Studio)`,
          _honey: '' // Anti-spam honey trap
        })
      });
      console.log(`Successfully forwarded message from ${name} to email endpoint.`);
    } catch (apiErr) {
      console.warn('Silent warning - Failed to dispatch API mail alert but saved locally:', apiErr);
    }

    res.json({ success: true, message: 'Message stored and email alert sent.' });
  } catch (error: any) {
    res.status(500).json({ success: false, error: error.message || 'Internal error' });
  }
});

// SUBMIT Audit Consultation
app.post('/api/audit', async (req, res) => {
  try {
    const { name, email, website, message } = req.body;
    
    if (!name || !email) {
      return res.status(400).json({ success: false, error: 'Name and Email are required' });
    }

    const newAudit: Message = {
      id: 'aud-' + Date.now() + Math.random().toString(36).substr(2, 5),
      type: 'audit',
      name,
      email,
      website: website || undefined,
      message: message || '',
      date: new Date().toISOString(),
      status: 'new'
    };

    messagesCache.unshift(newAudit);
    saveMessagesToDisk();

    // Fire email forward to Google Inbox via FormSubmit
    try {
      await fetch('https://formsubmit.co/ajax/lumorawebstudio.services@gmail.com', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          name,
          email,
          website: website || 'None provided',
          vision_description: message || 'None provided',
          _subject: `🌟 New Consultation brief from ${name} (Lumora Studio)`,
          _honey: ''
        })
      });
      console.log(`Successfully forwarded audit brief from ${name} to email endpoint.`);
    } catch (apiErr) {
      console.warn('Silent warning - Failed to dispatch API brief alert:', apiErr);
    }

    res.json({ success: true, message: 'Consultation request saved and email alert sent.' });
  } catch (error: any) {
    res.status(500).json({ success: false, error: error.message || 'Internal error' });
  }
});

// GET Admin Dashboard messages - Securing the routes with real password check
const CONFIG_FILE = path.join(process.cwd(), 'admin_config.json');

// Memory cache for dynamic config (including password)
let currentAdminPassword = process.env.ADMIN_PASSWORD || 'haseeb$#@';

try {
  if (fs.existsSync(CONFIG_FILE)) {
    const rawConfig = fs.readFileSync(CONFIG_FILE, 'utf-8');
    const parsedConfig = JSON.parse(rawConfig);
    if (parsedConfig && parsedConfig.adminPassword) {
      currentAdminPassword = parsedConfig.adminPassword;
      console.log('Loaded custom admin password from configuration file.');
    }
  } else {
    fs.writeFileSync(CONFIG_FILE, JSON.stringify({ adminPassword: currentAdminPassword }, null, 2));
  }
} catch (error) {
  console.error('Failed to load admin config:', error);
}

function saveAdminPassword(newPassword: string) {
  try {
    currentAdminPassword = newPassword;
    fs.writeFileSync(CONFIG_FILE, JSON.stringify({ adminPassword: newPassword }, null, 2));
    return true;
  } catch (error) {
    console.error('Failed to save dynamic admin password:', error);
    return false;
  }
}

// Helper middleware for securing routes
const authenticateAdmin = (req: express.Request, res: express.Response, next: express.NextFunction) => {
  const authHeader = req.headers.authorization;
  const providedPass = authHeader ? authHeader.replace(/^Bearer\s+/, '') : '';
  
  if (providedPass === currentAdminPassword) {
    next();
  } else {
    res.status(401).json({ success: false, error: 'Unauthorized security clearance required.' });
  }
};

// POST login/verify to securely test passwords server-side
app.post('/api/admin/login', (req, res) => {
  const { password } = req.body;
  if (password === currentAdminPassword) {
    return res.json({ success: true, token: currentAdminPassword });
  }
  return res.status(401).json({ success: false, error: 'Invalid security code' });
});

// POST change/update security password
app.post('/api/admin/change-password', authenticateAdmin, (req, res) => {
  const { newPassword } = req.body;
  if (!newPassword || newPassword.trim().length === 0) {
    return res.status(400).json({ success: false, error: 'New password cannot be empty.' });
  }
  
  const saved = saveAdminPassword(newPassword.trim());
  if (saved) {
    res.json({ success: true, token: newPassword.trim(), message: 'Security password changed successfully.' });
  } else {
    res.status(500).json({ success: false, error: 'Failed to write updated credentials to disk.' });
  }
});

app.get('/api/admin/messages', authenticateAdmin, (req, res) => {
  res.json({ success: true, messages: messagesCache });
});

// POST mark as read
app.post('/api/admin/read', authenticateAdmin, (req, res) => {
  const { id } = req.body;
  if (!id) return res.status(400).json({ success: false, error: 'Id required' });
  
  messagesCache = messagesCache.map(msg => msg.id === id ? { ...msg, status: 'read' as const } : msg);
  saveMessagesToDisk();
  res.json({ success: true });
});

// POST reset/clear system logs
app.post('/api/admin/clear', authenticateAdmin, (req, res) => {
  messagesCache = [];
  saveMessagesToDisk();
  res.json({ success: true, message: 'All record systems cleared.' });
});

// Initialize server-side routing
async function startServer() {
  // Vite integration
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server executing live link on: http://0.0.0.0:${PORT}`);
  });
}

startServer();
