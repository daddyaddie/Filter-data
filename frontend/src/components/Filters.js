import React, { useState } from 'react';

export default function Filters({ onFilter }) {
  const [source, setSource] = useState('');
  const [minAge, setMinAge] = useState('');
  const [maxAge, setMaxAge] = useState('');
  const [minSalary, setMinSalary] = useState('');
  const [maxSalary, setMaxSalary] = useState('');

  const apply = () => {
    const filters = {};
    if (source) filters.source = source;
    if (minAge) filters.minAge = minAge;
    if (maxAge) filters.maxAge = maxAge;
    if (minSalary) filters.minSalary = minSalary;
    if (maxSalary) filters.maxSalary = maxSalary;
    onFilter(filters);
  };

  return (
    <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
      <select value={source} onChange={e => setSource(e.target.value)}>
        <option value="">All sources</option>
        <option>Connect</option>
        <option>ConnectOne</option>
        <option>Connect Two</option>
      </select>
      <input placeholder="minAge" value={minAge} onChange={e => setMinAge(e.target.value)} />
      <input placeholder="maxAge" value={maxAge} onChange={e => setMaxAge(e.target.value)} />
      <input placeholder="minSalary" value={minSalary} onChange={e => setMinSalary(e.target.value)} />
      <input placeholder="maxSalary" value={maxSalary} onChange={e => setMaxSalary(e.target.value)} />
      <button onClick={apply}>Apply</button>
    </div>
  )
}
