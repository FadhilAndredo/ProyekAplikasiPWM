document.addEventListener('DOMContentLoaded', () => {

    // --- Elemen DOM ---
    const themeToggle = document.getElementById('theme-toggle');
    const provinceSelector = document.getElementById('province-selector');
    const districtSelector = document.getElementById('district-selector');
    const weatherContainer = document.getElementById('weather-container');
    const loader = document.getElementById('loader');
    const body = document.body;
    
    // --- Data Wilayah Lengkap (Lokal) ---
    const areaData = {"Aceh":[{"id":"501391","propinsi":"Aceh","kota":"Simeulue","kecamatan":"Teupah Selatan","lat":"2.4833333","lon":"96.0833333"},{"id":"501390","propinsi":"Aceh","kota":"Simeulue","kecamatan":"Simeulue Timur","lat":"2.55","lon":"96.25"},{"id":"501389","propinsi":"Aceh","kota":"Simeulue","kecamatan":"Simeulue Tengah","lat":"2.6333333","lon":"96.0666667"},{"id":"501388","propinsi":"Aceh","kota":"Simeulue","kecamatan":"Salang","lat":"2.75","lon":"96.2333333"}],"Bali":[{"id":"501246","propinsi":"Bali","kota":"Tabanan","kecamatan":"Selemadeg","lat":"-8.5","lon":"115"},{"id":"501245","propinsi":"Bali","kota":"Tabanan","kecamatan":"Penebel","lat":"-8.4166667","lon":"115.15"}],"Banten":[{"id":"501217","propinsi":"Banten","kota":"Tangerang","kecamatan":"Tigaraksa","lat":"-6.2666667","lon":"106.5"}],"Bengkulu":[{"id":"501428","propinsi":"Bengkulu","kota":"Bengkulu Utara","kecamatan":"Putri Hijau","lat":"-3.2","lon":"101.9333333"}],"DI Yogyakarta":[{"id":"501292","propinsi":"DI Yogyakarta","kota":"Sleman","kecamatan":"Sleman","lat":"-7.7","lon":"110.3333333"}],"DKI Jakarta":[{"id":"501318","propinsi":"DKI Jakarta","kota":"Jakarta Pusat","kecamatan":"Gambir","lat":"-6.1666667","lon":"106.8166667"}],"Gorontalo":[{"id":"501322","propinsi":"Gorontalo","kota":"Gorontalo","kecamatan":"Kota Barat","lat":"0.5333333","lon":"123.0333333"}],"Jambi":[{"id":"501435","propinsi":"Jambi","kota":"Kerinci","kecamatan":"Gunung Kerinci","lat":"-2.1","lon":"101.4666667"}],"Jawa Barat":[{"id":"501282","propinsi":"Jawa Barat","kota":"Tasikmalaya","kecamatan":"Tasikmalaya","lat":"-7.3333333","lon":"108.2166667"}],"Jawa Tengah":[{"id":"501285","propinsi":"Jawa Tengah","kota":"Semarang","kecamatan":"Semarang","lat":"-7","lon":"110.4166667"}],"Jawa Timur":[{"id":"501302","propinsi":"Jawa Timur","kota":"Surabaya","kecamatan":"Surabaya","lat":"-7.25","lon":"112.75"}],"Kalimantan Barat":[{"id":"501449","propinsi":"Kalimantan Barat","kota":"Pontianak","kecamatan":"Pontianak","lat":"-0.0166667","lon":"109.3333333"}],"Kalimantan Selatan":[{"id":"501476","propinsi":"Kalimantan Selatan","kota":"Banjarmasin","kecamatan":"Banjarmasin","lat":"-3.3166667","lon":"114.5833333"}],"Kalimantan Tengah":[{"id":"501460","propinsi":"Kalimantan Tengah","kota":"Palangkaraya","kecamatan":"Palangkaraya","lat":"-2.2166667","lon":"113.9166667"}],"Kalimantan Timur":[{"id":"501493","propinsi":"Kalimantan Timur","kota":"Samarinda","kecamatan":"Samarinda","lat":"-0.5","lon":"117.15"}],"Kalimantan Utara":[{"id":"501500","propinsi":"Kalimantan Utara","kota":"Tanjung Selor","kecamatan":"Tanjung Selor","lat":"2.8333333","lon":"117.3666667"}],"Kepulauan Bangka Belitung":[{"id":"501440","propinsi":"Kepulauan Bangka Belitung","kota":"Pangkal Pinang","kecamatan":"Pangkal Pinang","lat":"-2.1333333","lon":"106.1"}],"Kepulauan Riau":[{"id":"501511","propinsi":"Kepulauan Riau","kota":"Tanjung Pinang","kecamatan":"Tanjung Pinang","lat":"0.9166667","lon":"104.45"}],"Lampung":[{"id":"501524","propinsi":"Lampung","kota":"Bandar Lampung","kecamatan":"Bandar Lampung","lat":"-5.45","lon":"105.2666667"}],"Maluku":[{"id":"501533","propinsi":"Maluku","kota":"Ambon","kecamatan":"Ambon","lat":"-3.7","lon":"128.1666667"}],"Maluku Utara":[{"id":"501540","propinsi":"Maluku Utara","kota":"Ternate","kecamatan":"Ternate","lat":"0.7833333","lon":"127.3833333"}],"Nusa Tenggara Barat":[{"id":"501552","propinsi":"Nusa Tenggara Barat","kota":"Mataram","kecamatan":"Mataram","lat":"-8.5833333","lon":"116.1166667"}],"Nusa Tenggara Timur":[{"id":"501563","propinsi":"Nusa Tenggara Timur","kota":"Kupang","kecamatan":"Kupang","lat":"-10.1666667","lon":"123.5833333"}],"Papua":[{"id":"501573","propinsi":"Papua","kota":"Jayapura","kecamatan":"Jayapura","lat":"-2.5333333","lon":"140.7166667"}],"Papua Barat":[{"id":"501582","propinsi":"Papua Barat","kota":"Manokwari","kecamatan":"Manokwari","lat":"-0.8666667","lon":"134.05"}],"Riau":[{"id":"501592","propinsi":"Riau","kota":"Pekanbaru","kecamatan":"Pekanbaru","lat":"0.5333333","lon":"101.45"}],"Sulawesi Barat":[{"id":"501602","propinsi":"Sulawesi Barat","kota":"Mamuju","kecamatan":"Mamuju","lat":"-2.6666667","lon":"118.8833333"}],"Sulawesi Selatan":[{"id":"501340","propinsi":"Sulawesi Selatan","kota":"Makassar","kecamatan":"Makassar","lat":"-5.1333333","lon":"119.4166667"}],"Sulawesi Tengah":[{"id":"501614","propinsi":"Sulawesi Tengah","kota":"Palu","kecamatan":"Palu","lat":"-0.9","lon":"119.8666667"}],"Sulawesi Tenggara":[{"id":"501625","propinsi":"Sulawesi Tenggara","kota":"Kendari","kecamatan":"Kendari","lat":"-3.9666667","lon":"122.5"}],"Sulawesi Utara":[{"id":"501635","propinsi":"Sulawesi Utara","kota":"Manado","kecamatan":"Manado","lat":"1.4833333","lon":"124.8333333"}],"Sumatera Barat":[{"id":"501646","propinsi":"Sumatera Barat","kota":"Padang","kecamatan":"Padang","lat":"-0.95","lon":"100.35"}],"Sumatera Selatan":[{"id":"501657","propinsi":"Sumatera Selatan","kota":"Palembang","kecamatan":"Palembang","lat":"-2.9833333","lon":"104.7666667"}],"Sumatera Utara":[{"id":"501402","propinsi":"Sumatera Utara","kota":"Medan","kecamatan":"Medan","lat":"3.5833333","lon":"98.6666667"}]};

    // --- Logika Tema ---
    function applyTheme(theme) { body.classList.toggle('dark-mode', theme === 'dark'); localStorage.setItem('theme', theme); const iconClass = theme === 'dark' ? 'bi-sun-fill' : 'bi-moon-stars-fill'; themeToggle.innerHTML = `<i class="bi ${iconClass}"></i>`; }
    themeToggle.addEventListener('click', () => { const newTheme = body.classList.contains('dark-mode') ? 'light' : 'dark'; applyTheme(newTheme); });
    applyTheme(localStorage.getItem('theme') || 'light');

    // --- Pemetaan Deskripsi Cuaca ke Ikon ---
    const weatherIconMapping = { 'cerah': 'bi-brightness-high-fill', 'cerah berawan': 'bi-cloud-sun-fill', 'berawan': 'bi-cloud-fill', 'berawan tebal': 'bi-clouds-fill', 'kabut': 'bi-cloud-fog2-fill', 'hujan ringan': 'bi-cloud-drizzle-fill', 'hujan sedang': 'bi-cloud-rain-fill', 'hujan lebat': 'bi-cloud-rain-heavy-fill', 'hujan petir': 'bi-thunderstorms-rain', 'asap': 'bi-smoke' };
    function getWeatherInfo(description) { const descLower = description.toLowerCase(); for (const key in weatherIconMapping) { if (descLower.includes(key)) { return { desc: description, icon: weatherIconMapping[key] }; } } return { desc: description, icon: 'bi-question-circle-fill' }; }

    // --- Inisialisasi Aplikasi ---
    function initialize() { populateProvinces(); }
    
    function populateProvinces() {
        provinceSelector.innerHTML = '<option value="" selected disabled>Pilih Provinsi</option>';
        const sortedProvinces = Object.keys(areaData).sort();
        for (const province of sortedProvinces) {
            const option = document.createElement('option');
            option.value = province;
            option.textContent = province;
            provinceSelector.appendChild(option);
        }
    }

    provinceSelector.addEventListener('change', () => {
        const selectedProvince = provinceSelector.value;
        weatherContainer.innerHTML = ''; 
        if (!selectedProvince) {
            districtSelector.innerHTML = '<option>Pilih provinsi dulu</option>';
            districtSelector.disabled = true;
            return;
        }
        const districts = areaData[selectedProvince];
        districtSelector.innerHTML = '<option value="" selected disabled>Pilih Wilayah</option>';
        districtSelector.disabled = false;
        for (const district of districts) {
            const option = document.createElement('option');
            option.value = district.id;
            option.textContent = `${district.kecamatan}, ${district.kota}`;
            districtSelector.appendChild(option);
        }
    });

    districtSelector.addEventListener('change', () => {
        const areaCode = districtSelector.value;
        if (areaCode) fetchWeatherData(areaCode);
    });

    // --- FUNGSI PENGAMBILAN DATA (PERBAIKAN TOTAL) ---
    async function fetchWeatherData(areaCode) {
        loader.classList.remove('d-none');
        weatherContainer.innerHTML = '';
        
        const targetApiUrl = `https://api.bmkg.go.id/publik/prakiraan-cuaca?adm4=${areaCode}`;
        // --- PERBAIKAN: Ganti proxy ke allorigins.win yang lebih permisif ---
        const proxyUrl = `https://api.allorigins.win/raw?url=${encodeURIComponent(targetApiUrl)}`;

        try {
            const response = await fetch(proxyUrl);
            if (!response.ok) {
                throw new Error(`Gagal menghubungi API BMKG melalui proxy (Status: ${response.status})`);
            }
            const data = await response.json();

            // --- PERBAIKAN LOGIKA PALING PENTING: Memeriksa struktur data yang benar ---
            if (data && data.lokasi && Array.isArray(data.data) && data.data.length > 0) {
                displayWeatherData(data); // Kirim seluruh objek data jika valid
            } else {
                // Jika struktur tidak sesuai, berikan pesan error yang jelas
                console.error("Struktur data tak terduga diterima:", data);
                showError("Struktur data dari API BMKG tidak sesuai harapan.");
            }
        } catch (error) {
            console.error("Fetch Error:", error);
            showError(`Gagal mengambil data cuaca: ${error.message}`);
        } finally {
            loader.classList.add('d-none');
        }
    }

    // --- FUNGSI TAMPILAN DATA (PERBAIKAN TOTAL) ---
    function displayWeatherData(weatherData) {
        const { lokasi, data } = weatherData;
        
        // Ambil prakiraan cuaca dari struktur yang benar: data -> elemen pertama -> cuaca -> elemen pertama
        const prakiraanHarian = data[0].cuaca[0]; 
        if (!prakiraanHarian || prakiraanHarian.length === 0) {
            showError("Data prakiraan untuk hari ini tidak tersedia dalam respons.");
            return;
        }
        
        const prakiraanSaatIni = prakiraanHarian[0];
        const weatherInfo = getWeatherInfo(prakiraanSaatIni.weather_desc);

        let forecastListHtml = '<ul class="list-group list-group-flush">';
        for (const prakiraanItem of prakiraanHarian) {
            const { t, hu, weather_desc, ws, local_datetime } = prakiraanItem;
            const itemWeatherInfo = getWeatherInfo(weather_desc);
            const date = new Date(local_datetime);
            const time = date.toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit', hour12: false });

            forecastListHtml += `
                <li class="list-group-item d-flex justify-content-between align-items-center">
                    <div class="fw-bold">${time} WIB</div>
                    <div><i class="bi ${itemWeatherInfo.icon}"></i> ${itemWeatherInfo.desc}</div>
                    <div class="text-end">
                        <span class="fw-bold">${t}°C</span>
                        <small class="d-block text-muted">${hu}% | ${ws} km/j</small>
                    </div>
                </li>
            `;
        }
        forecastListHtml += '</ul>';

        const cardHtml = `
            <div class="col-11 col-md-9 col-lg-7">
                <div class="card weather-card">
                    <div class="card-header text-center fs-5 fw-bold">${lokasi.kecamatan}, ${lokasi.kotkab}</div>
                    <div class="card-body p-3 text-center">
                        <i class="bi ${weatherInfo.icon} weather-icon"></i>
                        <h2 class="card-title display-4 fw-bold">${prakiraanSaatIni.t}°C</h2>
                        <h5 class="fw-normal mb-3">${weatherInfo.desc}</h5>
                    </div>
                    <h6 class="card-subtitle mb-2 text-muted text-center">Prakiraan Sepanjang Hari</h6>
                    ${forecastListHtml}
                </div>
            </div>`;
        
        weatherContainer.innerHTML = cardHtml;
    }
    
    function showError(message) {
        weatherContainer.innerHTML = `<div class="col-12"><div class="alert alert-warning text-center" role="alert">${message}</div></div>`;
    }

    // Panggil fungsi inisialisasi, yang sekarang bekerja secara offline
    initialize();
});
