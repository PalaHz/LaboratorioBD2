const express = require('express');
const router = express.Router();
const pool = require('../database');
const converter = require("json-2-csv");

router.get('/', (req, res) => {
    res.render('links/home')
});

router.get('/afectados', (req, res) => {
    pool.query('select * from afectado', (err, results) => {
        if (err) {
            res.status(400).send(err);
          } else {
            res.send(results);
          }
    });
});

router.get("/afectadosCSV", (req, res) => {
    pool.query("select * from afectado", (err, results) => {
      if (err) {
        res.status(400).send(err);
      } else {
          let json2csvCallback = (err, csv) => {
              if (err) throw err;
              res.attachment('afectados.csv');
              res.send(csv);
          };
          converter.json2csv(results, json2csvCallback);
      }
    });
  });

  router.get('/empleadores', (req, res) => {
    pool.query('select * from empleador', (err, results) => {
        if (err) {
            res.status(400).send(err);
          } else {
            res.send(results);
          }
    });
});

router.get("/empleadoresCSV", (req, res) => {
    pool.query("select * from empleador", (err, results) => {
      if (err) {
        res.status(400).send(err);
      } else {
          let json2csvCallback = (err, csv) => {
              if (err) throw err;
              res.attachment('empleadores.csv');
              res.send(csv);
          };
          converter.json2csv(results, json2csvCallback);
      }
    });
  });

  router.get('/profesiones', (req, res) => {
    pool.query('select * from profesion', (err, results) => {
        if (err) {
            res.status(400).send(err);
          } else {
            res.send(results);
          }
    });
});

router.get("/profesionesCSV", (req, res) => {
    pool.query("select * from profesion", (err, results) => {
      if (err) {
        res.status(400).send(err);
      } else {
          let json2csvCallback = (err, csv) => {
              if (err) throw err;
              res.attachment('profesiones.csv');
              res.send(csv);
          };
          converter.json2csv(results, json2csvCallback);
      }
    });
  });



module.exports = router;