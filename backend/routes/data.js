const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');

// Load JSON data
const dataPath = path.join(__dirname, '../data/sampleData.json');
let jsonData = [];

// Load data from JSON file
const loadData = () => {
  try {
    if (fs.existsSync(dataPath)) {
      const rawData = fs.readFileSync(dataPath, 'utf8');
      jsonData = JSON.parse(rawData);
    }
  } catch (e) {
    console.error('Error loading JSON data:', e.message);
    jsonData = [];
  }
};

// Save data to JSON file
const saveData = () => {
  try {
    fs.writeFileSync(dataPath, JSON.stringify(jsonData, null, 2));
  } catch (e) {
    console.error('Error saving JSON data:', e.message);
  }
};

// Initialize data
loadData();

// Create new record
router.post('/', (req, res) => {
  try {
    const { source, age, salary } = req.body;
    const newId = Math.max(...jsonData.map(item => item.id || 0)) + 1;
    const newRecord = { id: newId, source, age: Number(age), salary: Number(salary) };
    jsonData.push(newRecord);
    saveData();
    res.status(201).json(newRecord);
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
});

// Bulk insert (used by import script optionally)
router.post('/bulk', (req, res) => {
  try {
    const docs = req.body; // array of {source, age, salary}
    const maxId = Math.max(...jsonData.map(item => item.id || 0));
    const newRecords = docs.map((doc, index) => ({
      id: maxId + index + 1,
      source: doc.source,
      age: Number(doc.age),
      salary: Number(doc.salary)
    }));
    jsonData.push(...newRecords);
    saveData();
    res.json({ insertedCount: newRecords.length });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

// Search & filter
// Query params: source, minAge, maxAge, minSalary, maxSalary, q (text), page, limit, sortBy (age|salary), order (asc|desc)
router.get('/', (req, res) => {
  try {
    const {
      source,
      minAge, maxAge,
      minSalary, maxSalary,
      q,
      page = 1,
      limit = 50,
      sortBy = 'age',
      order = 'asc'
    } = req.query;

    // Filter data
    let filteredData = [...jsonData];

    if (source) {
      const s = String(source).toLowerCase();
      filteredData = filteredData.filter(item => String(item.source).toLowerCase() === s);
    }

    if (minAge !== undefined) {
      filteredData = filteredData.filter(item => item.age >= Number(minAge));
    }

    if (maxAge !== undefined) {
      filteredData = filteredData.filter(item => item.age <= Number(maxAge));
    }

    if (minSalary !== undefined) {
      filteredData = filteredData.filter(item => item.salary >= Number(minSalary));
    }

    if (maxSalary !== undefined) {
      filteredData = filteredData.filter(item => item.salary <= Number(maxSalary));
    }

    if (q) {
      // Text search on source
      filteredData = filteredData.filter(item =>
        item.source.toLowerCase().includes(q.toLowerCase())
      );
    }

    // Sort data
    filteredData.sort((a, b) => {
      const aVal = a[sortBy];
      const bVal = b[sortBy];
      if (order === 'asc') {
        return aVal > bVal ? 1 : -1;
      } else {
        return aVal < bVal ? 1 : -1;
      }
    });

    // Pagination
    const total = filteredData.length;
    const skip = (Number(page) - 1) * Number(limit);
    const items = filteredData.slice(skip, skip + Number(limit));

    res.json({ total, page: Number(page), limit: Number(limit), items });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

// Get single
router.get('/:id', (req, res) => {
  try {
    const item = jsonData.find(item => item.id === Number(req.params.id));
    if (!item) return res.status(404).json({ error: 'Not found' });
    res.json(item);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

// Update
router.put('/:id', (req, res) => {
  try {
    const index = jsonData.findIndex(item => item.id === Number(req.params.id));
    if (index === -1) return res.status(404).json({ error: 'Not found' });

    jsonData[index] = { ...jsonData[index], ...req.body };
    saveData();
    res.json(jsonData[index]);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

// Delete
router.delete('/:id', (req, res) => {
  try {
    const index = jsonData.findIndex(item => item.id === Number(req.params.id));
    if (index === -1) return res.status(404).json({ error: 'Not found' });

    jsonData.splice(index, 1);
    saveData();
    res.json({ success: true });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

module.exports = router;
