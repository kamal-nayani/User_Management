const fs = require('fs');
const express = require('express');
const path = require('path');

const app = express();
app.use(express.json());




// Add user through POST Method

app.post('/', (req, res) => {


    const newID = details[details.length - 1].id + 1;
    const newDetails = Object.assign({ id: newID }, req.body);

    details.push(newDetails);

    fs.writeFile(`${__dirname}/file/user1.json`, JSON.stringify(details), err => {
        res.status(201).json({

            status: 'success',
            data: {

                details: newDetails
            }
        });

    });



});

// Edit user's payload.

app.patch('/:id', (req, res) => {

    const id = req.params.id * 1;  // Convert the ID to a number
    const detail = details.find(el => el.id === id);

    if (id > detail.length) {

        return res.status(404).json({
            status: 'fail',
            message: 'Invalid ID'

        });
    }

    res.status(200).json({
        status: 'success',
        data: {

            details: '<Updated details here...>'
        }

    });
});

// Get all user's and their details:

const details = JSON.parse(fs.readFileSync(`${__dirname}/file/user1.json`));


app.get('/', (req, res) => {
    res.status(200).json({
        status: 'success',
        results: details.length,
        data: {
            details
        }
    });
});

// Get user by ID, name and email details

app.get('/:searchValue', (req, res) => {

    const searchValue = req.params.searchValue.toLowerCase();
    console.log('Search Value is ' + searchValue);





    const detail = details.find(el =>
        el.id === parseInt(searchValue, 10) ||
        (el.email && el.email.toLowerCase() === searchValue) ||
        (el.first_name && el.first_name.toLowerCase() === searchValue) ||
        (el.last_name && el.last_name.toLowerCase() === searchValue)
    );

    console.log('Detail is ', detail);


    if (!detail) {

        return res.status(404).json({
            status: 'fail',
            message: 'Invalid ID'

        });
    }



    res.status(200).json({
        status: 'success',
        // results: details.length,
        data: {
            detail
        }
    });
});



// Delete a user by ID


app.delete('/:id', (req, res) => {

    const id = parseInt(req.params.id, 10);
    const detail = details.find(el => el.id === id);

    if (!detail) {

        return res.status(404).json({
            status: 'fail',
            message: 'Invalid ID'

        });
    }

    details.splice(detail, 1);

    fs.writeFile(`${__dirname}/file/user1.json`, JSON.stringify(details), err => {
        if (err) {
            return res.status(500).json({
                status: 'error',
                message: 'Failed to delete the record from file'
            });
        }

        res.status(204).json({
            status: 'success',
            data: null

        });
    });

});


const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on port: http://localhost:${PORT}`));
