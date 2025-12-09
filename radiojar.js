// ====== QuLo5 Station ID ======
const stationID = 'dk8hw12e7wcwv';

// Elementti, johon tracklist renderöidään
const tracklistContainer = document.getElementById('tracklist');

// Hakee tracklistin Radiojarista
async function fetchTracklist() {
  try {
    const response = await fetch(`https://www.radiojar.com/stations/${stationID}/tracks.json`);
    if (!response.ok) throw new Error('Failed to fetch tracklist');
    const data = await response.json();
    renderTracklist(data.tracks);
  } catch (error) {
    tracklistContainer.innerHTML = `<p style="color:red;">Error loading tracklist: ${error.message}</p>`;
  }
}

// Renderöi tracklistin HTML:ään
function renderTracklist(tracks) {
  if (!tracks || tracks.length === 0) {
    tracklistContainer.innerHTML = '<p>Tracklist will appear here.</p>';
    return;
  }

  const list = document.createElement('ul');

  tracks.forEach(track => {
    const li = document.createElement('li');
    li.innerHTML = `<strong>${track.artist || 'Unknown'}</strong> — <em>${track.title || ''}</em> <span>(CC BY)</span>`;
    list.appendChild(li);
  });

  tracklistContainer.innerHTML = '';
  tracklistContainer.appendChild(list);
}

// Päivittää tracklistin heti ja 30 sekunnin välein
fetchTracklist();
setInterval(fetchTracklist, 30000);
