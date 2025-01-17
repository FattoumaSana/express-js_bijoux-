document.addEventListener('DOMContentLoaded', function () {
    // Dark Mode
    const themeToggle = document.getElementById('theme-toggle');
    const themeIcon = document.getElementById('theme-icon');
    const body = document.body;

    // Vérifier le mode stocké dans le localStorage
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        body.setAttribute('data-theme', 'dark');
        themeIcon.textContent = '🌞'; // Icône pour le light mode
    } else {
        body.setAttribute('data-theme', 'light');
        themeIcon.textContent = '🌙'; // Icône pour le dark mode
    }

    // Basculer entre les modes
    themeToggle.addEventListener('click', function () {
        if (body.getAttribute('data-theme') === 'dark') {
            body.setAttribute('data-theme', 'light');
            localStorage.setItem('theme', 'light');
            themeIcon.textContent = '🌙'; // Icône pour le dark mode
        } else {
            body.setAttribute('data-theme', 'dark');
            localStorage.setItem('theme', 'dark');
            themeIcon.textContent = '🌞'; // Icône pour le light mode
        }
    });

    // Musique de fond
    const musicToggle = document.getElementById('music-toggle');
    const volumeSlider = document.getElementById('volume-slider');
    const audio = new Audio('/audio/ScottBuckley-Sleep.mp3');
    audio.loop = true; // Pour que la musique se répète

    // Récupérer l'état de la musique depuis localStorage
    const isMusicEnabled = localStorage.getItem('musicEnabled') === 'true';

    // Démarrer ou mettre en pause la musique en fonction de l'état sauvegardé
    if (isMusicEnabled) {
        audio.play();
        musicToggle.innerHTML = '<span class="icon"><i class="fas fa-volume-up"></i></span>';
    } else {
        audio.pause();
        musicToggle.innerHTML = '<span class="icon"><i class="fas fa-volume-mute"></i></span>';
    }

    // Basculer entre play/pause lors du clic sur l'icône musique
    musicToggle.addEventListener('click', function () {
        if (audio.paused) {
            audio.play();
            musicToggle.innerHTML = '<span class="icon"><i class="fas fa-volume-up"></i></span>';
            localStorage.setItem('musicEnabled', 'true'); // Sauvegarder l'état
        } else {
            audio.pause();
            musicToggle.innerHTML = '<span class="icon"><i class="fas fa-volume-mute"></i></span>';
            localStorage.setItem('musicEnabled', 'false'); // Sauvegarder l'état
        }
    });

    // Gérer la barre de volume
    volumeSlider.addEventListener('input', function () {
        audio.volume = volumeSlider.value;
        updateVolumeIcon(audio.volume);
    });

    // Mettre à jour l'icône en fonction du volume
    function updateVolumeIcon(volume) {
        if (volume === 0) {
            musicToggle.innerHTML = '<span class="icon"><i class="fas fa-volume-mute"></i></span>';
        } else if (volume <= 0.5) {
            musicToggle.innerHTML = '<span class="icon"><i class="fas fa-volume-down"></i></span>';
        } else {
            musicToggle.innerHTML = '<span class="icon"><i class="fas fa-volume-up"></i></span>';
        }
    }
});
/*middleware heur */
const express = require('express');
const app = express();

// Middleware pour vérifier les heures de travail
app.use((req, res, next) => {
  const now = new Date();

  // Obtenez le jour de la semaine (0 = dimanche, 1 = lundi, ..., 6 = samedi)
  const dayOfWeek = now.getDay();

  // Obtenez l'heure actuelle
  const hour = now.getHours();

  // Vérifiez si c'est un jour ouvrable (lundi à vendredi) et dans les heures de travail (9h à 17h)
  if (dayOfWeek >= 1 && dayOfWeek <= 5 && hour >= 9 && hour < 11) {
    console.log("here")
    next(); // Continuez la chaîne de middleware
  } else {
    console.log("here2")
    res.send('L\'application n\'est accessible que du lundi au vendredi, de 9h à 17h.');
  }
});

// Route principale
app.get('/', (req, res) => {
  res.send('Bienvenue dans l\'application ! Vous êtes dans les heures de travail.');
});

// Démarrage du serveur
app.listen(3000, () => {
  console.log('Serveur démarré sur http://localhost:3000');
});
