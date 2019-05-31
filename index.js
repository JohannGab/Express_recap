const express = require('express');
const app = express();
const port = 3000;
const connection = require('./conf');
const bodyParser = require('body-parser');
const morgan = require('morgan')


// Support JSON-encoded bodies
app.use(bodyParser.json());
// Support URL-encoded bodies
app.use(bodyParser.urlencoded({
  extended: true
}));

app.use(morgan("dev"))
app.use(morgan(":method :url :status :res[content-length] - :response-time "))


app.get('/', (request, response) => {
  response.send("Bienvenue !");
});



app.get('/api/sport', (req, res) => {
    connection.query('SELECT * FROM sport', (err, results) => {
        if (err) {
          console.log(err)
            res.status(500).send('Erreur lors de la récupération de sport');
          } else {
            res.json(results);
          }
      });
  });


//   GET (light) - Récupération de quelques champs spécifiques (id, names, dates, etc...)

  app.get('/api/sport2', (req, res) => {
    connection.query('SELECT activity, date_activity, equipment FROM sport', (err, results) => {
        if (err) {
          console.log(err)
            res.status(500).send('Erreur lors de la récupération de sport');
          } else {
            res.json(results);
          }
      });
  });


//   Un filtre "contient ..." (ex: nom contenant la chaîne de caractère 'at')

  app.get('/api/sport3', (req, res) => {
    connection.query("SELECT activity FROM sport WHERE activity LIKE '%at%'", (err, results) => {
        if (err) {
          console.log(err)
            res.status(500).send('Erreur lors de la récupération de sport');
          } else {
            res.json(results);
          }
      });
  });


//   Un filtre "commence par ..." (ex: nom commençant par 'vélo')

  app.get('/api/sport4', (req, res) => {
    connection.query("SELECT activity FROM sport WHERE activity LIKE 'Vélo%'", (err, results) => {
        if (err) {
          console.log(err)
            res.status(500).send('Erreur lors de la récupération de sport');
          } else {
            res.json(results);
          }
      });
  });

//   Un filtre "supérieur à ..." (ex: date supérieure à 18/10/2010)

  app.get('/api/sport5', (req, res) => {
    connection.query("SELECT date_activity FROM sport WHERE date_activity >= '2010/10/10'", (err, results) => {
        if (err) {
          console.log(err)
            res.status(500).send('Erreur lors de la récupération de sport');
          } else {
            res.json(results);
          }
      });
  });

//   GET - Récupération de données ordonnées (ascendant, descendant)

app.get('/api/sport6/:order', (req, res) => {
  const idProfil = req.params.order
          connection.query(`Select activity from sport order by activity ${idProfil}`, (err, results) => {
          if (err) {
              res.status(500).send('Erreur lors de l\'affichage du prénom par ordre ascendant')
          } else {
              res.json(results)
          }
      })
  }
)


// Sauvegarde d'une nouvelle entité

  app.post('/api/post', (req, res) => {
    // récupération des données envoyées
    const formData = req.body;
    // connexion à la base de données, et insertion des données
    connection.query('INSERT INTO sport SET ?', formData, (err, results) => {
        if (err) {
            // Si une erreur est survenue, alors on informe l'utilisateur de l'erreur
            console.log(err);
            res.status(500).send('Erreur lors de la sauvegarde sport');
        } else {
            // Si tout s'est bien passé, on envoie un statut "ok".
            res.sendStatus(200);
        }
    })
 });

//  Modification d'une entité

app.put('/api/update/:id', (req, res) => {
  // récupération des données envoyées
  const idProfil = req.params.id;
  const formData = req.body;
  // connection à la base de données, et modification de sport
  connection.query('UPDATE sport SET ? WHERE id_sport = ?', [formData, idProfil], err => {
      if (err) {
          // Si une erreur est survenue, alors on informe l'utilisateur de l'erreur
          console.log(err);
          res.status(500).send("Erreur lors de la modification de sport");
      } else {
          // Si tout s'est bien passé, on envoie un statut "ok".
          res.sendStatus(200);
      }
  });
});
  
// 9 - Toggle du booléen ( modification du booléens registerd_newsletters de 0 à 1 )

app.put('/api/updatebool/:id', (req, res) => {
  // récupération des données sport
  const idProfil = req.params.id;
  const formData = req.body;
  // connection à la base de données, et modification de sport
  connection.query('UPDATE sport SET ? WHERE id_sport = ?', [formData, idProfil], err => {
      if (err) {
          // Si une erreur est survenue, alors on informe l'utilisateur de l'erreur
          console.log(err);
          res.status(500).send("Erreur lors de la modification d'un employé");
      } else {
          // Si tout s'est bien passé, on envoie un statut "ok".
          res.sendStatus(200);
      }
  });
});

// 10 - Suppression d'une données via DELETE

app.delete('/api/delete/:id', (req, res) => {
  // récupération des données sport
  const idProfil = req.params.id;
  // connexion à la base de données, et suppression de l'employé
  connection.query('DELETE FROM sport WHERE id_sport = ?', [idProfil], err => {
      if (err) {
          // Si une erreur est survenue, alors on informe l'utilisateur de l'erreur
          console.log(err);
          res.status(500).send("Erreur lors de la suppression de sport");
      } else {
          // Si tout s'est bien passé, on envoie un statut "ok".
          res.sendStatus(200);
      }
  });
});

// 11 - Suppression de toutes les entités dont le booléen est false

app.delete('/api/deletebool/', (req, res) => {
  // récupération des données envoyées
  const idProfil = req.params.id;
  // connexion à la base de données, et suppression de sport
  connection.query('DELETE FROM sport WHERE equipment = 0',err => {
      if (err) {
          // Si une erreur est survenue, alors on informe l'utilisateur de l'erreur
          console.log(err);
          res.status(500).send("Erreur lors de la suppression de sport");
      } else {
          // Si tout s'est bien passé, on envoie un statut "ok".
          res.sendStatus(200);
      }
  });
});




app.listen(port, (err) => {
    if (err) {
      throw new Error('Something bad happened...');
    }
  
    console.log(`Server is listening on ${port}`);
  });