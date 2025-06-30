const API_KEY = 'be21f541e438eba961c713159753058d';

const iconMap = {
  'Clear': 'bi-sun-fill',
  'Clouds': 'bi-clouds-fill',
  'Rain': 'bi-cloud-rain-fill',
  'Thunderstorm': 'bi-lightning-fill',
  'Drizzle': 'bi-cloud-drizzle-fill',
  'Snow': 'bi-snow2',
  'Mist': 'bi-cloud-fog2-fill',
  'Smoke': 'bi-wind',
  'Haze': 'bi-cloud-haze2-fill',
  'Dust': 'bi-cloud-drizzle-fill',
  'Fog': 'bi-cloud-fog2-fill',
  'Sand': 'bi-wind',
  'Ash': 'bi-cloud-fog2',
  'Squall': 'bi-wind',
  'Tornado': 'bi-tornado'
};

async function fetchWeather() {
  const city = document.getElementById('city').value.trim();
  if (!city) {
    document.getElementById('weather-container').innerHTML = `<div class="alert alert-warning animate-fade-in" role="alert">⚠️ Silakan masukkan nama kota/kab/kec terlebih dahulu.</div>`;
    return;
  }
  
  const container = document.getElementById('weather-container');
  container.innerHTML = `
    <div class="text-center my-4">
      <div class="spinner-border text-primary" role="status"><span class="visually-hidden">Loading...</span></div>
      <p class="mt-2">Mengambil data cuaca...</p>
    </div>
  `;

  try {
    const url = `https://api.openweathermap.org/data/2.5/forecast?q=${encodeURIComponent(city)}&appid=${API_KEY}&units=metric&lang=id`;
    const res = await fetch(url);
    const data = await res.json();

    if (data.cod !== "200") throw new Error(data.message);

    const daily = data.list.slice(0, 8);
    const current = daily[0];
    const weatherMain = current.weather[0].main;
    const icon = iconMap[weatherMain] || 'bi-question-circle-fill';

    const feelsLike = Math.round(current.main.feels_like);
    const humidity = current.main.humidity;
    const windSpeed = current.wind.speed.toFixed(1);
    const sunrise = new Date(data.city.sunrise * 1000).toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' });
    const sunset = new Date(data.city.sunset * 1000).toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' });
    
    const timezoneOffsetHours = data.city.timezone / 3600;
    const gmtString = `GMT${timezoneOffsetHours >= 0 ? '+' : ''}${timezoneOffsetHours}`;

    let html = `
    <div class="weather-card animate-fade-in">
      <h4><i class="bi bi-geo-alt-fill me-2"></i>${data.city.name}, ${data.city.country}</h4>
      <div class="weather-icon mb-2"><i class="bi ${icon}"></i></div>
      <div class="fs-1 fw-bold">${Math.round(current.main.temp)}°C</div>
      <p class="text-capitalize fs-5">${current.weather[0].description}</p>
      <p class="mb-3">Terasa seperti ${feelsLike}°C</p>

      <div class="extra-details">
        <div class="detail-item">
          <i class="bi bi-wind"></i>
          <div>${windSpeed} m/s</div>
          <div class="detail-label">Angin</div>
        </div>
        <div class="detail-item">
          <i class="bi bi-droplet-half"></i>
          <div>${humidity}%</div>
          <div class="detail-label">Lembap</div>
        </div>
        <div class="detail-item">
          <i class="bi bi-sunrise-fill"></i>
          <div>${sunrise} <small>(${gmtString})</small></div>
          <div class="detail-label">Terbit</div>
        </div>
        <div class="detail-item">
          <i class="bi bi-sunset-fill"></i>
          <div>${sunset} <small>(${gmtString})</small></div>
          <div class="detail-label">Terbenam</div>
        </div>
      </div>

      <div class="weather-details mt-4">
  `;

    for (const item of daily) {
      const time = new Date(item.dt * 1000).toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' });
      const main = item.weather[0].main;
      const ic = iconMap[main] || 'bi-question-circle-fill';
      html += `
        <div class="weather-detail-card">
          <div><strong>${time}</strong></div>
          <div><i class="bi ${ic}"></i></div>
          <div>${Math.round(item.main.temp)}°C</div>
        </div>
      `;
    }

    html += '</div></div>';
    container.innerHTML = html;

  } catch (err) {
    container.innerHTML = `<div class="alert alert-danger animate-fade-in" role="alert">❌ Gagal mengambil data: ${err.message}. Pastikan nama kota benar.</div>`;
  }
}

document.getElementById('get-weather').addEventListener('click', fetchWeather);
document.getElementById('city').addEventListener('keydown', (event) => {
  if (event.key === 'Enter') {
    event.preventDefault(); // Mencegah form submit jika ada
    fetchWeather();
  }
});

// Tema
const themeToggle = document.getElementById('theme-toggle');
themeToggle.addEventListener('click', () => {
  document.body.classList.toggle('dark-mode');
  const icon = document.body.classList.contains('dark-mode') ? 'bi-sun-fill' : 'bi-moon-stars-fill';
  themeToggle.innerHTML = `<i class="bi ${icon}"></i>`;
});

// Install Prompt
let deferredPrompt;
const installBtn = document.getElementById('install-button');

window.addEventListener('beforeinstallprompt', (e) => {
  e.preventDefault();
  deferredPrompt = e;
  installBtn.classList.remove('d-none');
});

installBtn.addEventListener('click', () => {
  if (deferredPrompt) {
    deferredPrompt.prompt();
    deferredPrompt.userChoice.then(() => {
      deferredPrompt = null;
      installBtn.classList.add('d-none');
    });
  }
});