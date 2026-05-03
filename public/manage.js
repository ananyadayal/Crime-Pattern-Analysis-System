function showToast(msg) {
  const t = document.createElement('div');
  t.className = 'toast';
  t.textContent = msg;
  document.body.appendChild(t);
  setTimeout(() => t.remove(), 3000);
}

// ── LOCATIONS ──
function loadLocations() {
  fetch('/api/manage/locations')
    .then(res => res.json())
    .then(data => {
      document.getElementById('locationbody').innerHTML = data.map(l => `
        <tr>
          <td class="crime-id">#${l.LocationID}</td>
          <td>${l.AreaName}</td>
          <td>${l.Zone}</td>
          <td>${l.City}</td>
        </tr>
      `).join('');
    });
}

function addLocation() {
  const AreaName = document.getElementById('l-area').value.trim();
  const Zone = document.getElementById('l-zone').value.trim();
  const City = document.getElementById('l-city').value.trim();

  if (!AreaName || !Zone || !City) {
    showToast('Please fill in all location fields.');
    return;
  }

  fetch('/api/manage/locations', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ AreaName, Zone, City })
  })
  .then(res => res.json())
  .then(data => {
    if (data.error) { showToast('Error: ' + data.error); return; }
    showToast('Location added!');
    document.getElementById('l-area').value = '';
    document.getElementById('l-zone').value = '';
    document.getElementById('l-city').value = '';
    loadLocations();
  });
}

// ── OFFICERS ──
function loadOfficers() {
  fetch('/api/manage/officers')
    .then(res => res.json())
    .then(data => {
      document.getElementById('officerbody').innerHTML = data.map(o => `
        <tr>
          <td class="crime-id">#${o.OfficerID}</td>
          <td>${o.OfficerName}</td>
          <td>${o.OfficerRank}</td>
          <td>${o.PhoneNumber}</td>
          <td>${o.StationName || '—'}</td>
        </tr>
      `).join('');
    });
}

function addOfficer() {
  const OfficerName = document.getElementById('o-name').value.trim();
  const OfficerRank = document.getElementById('o-rank').value.trim();
  const PhoneNumber = document.getElementById('o-phone').value.trim();
  const StationID = document.getElementById('o-station').value;

  if (!OfficerName || !OfficerRank || !PhoneNumber) {
    showToast('Please fill in all officer fields.');
    return;
  }

  fetch('/api/manage/officers', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ OfficerName, OfficerRank, PhoneNumber, StationID })
  })
  .then(res => res.json())
  .then(data => {
    if (data.error) { showToast('Error: ' + data.error); return; }
    showToast('Officer added!');
    document.getElementById('o-name').value = '';
    document.getElementById('o-rank').value = '';
    document.getElementById('o-phone').value = '';
    loadOfficers();
  });
}

// ── STATIONS ──
function loadStations() {
  fetch('/api/manage/stations')
    .then(res => res.json())
    .then(data => {
      document.getElementById('stationbody').innerHTML = data.map(s => `
        <tr>
          <td class="crime-id">#${s.StationID}</td>
          <td>${s.StationName}</td>
          <td>${s.Address}</td>
          <td>${s.ContactNumber}</td>
        </tr>
      `).join('');

      // Populate station dropdown in officer form
      const sel = document.getElementById('o-station');
      sel.innerHTML = '<option value="">Select Station</option>';
      data.forEach(s => {
        const opt = document.createElement('option');
        opt.value = s.StationID;
        opt.textContent = s.StationName;
        sel.appendChild(opt);
      });
    });
}

function addStation() {
  const StationName = document.getElementById('s-name').value.trim();
  const Address = document.getElementById('s-address').value.trim();
  const ContactNumber = document.getElementById('s-phone').value.trim();

  if (!StationName || !Address || !ContactNumber) {
    showToast('Please fill in all station fields.');
    return;
  }

  fetch('/api/manage/stations', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ StationName, Address, ContactNumber })
  })
  .then(res => res.json())
  .then(data => {
    if (data.error) { showToast('Error: ' + data.error); return; }
    showToast('Station added!');
    document.getElementById('s-name').value = '';
    document.getElementById('s-address').value = '';
    document.getElementById('s-phone').value = '';
    loadStations();
  });
}

// Also update all nav links to include manage page
loadLocations();
loadOfficers();
loadStations();