let allCrimes = [];

function showToast(msg) {
  const t = document.createElement('div');
  t.className = 'toast';
  t.textContent = msg;
  document.body.appendChild(t);
  setTimeout(() => t.remove(), 3000);
}

// Load dropdowns
function loadDropdowns() {
  fetch('/api/analytics/hotspots')
    .then(res => res.json())
    .then(data => {
      const sel = document.getElementById('f-location');
      data.forEach(l => {
        const opt = document.createElement('option');
        opt.value = l.LocationID;
        opt.textContent = `${l.AreaName}, ${l.City}`;
        sel.appendChild(opt);
      });
    });

  fetch('/api/officers')
    .then(res => res.json())
    .then(data => {
      const sel = document.getElementById('f-officer');
      data.forEach(o => {
        const opt = document.createElement('option');
        opt.value = o.OfficerID;
        opt.textContent = o.OfficerName;
        sel.appendChild(opt);
      });
    });
}

// Render table with given data
function renderTable(crimes) {
  const tbody = document.getElementById('crimestbody');
  const count = document.getElementById('results-count');

  if (count) count.textContent = `${crimes.length} record${crimes.length !== 1 ? 's' : ''} found`;

  if (crimes.length === 0) {
    tbody.innerHTML = `<tr><td colspan="10" class="no-results">No records match your filters.</td></tr>`;
    return;
  }

  tbody.innerHTML = crimes.map(c => {
    const date = c.CrimeDate ? c.CrimeDate.split('T')[0] : '—';
    return `
      <tr>
        <td class="crime-id">#${c.CrimeID}</td>
        <td>${c.CrimeType}</td>
        <td>${date}</td>
        <td>${c.AreaName || '—'}</td>
        <td>${c.City || '—'}</td>
        <td>${c.OfficerName || '—'}</td>
        <td>${c.SuspectName || '—'}</td>
        <td><span class="badge badge-${c.Severity.toLowerCase()}">${c.Severity}</span></td>
        <td><span class="badge badge-${c.Status.toLowerCase()}">${c.Status}</span></td>
        <td>
          ${c.Status === 'Open' ? `<button class="btn-sm btn-close" onclick="closeCase(${c.CrimeID})">Close</button>` : ''}
          <button class="btn-sm btn-danger" onclick="deleteCrime(${c.CrimeID})">Delete</button>
        </td>
      </tr>
    `;
  }).join('');
}

// Apply all active filters
function applyFilters() {
  const search = document.getElementById('search').value.toLowerCase();
  const severity = document.getElementById('filter-severity').value;
  const status = document.getElementById('filter-status').value;
  const city = document.getElementById('filter-city').value;

  const filtered = allCrimes.filter(c => {
    const matchSearch = !search || [
      c.CrimeType, c.AreaName, c.City, c.OfficerName, c.SuspectName
    ].some(val => val && val.toLowerCase().includes(search));

    const matchSeverity = !severity || c.Severity === severity;
    const matchStatus = !status || c.Status === status;
    const matchCity = !city || c.City === city;

    return matchSearch && matchSeverity && matchStatus && matchCity;
  });

  renderTable(filtered);
}

// Reset all filters
function resetFilters() {
  document.getElementById('search').value = '';
  document.getElementById('filter-severity').value = '';
  document.getElementById('filter-status').value = '';
  document.getElementById('filter-city').value = '';
  renderTable(allCrimes);
}

// Load crimes from API
function loadCrimes() {
  fetch('/api/crimes')
    .then(res => res.json())
    .then(crimes => {
      allCrimes = crimes;
      renderTable(allCrimes);
    });
}

// Add new crime
function addCrime() {
  const type = document.getElementById('f-type').value;
  const date = document.getElementById('f-date').value;
  const time = document.getElementById('f-time').value;
  const severity = document.getElementById('f-severity').value;
  const locationID = document.getElementById('f-location').value;
  const officerID = document.getElementById('f-officer').value;

  if (!type || !date || !severity) {
    showToast('Please fill in Type, Date and Severity at minimum.');
    return;
  }

  fetch('/api/crimes', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      CrimeType: type,
      CrimeDate: date,
      CrimeTime: time || null,
      Severity: severity,
      Status: 'Open',
      LocationID: locationID || null,
      OfficerID: officerID || null
    })
  })
  .then(res => res.json())
  .then(() => {
    showToast('Crime record added!');
    loadCrimes();
  });
}

// Close a case
function closeCase(id) {
  fetch(`/api/crimes/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ Status: 'Closed' })
  })
  .then(() => {
    showToast('Case closed!');
    loadCrimes();
  });
}

// Delete a crime
function deleteCrime(id) {
  if (confirm('Delete this crime record permanently?')) {
    fetch(`/api/crimes/${id}`, { method: 'DELETE' })
    .then(() => {
      showToast('Record deleted.');
      loadCrimes();
    });
  }
}

// Attach filter listeners
document.getElementById('search').addEventListener('input', applyFilters);
document.getElementById('filter-severity').addEventListener('change', applyFilters);
document.getElementById('filter-status').addEventListener('change', applyFilters);
document.getElementById('filter-city').addEventListener('change', applyFilters);

loadDropdowns();
loadCrimes();