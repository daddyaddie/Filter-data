import React, { useEffect, useState } from 'react';
import { fetchData, addRecord } from './api';
import SearchBar from './components/SearchBar';
import Filters from './components/Filters';
import DataTable from './components/DataTable';
import AddRecordForm from './components/AddRecordForm';

export default function App() {
  const [items, setItems] = useState([]);
  const [total, setTotal] = useState(0);
  const [query, setQuery] = useState({ page: 1, limit: 50, sortBy: 'age', order: 'asc', q: '' });

  const load = async (params = {}) => {
    const p = { ...query, ...params };
    try {
      const res = await fetchData(p);
      setItems(res.items);
      setTotal(res.total);
      // Persist current filters/sort/search in state so pagination/sorting keeps them
      setQuery(prev => ({ ...p, page: res.page, limit: res.limit }));
    } catch (e) {
      console.error(e);
      alert('Error fetching data');
    }
  };

  useEffect(() => {
    load();
    // eslint-disable-next-line
  }, []);

  return (
    <div className="container">
      <h1>Excel search & filter — MONSTACK</h1>

      <div className="controls">
        <SearchBar onSearch={(text) => {
          const val = (text || '').trim();
          // Use exact source filter (case-insensitive on backend)
          load({ source: val, q: '', page: 1 });
        }} />
        <Filters onFilter={(filters) => load({ ...filters, page: 1 })} />
        <AddRecordForm onAdd={async (payload) => { await addRecord(payload); load({ page: 1 }); }} />
      </div>

      <DataTable
        items={items}
        total={total}
        page={query.page}
        limit={query.limit}
        onPage={(page) => load({ page })}
        onSort={(sortBy, order) => load({ sortBy, order })}
      />
    </div>
  );
}
