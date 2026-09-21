import express from 'express';
import path from 'path';
import { createServer as createViteServer } from 'vite';
import { initialFarmerProfile, initialRecords } from './src/data/sampleRecords';
import { quizQuestions } from './src/data/quizQuestions';
import { FarmerRecord } from './src/types';

// In-memory persistent demo store
let demoRecords: FarmerRecord[] = [...initialRecords];
let demoProfile = { ...initialFarmerProfile };

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // ==========================================
  // REST API ENDPOINTS
  // ==========================================

  // Health Check
  app.get('/api/health', (req, res) => {
    res.json({ status: 'ok', time: new Date().toISOString(), portal: 'Farmer Digital Records' });
  });

  // Farmer Profile
  app.get('/api/profile', (req, res) => {
    res.json(demoProfile);
  });

  app.put('/api/profile', (req, res) => {
    demoProfile = { ...demoProfile, ...req.body };
    res.json(demoProfile);
  });

  // Get Records (supports search, category, type filter)
  app.get('/api/records', (req, res) => {
    const { category, search, type } = req.query;
    let result = [...demoRecords];

    if (category && category !== 'All') {
      result = result.filter(r => r.category === category);
    }

    if (type && type !== 'All') {
      result = result.filter(r => r.fileType === type);
    }

    if (search && typeof search === 'string') {
      const q = search.toLowerCase().trim();
      result = result.filter(r => 
        r.name.toLowerCase().includes(q) ||
        r.category.toLowerCase().includes(q) ||
        (r.surveyOrPolicyNo && r.surveyOrPolicyNo.toLowerCase().includes(q)) ||
        (r.description && r.description.toLowerCase().includes(q)) ||
        (r.mockContent && r.mockContent.toLowerCase().includes(q))
      );
    }

    res.json(result);
  });

  // Add New Record
  app.post('/api/records', (req, res) => {
    const newRecord: FarmerRecord = {
      id: req.body.id || `rec-${Date.now()}`,
      name: req.body.name || 'Untitled Document',
      category: req.body.category || 'Other',
      classification: req.body.classification || 'Other',
      dateAdded: req.body.dateAdded || new Date().toISOString().split('T')[0],
      year: req.body.year || new Date().getFullYear(),
      fileType: req.body.fileType || 'PDF',
      fileSize: req.body.fileSize || '1.0 MB',
      status: req.body.status || 'Verified',
      description: req.body.description || '',
      surveyOrPolicyNo: req.body.surveyOrPolicyNo || '',
      mockContent: req.body.mockContent || ''
    };

    demoRecords.unshift(newRecord);
    res.status(201).json(newRecord);
  });

  // Reset / Clear All Records
  app.post('/api/records/reset', (req, res) => {
    demoRecords = [];
    res.json({ success: true, count: 0 });
  });

  // Delete Record
  app.delete('/api/records/:id', (req, res) => {
    const { id } = req.params;
    const initialLen = demoRecords.length;
    demoRecords = demoRecords.filter(r => r.id !== id);
    if (demoRecords.length < initialLen) {
      res.json({ success: true, deletedId: id });
    } else {
      res.status(404).json({ error: 'Record not found' });
    }
  });

  // Dashboard Stats
  app.get('/api/stats', (req, res) => {
    const total = demoRecords.length;
    const agricultural = demoRecords.filter(r => r.classification === 'Agricultural').length;
    const personal = demoRecords.filter(r => r.classification === 'Personal').length;
    const other = demoRecords.filter(r => r.classification === 'Other').length;

    res.json({
      total,
      agricultural,
      personal,
      other,
      crops: demoProfile.mainCrops,
      location: demoProfile.location
    });
  });

  // Interactive Quiz Questions
  app.get('/api/quiz', (req, res) => {
    res.json(quizQuestions);
  });

  // Download Mock Certificate / Slip
  app.get('/api/records/:id/download', (req, res) => {
    const record = demoRecords.find(r => r.id === req.params.id);
    if (!record) {
      return res.status(404).send('Document not found');
    }

    const text = `FARMER DIGITAL RECORDS PORTAL - CERTIFICATE\n------------------------------------------\nTitle: ${record.name}\nCategory: ${record.category}\nDate: ${record.dateAdded}\nStatus: ${record.status}\nRef No: ${record.surveyOrPolicyNo || 'N/A'}\n\nContent:\n${record.mockContent || record.description}\n\nEmergency Helpline: 1551`;
    res.setHeader('Content-Disposition', `attachment; filename="${record.name.replace(/\s+/g, '_')}.txt"`);
    res.setHeader('Content-Type', 'text/plain');
    res.send(text);
  });

  // ==========================================
  // VITE DEV MIDDLEWARE OR PRODUCTION STATIC
  // ==========================================
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
    console.log(`Farmer Digital Records Portal Server running on http://localhost:${PORT}`);
  });
}

startServer();
