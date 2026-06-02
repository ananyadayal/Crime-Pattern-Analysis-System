// Load summary stats
fetch('/api/crimes')
  .then(res => res.json())
  .then(crimes => {
    const total = crimes.length;
    const open = crimes.filter(c => c.Status === 'Open').length;
    const closed = crimes.filter(c => c.Status === 'Closed').length;
    const high = crimes.filter(c => c.Severity === 'High').length;

    document.getElementById('total-crimes').textContent = total;
    document.getElementById('open-cases').textContent = open;
    document.getElementById('closed-cases').textContent = closed;
    document.getElementById('high-severity').textContent = high;
  });

// Crime type bar chart
fetch('/api/analytics/crime-types')
  .then(res => res.json())
  .then(data => {
    new Chart(document.getElementById('crimeTypeChart'), {
      type: 'bar',
      data: {
        labels: data.map(d => d.CrimeType),
        datasets: [{
          label: 'Count',
          data: data.map(d => d.Frequency),
          backgroundColor: '#3b82f6',
          borderRadius: 6
        }]
      },
      options: {
        responsive: true,
        plugins: { legend: { display: false } },
        scales: {
          x: { ticks: { color: '#94a3b8' }, grid: { color: '#1e293b' } },
          y: { ticks: { color: '#94a3b8' }, grid: { color: '#334155' } }
        }
      }
    });
  });

// Severity doughnut chart
fetch('/api/analytics/severity')
  .then(res => res.json())
  .then(data => {
    new Chart(document.getElementById('severityChart'), {
      type: 'doughnut',
      data: {
        labels: data.map(d => d.Severity),
        datasets: [{
          data: data.map(d => d.TotalCrimes),
          backgroundColor: ['#ef4444', '#f97316', '#22c55e'],
          borderWidth: 0
        }]
      },
      options: {
        responsive: true,
        plugins: {
          legend: { labels: { color: '#94a3b8' } }
        }
      }
    });
  });

// Hotspots bar chart
fetch('/api/analytics/hotspots')
  .then(res => res.json())
  .then(data => {
    new Chart(document.getElementById('hotspotChart'), {
      type: 'bar',
      data: {
        labels: data.map(d => `${d.AreaName}, ${d.City}`),
        datasets: [{
          label: 'Total Crimes',
          data: data.map(d => d.TotalCrimes),
          backgroundColor: '#8b5cf6',
          borderRadius: 6
        }]
      },
      options: {
        responsive: true,
        plugins: { legend: { display: false } },
        scales: {
          x: { ticks: { color: '#94a3b8' }, grid: { color: '#1e293b' } },
          y: { ticks: { color: '#94a3b8' }, grid: { color: '#334155' } }
        }
      }
    });
  });

  // Monthly trend line chart
fetch('/api/analytics/monthly-trend')
  .then(res => res.json())
  .then(data => {
    new Chart(document.getElementById('trendChart'), {
      type: 'line',
      data: {
        labels: data.map(d => d.Month),
        datasets: [{
          label: 'Crimes',
          data: data.map(d => d.TotalCrimes),
          borderColor: '#00d4ff',
          backgroundColor: 'rgba(0, 212, 255, 0.08)',
          borderWidth: 2,
          pointBackgroundColor: '#00d4ff',
          pointRadius: 5,
          pointHoverRadius: 7,
          fill: true,
          tension: 0.4
        }]
      },
      options: {
        responsive: true,
        plugins: { legend: { display: false } },
        scales: {
          x: { ticks: { color: '#94a3b8' }, grid: { color: '#1e3a5f' } },
          y: {
            ticks: { color: '#94a3b8' },
            grid: { color: '#1e3a5f' },
            beginAtZero: true
          }
        }
      }
    });
  });