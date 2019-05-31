const  mysql = require('mysql');
const  connection = mysql.createConnection({
host : 'localhost', // adresse du serveur
user : 'root', // le nom d'utilisateur
password : '******', // le mot de passe
database : 'atelier_fil_rouge', // le nom de la base de donnée
});

connection.connect(err => {
    if (err) throw err
    console.log('connected !')
})

module.exports = connection;