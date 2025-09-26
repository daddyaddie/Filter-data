import axios from 'axios';

const API_BASE = process.env.REACT_APP_API_BASE || 'http://localhost:5000/api';

export const fetchData = (params) => axios.get(`${API_BASE}/data`, { params }).then(r => r.data);
export const addRecord = (payload) => axios.post(`${API_BASE}/data`, payload).then(r => r.data);
export const bulkInsert = (arr) => axios.post(`${API_BASE}/data/bulk`, arr).then(r => r.data);
export const importData = () => axios.post(`${API_BASE}/import`).then(r => r.data);
