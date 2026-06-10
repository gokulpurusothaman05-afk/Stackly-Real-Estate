/**
 * Dashboard - Charts and dashboard utilities
 */
(function () {
  'use strict';

  const colorAccent = '#0d9488';
  const chartColors = ['#0d9488', '#14b8a6', '#5eead4', '#134e4a', '#0f766e', '#2dd4bf'];
  const charts = [];

  function isSmallScreen() {
    return window.innerWidth <= 480;
  }

  function tickFont() {
    return { size: isSmallScreen() ? 9 : 11 };
  }

  function baseScaleOptions() {
    return {
      ticks: { font: tickFont(), maxTicksLimit: isSmallScreen() ? 5 : 8 },
      grid: { display: !isSmallScreen() }
    };
  }

  function setDashboardDate() {
    const el = document.getElementById('dashboard-date');
    if (!el) return;
    const now = new Date();
    if (isSmallScreen()) {
      el.textContent = now.toLocaleDateString('en-IN', {
        day: 'numeric',
        month: 'short',
        year: 'numeric'
      });
    } else {
      el.textContent = now.toLocaleDateString('en-IN', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      });
    }
  }

  function addChart(ctx, config) {
    if (!ctx) return;
    const chart = new Chart(ctx, config);
    charts.push(chart);
  }

  function createTypeChart() {
    addChart(document.getElementById('chart-type'), {
      type: 'doughnut',
      data: {
        labels: ['House', 'Apartment', 'Villa', 'Condo'],
        datasets: [{
          data: [35, 30, 20, 15],
          backgroundColor: chartColors,
          borderWidth: 0
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        layout: { padding: 4 },
        plugins: {
          legend: {
            position: 'bottom',
            labels: { font: tickFont(), boxWidth: 10, padding: 8 }
          }
        }
      }
    });
  }

  function createSalesChart() {
    addChart(document.getElementById('chart-sales'), {
      type: 'line',
      data: {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
        datasets: [{
          label: 'Sales',
          data: [42, 55, 48, 62, 58, 71, 65, 78, 82, 75, 88, 95],
          borderColor: colorAccent,
          backgroundColor: colorAccent + '20',
          fill: true,
          tension: 0.4,
          pointRadius: isSmallScreen() ? 2 : 3
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        layout: { padding: { left: 0, right: 4, top: 4, bottom: 0 } },
        plugins: { legend: { display: false } },
        scales: {
          x: { ...baseScaleOptions(), ticks: { ...baseScaleOptions().ticks, maxRotation: 0, autoSkip: true } },
          y: { beginAtZero: true, ...baseScaleOptions() }
        }
      }
    });
  }

  function createPriceChart() {
    const labels = isSmallScreen()
      ? ['<₹50L', '₹50L–1Cr', '₹1–2Cr', '₹2Cr+']
      : ['Under ₹50L', '₹50L–₹1Cr', '₹1–2 Cr', '₹2 Cr+'];

    addChart(document.getElementById('chart-price'), {
      type: 'bar',
      data: {
        labels: labels,
        datasets: [{
          label: 'Listings',
          data: [120, 85, 45, 22],
          backgroundColor: colorAccent,
          borderRadius: 6
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        layout: { padding: 4 },
        plugins: { legend: { display: false } },
        scales: {
          x: { ...baseScaleOptions(), ticks: { ...baseScaleOptions().ticks, maxRotation: isSmallScreen() ? 45 : 0 } },
          y: { beginAtZero: true, ...baseScaleOptions() }
        }
      }
    });
  }

  function createCityChart() {
    addChart(document.getElementById('chart-city'), {
      type: 'bar',
      data: {
        labels: ['Chennai', 'Coimbatore', 'Madurai', 'Trichy', 'Salem', 'Erode'],
        datasets: [{
          label: 'Listings',
          data: [4200, 2800, 1900, 1200, 850, 620],
          backgroundColor: chartColors,
          borderRadius: 6
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        indexAxis: 'y',
        layout: { padding: 4 },
        plugins: { legend: { display: false } },
        scales: {
          x: { beginAtZero: true, ...baseScaleOptions() },
          y: { ...baseScaleOptions(), ticks: { ...baseScaleOptions().ticks, autoSkip: false } }
        }
      }
    });
  }

  function createInquiriesChart() {
    addChart(document.getElementById('chart-inquiries'), {
      type: 'line',
      data: {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
        datasets: [{
          label: 'Inquiries',
          data: [320, 410, 380, 520, 490, 610],
          borderColor: '#14b8a6',
          backgroundColor: 'rgba(20, 184, 166, 0.15)',
          fill: true,
          tension: 0.4,
          pointRadius: isSmallScreen() ? 2 : 3
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        layout: { padding: 4 },
        plugins: { legend: { display: false } },
        scales: {
          x: baseScaleOptions(),
          y: { beginAtZero: true, ...baseScaleOptions() }
        }
      }
    });
  }

  function resizeCharts() {
    charts.forEach(function (chart) {
      chart.resize();
    });
  }

  function init() {
    setDashboardDate();
    createTypeChart();
    createSalesChart();
    createPriceChart();
    createCityChart();
    createInquiriesChart();

    var resizeTimer;
    window.addEventListener('resize', function () {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(function () {
        setDashboardDate();
        resizeCharts();
      }, 150);
    }, { passive: true });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
