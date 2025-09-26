import React, { useState } from 'react';

export default function AddRecordForm({ onAdd }) {
  const [source, setSource] = useState('Connect');
  const [age, setAge] = useState('');
  const [salary, setSalary] = useState('');

  const submit = async () => {
    if (source && age !== '' && salary !== '') {
      await onAdd({ source, age: Number(age), salary: Number(salary) });
      setAge(''); setSalary('');
    } else {
      alert('fill fields');
    }
  };

  return (
    <div>
      <select value={source} onChange={e => setSource(e.target.value)}>
        <option>Connect</option>
        <option>ConnectOne</option>
        <option>Connect Two</option>
      </select>
      <input placeholder="Age" value={age} onChange={e => setAge(e.target.value)} />
      <input placeholder="Salary" value={salary} onChange={e => setSalary(e.target.value)} />
      <button onClick={submit}>Add</button>
    </div>
  );
}
