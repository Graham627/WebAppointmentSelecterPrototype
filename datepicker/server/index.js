const express = require('express');
const app = express();
const port = 3000
const fs = require('fs');
//const cors = require('cors');

app.use(express.json());
app.use(express.urlencoded());
//app.use(cors());
//set cross origin permissions up!
app.get('/', (req, res) => {
    fs.readFile('data.csv', 'utf8', (err,data) => {
        const lines = data.trim().split('\n');
        const results = [];
        for (let i = 1; i < lines.length; i++) {
            const currentLine = lines[i].split(',');
            //const obj = {currentLine};
            //results.push(currentLine[0]);
            results.push(currentLine[1]);
            //results.push(currentLine);
            //optionally do this to set each appt in an array
        }
        console.log(results);
        res.set('Content-Type', 'text/plain');
        res.send(results);
    });

});


/*results[0].currentLine[0]
  results[0].currentLine[1]  
*/




app.post('/', (req, res) => {
    const name = req.body.name;
    const date = req.body.date;
    const csvString = `${name},${date}\n`
    fs.appendFile('data.csv', csvString, (err => console.log('(:')));
    res.send('Your appointment has been confirmed');
});

app.listen(port, () => {
    console.log(`Server listening at http://localhost:${port}`);
  });
