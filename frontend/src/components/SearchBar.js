import React, { useEffect, useState } from 'react';

export default function SearchBar({ onSearch }) {
  const [q, setQ] = useState('');

  // Debounced search as user types
  useEffect(() => {
    const id = setTimeout(() => {
      onSearch(q);
    }, 350);
    return () => clearTimeout(id);
  }, [q, onSearch]);

  const clear = () => {
    setQ('');
    onSearch('');
  };
  return (
    <div>
      <input
        placeholder="Text search (source)..."
        value={q}
        onChange={(e) => setQ(e.target.value)}
        onKeyDown={(e) => { if (e.key === 'Enter') onSearch(q); }}
      />
      <button onClick={() => onSearch(q)}>Search</button>
      {q && <button onClick={clear}>Clear</button>}
    </div>
  );
}
