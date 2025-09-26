# monstack-excel-search

A minimal MERN-style app to import Excel into MongoDB and search/paginate records.

- Backend: Express, Mongoose, XLSX (port 5000)
- Frontend: React + Create React App (port 3000)

## How the Excel data will be stored (example)

We convert your table into rows like:

```
[
  {"source":"Connect","age":0,"salary":5326.71},
  {"source":"ConnectOne","age":0,"salary":1331.15},
  {"source":"Connect Two","age":0,"salary":1011},
  {"source":"Connect","age":1,"salary":9325.82},
  {"source":"ConnectOne","age":1,"salary":2094.21},
  {"source":"Connect Two","age":1,"salary":8975.82},
  ...
]
```

Each becomes a document in MongoDB with keys: source, age, salary.

## Quick Start (Any Windows device)

Minimal steps to run after cloning from GitHub.

### 1) Clone
```powershell
git clone <your-repo-url>
cd monstack-excel-search
```

### 2) Install & run — Backend
```powershell
cd backend
npm install
copy .env.example .env
# .env already works with local JSON data and port 5000
npm run dev   # starts http://localhost:5000
```

### 3) Install & run — Frontend (new terminal)
```powershell
cd ..\frontend
npm install
npm start     # opens http://localhost:3000
```

That’s it. The UI at http://localhost:3000 calls the API at http://localhost:5000/api.

## Project structure

```
monstack-excel-search/
├─ README.md
├─ run.ps1                # one-click start (PowerShell)
├─ run.bat                # one-click start (Batch)
├─ backend/
│  ├─ server.js           # Express server entry
│  ├─ package.json
│  ├─ .env.example        # example env (PORT etc.)
│  ├─ .env                # local env (created from example)
│  ├─ data/
│  │  └─ sampleData.json  # local JSON datastore
│  ├─ routes/
│  │  └─ data.js          # REST endpoints (/api/data)
│  ├─ models/             # (reserved for future Mongo models)
│  └─ scripts/            # (optional import scripts)
└─ frontend/
  ├─ package.json
  ├─ public/
  │  └─ index.html
  └─ src/
    ├─ api.js           # API client (axios)
    ├─ App.js           # App root
    ├─ index.js, styles.css
    └─ components/
      ├─ SearchBar.js
      ├─ Filters.js
      ├─ DataTable.js
      └─ AddRecordForm.js
```

### Optional: one-click start
From the project root:
```powershell
./run.ps1   # or run.bat if scripts are blocked
```

### Optional: import Excel to JSON (sample)
Put `data.xlsx` in `backend/` then:
```powershell
cd backend
npm run import-excel
```

## Troubleshooting (short)

- Backend port busy (5000):
```powershell
Get-Process -Id (Get-NetTCPConnection -LocalPort 5000 | Select-Object -ExpandProperty OwningProcess) | Stop-Process -Force
```

- Check services are up:
```powershell
Invoke-WebRequest -UseBasicParsing http://localhost:5000/api/data | Select-Object -ExpandProperty StatusCode
Invoke-WebRequest -UseBasicParsing http://localhost:3000 | Select-Object -ExpandProperty StatusCode
```

- Update API base (if you change backend port): create `frontend/.env`
```text
REACT_APP_API_BASE=http://localhost:5000/api
```




Uploading Recording 2025-09-26 102624.mp4…

<img width="1131" height="460" alt="Screenshot 2025-09-26 102642" src="https://github.com/user-attachments/assets/d01ba805-24eb-4bbb-bec6-7d9aacaab876" />


