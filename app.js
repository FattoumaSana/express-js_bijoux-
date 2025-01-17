const express = require('express');
const path = require('path');
const app = express();
const port = 3000;

// Configuration du moteur de template (EJS)
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Middleware pour servir les fichiers statiques
app.use(express.static(path.join(__dirname, 'public')));

app.use((req, res, next) => {
    const now = new Date();
  
    // Obtenez le jour de la semaine (0 = dimanche, 1 = lundi, ..., 6 = samedi)
    const dayOfWeek = now.getDay();
  
    // Obtenez l'heure actuelle
    const hour = now.getHours();
  
    // Vérifiez si c'est un jour ouvrable (lundi à vendredi) et dans les heures de travail (9h à 17h)
    if (dayOfWeek >= 1 && dayOfWeek <= 5 && hour >= 9 && hour < 17) {
      console.log("here")
      next(); // Continuez la chaîne de middleware
    } else {
      console.log("here2")
      res.send('L\'application n\'est accessible que du lundi au vendredi, de 9h à 17h.');
    }
  });
  

// Routes
app.get('/', (req, res) => {
    res.render('index', { title: 'Accueil' });
});

app.get('/collections', (req, res) => {
    res.render('collections', { title: 'Nos collections' });
});

app.get('/product/:id', (req, res) => {
    const productId = req.params.id;
    res.render('product', { title: `Produit ${productId}`, productId });
});

app.get('/customize', (req, res) => {
    res.render('customize', { title: 'Personnaliser votre bijou' });
});

app.get('/cart', (req, res) => {
    res.render('cart', { title: 'Panier' });
});

app.get('/contact', (req, res) => {
    res.render('contact', { title: 'Contact' });
});

// Démarrage du serveur
app.listen(port, () => {
    console.log(`Serveur démarré sur http://localhost:${port}`);
});