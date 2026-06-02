// Load risk levels table
fetch('/api/analytics/risk-levels')
  .then(res => res.json())
  .then(data => {
    const tbody = document.getElementById('riskbody');
    tbody.innerHTML = data.map(r => {
      const riskClass = r.RiskLevel === 'High Risk' ? 'risk-high' :
                        r.RiskLevel === 'Medium Risk' ? 'risk-medium' : 'risk-low';
      return `
        <tr>
          <td>${r.AreaName}</td>
          <td style="font-family: var(--mono)">${r.CrimeCount}</td>
          <td><span class="${riskClass}">${r.RiskLevel}</span></td>
        </tr>
      `;
    }).join('');
  });

// Load officer workload table + chart
fetch('/api/analytics/workload')
  .then(res => res.json())
  .then(data => {
    // Table
    const tbody = document.getElementById('workloadbody');
    tbody.innerHTML = data.map(o => `
      <tr>
        <td>${o.OfficerName}</td>
        <td>${o.OfficerRank}</td>
        <td>${o.StationName}</td>
        <td style="font-family: var(--mono)">${o.CasesHandled}</td>
      </tr>
    `).join('');

    // Chart
    new Chart(document.getElementById('workloadChart'), {
      type: 'bar',
      data: {
        labels: data.map(o => o.OfficerName),
        datasets: [{
          label: 'Cases',
          data: data.map(o => o.CasesHandled),
          backgroundColor: '#00d4ff',
          borderRadius: 6
        }]
      },
      options: {
        responsive: true,
        plugins: { legend: { display: false } },
        scales: {
          x: { ticks: { color: '#64748b', font: { size: 10 } }, grid: { color: '#1e3a5f' } },
          y: { ticks: { color: '#64748b' }, grid: { color: '#1e3a5f' } }
        }
      }
    });
  });

// Open vs Closed doughnut
fetch('/api/analytics/severity')
  .then(res => res.json())
  .then(() => {
    fetch('/api/crimes')
      .then(res => res.json())
      .then(crimes => {
        const open = crimes.filter(c => c.Status === 'Open').length;
        const closed = crimes.filter(c => c.Status === 'Closed').length;

        new Chart(document.getElementById('statusChart'), {
          type: 'doughnut',
          data: {
            labels: ['Open', 'Closed'],
            datasets: [{
              data: [open, closed],
              backgroundColor: ['#00d4ff', '#7c3aed'],
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
  });