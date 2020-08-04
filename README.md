# Laboratorio 2.2 Base de Datos Avanzada
### Grupo: Triple P
## Integrantes
* Bryan Pilco
* Andres Palacios
* Paul Sanchez
# Esquema de base de datos
![esquema base de datos](https://github.com/PalaHz/LaboratorioBD2/blob/master/esquema.PNG)
# Código
Para el desarrollo de esta API se ha trabajado con JavaScript con el framework Node.js donde tenemos las funciones principales para la conexión y desarrollo del laboratorio y además con HTML y express-handlebars para el desarrollo de la interfaz y poder descargar los archivos.
Para la conversión del resultado de la petición a la base de datos de JSON a CSV se usó un módulo de uso libre llamado json-2-csv.
El proyecto sigue la estructura estandar para Node.js y express, se divide la parte del codigo principal cen index.js, la conexión a la base datos dentro de datbse.js y keys.js, el desarrollo de la interfaz en la carpeta views con main.js y home.js y el manejo de las rutas para las peticiones en la carpeta routes con links.js.
# Petición para obtener la información de la base de datos
``` javascript
router.get('/afectados', (req, res) => {
    pool.query('select * from afectado', (err, results) => {
        if (err) {
            res.status(400).send(err);
          } else {
            res.send(results);
          }
    });
});
```
# Petición para obtener la información de la base de datos y convertirla a CSV
``` javascript
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
```
# Funciones para llamar la petición y descargar la información en formato JSON
``` javascript
async function getAfectados() {
        await fetch("http://localhost:4000/afectados")
            .then((response) => {
                return response.json();
            })
            .then((myJson) => {
                console.log(myJson, 'hola');
                var filename = "afectados.json";
                var contentType = "application/json;charset=utf-8;";
                if (window.navigator && window.navigator.msSaveOrOpenBlob) {
                    var blob = new Blob(
                        [
                            decodeURIComponent(
                                encodeURI(JSON.stringify(myJson, null, "\t"))
                            ),
                        ],
                        { type: contentType }
                    );
                    navigator.msSaveOrOpenBlob(blob, filename);
                } else {
                    var a = document.createElement("a");
                    a.download = filename;
                    a.href =
                        "data:" +
                        contentType +
                        "," +
                        encodeURIComponent(JSON.stringify(myJson));
                    a.target = "_blank";
                    document.body.appendChild(a);
                    a.click();
                    document.body.removeChild(a);
                }
            });
    }
```
# Funciones para llamar la petición y descargar la información en formato CSV
``` javascript
function getAfectadosCSV() {
        window.location = "http://localhost:4000/afectadosCSV";
    }
```
# Interfaz del usuario para la descarga
![interfaz para la descarga](https://github.com/PalaHz/LaboratorioBD2/blob/master/GUI.PNG)
