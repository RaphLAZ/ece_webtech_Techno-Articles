import fs from 'fs';

export default function handler(req, res) {
    const { name, email, message } = req.body;

    // Create an object with the data
    const data = { name, email, message };

    // Write the data to a file
    fs.appendFile('./data/contact.json', JSON.stringify(data) + '\n', (err) => {
        if (err) {
            console.error(err);
            res.status(500).send('Error writing to file');
        } else {
            res.status(200).send('Data written to file');
        }
    });
}
