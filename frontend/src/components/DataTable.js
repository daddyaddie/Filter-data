import React from 'react';

export default function DataTable({ items, total, page, limit, onPage, onSort }) {

  const headers = [
    { key: 'source', label: 'Source' },
    { key: 'age', label: 'Age' },
    { key: 'salary', label: 'Salary' }
  ];

  return (
    <div>
      <p>Total: {total}</p>
      <table className="table">
        <thead>
          <tr>
            {headers.map(h => (
              <th key={h.key}>
                {h.label}
                {h.key !== 'source' && (
                  <>
                    <button onClick={() => onSort(h.key, 'asc')}>▲</button>
                    <button onClick={() => onSort(h.key, 'desc')}>▼</button>
                  </>
                )}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {items.map(it => (
            <tr key={it.id ?? it._id}>
              <td>{it.source}</td>
              <td>{it.age}</td>
              <td>{it.salary}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <div style={{ marginTop: 12 }}>
        <button disabled={page <= 1} onClick={() => onPage(page - 1)}>Prev</button>
        <span style={{ margin: '0 8px' }}>Page {page}</span>
        <button disabled={page * limit >= total} onClick={() => onPage(page + 1)}>Next</button>
      </div>
    </div>
  );
}
