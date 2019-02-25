const { Pool, Client } = require("pg")
const express = require("express");
const app = express();
const port = process.env.PORT || 5000;
var connectionString = process.env.DATABASE_URL || "postgres://localhost:5432/db";
var connectionStringHeroku = process.env.DATABASE_URL || "postgres://iyfbpmdpiblcls:39f6d08f6098d31c4cbfb2ec97f0aec372fdf038c8d53cde63cb1c067eec919f@ec2-107-20-167-11.compute-1.amazonaws.com:5432/d8fv847motp261";
// const client = new Client(connectionStringHeroku);


const client = new Client({
    database: "d8fv847motp261",
    host: "ec2-107-20-167-11.compute-1.amazonaws.com",
    port: 5432,
    user: "iyfbpmdpiblcls",
    password: "39f6d08f6098d31c4cbfb2ec97f0aec372fdf038c8d53cde63cb1c067eec919f",
    ssl: "require"
});
// const clientLocal = new Client({
//     database: "postgres",
//     // host:"ec2-23-23-245-89.compute-1.amazonaws.agregarcom",
//     port: 5432,
//     user: "postgres",
//     password: "nobulto123",
//     // ssl: "require"
// });

client.connect((err) => {
    console.log("Error conectando a la db: " + err)
})
// clientLocal.connect((err) => {
//     console.log("Error conectando a la dbLocal: " + err)
// })

// client.query("DELETE FROM INDOTEL");

// client.query("CREATE TABLE IF NOT EXISTS INDOTEL(ID SMALLINT, PROVEEDOR TEXT, TIPO TEXT, NPA SMALLINT, NXX SMALLINT, LOCALIDAD TEXT)", (req, res) => {
//     clientLocal.query("SELECT * FROM INDOTEL", (req, result) => {
//         result.rows.map((v, i) => {
//             client.query(`INSERT INTO INDOTEL VALUES(${v.id}, '${v.proveedor}', '${v.tipo}', ${v.npa}, ${v.nxx}, '${v.localidad}')`);
//         })
//     })
// });

app.get("/data", (req, res) => {
    client.query("SELECT * FROM Indotel", (req, result) => {
        res.send(result.rows)
    })
})

app.listen(port, () => console.log("Listen on port: " + port))