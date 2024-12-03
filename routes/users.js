const fs = require('fs');
const express = require('express');
const { v4: uuidv4 } = require('uuid');
const router = express.Router();

// Mock database

const users = [
    {

        first_name: 'John',
        last_name: 'Doe',
        email: 'johndoe@example.com',
    },
    {

        first_name: 'Alice',
        last_name: 'Smith',
        email: 'alicesmith@example.com',
    },
];

// Getting the list of users from the mock database
router.get('/', (req, res) => {
    res.status(200).json(users);
});
// Getting the list of users from the mock database
router.get('/', (req, res) => {
    res.send(users);
})

// router.put('/users', (req, res) => {
//     const { first_name } = req.params;
//     const { last_name, email } = req.body;

//     const user = users.find((u) => u.first_name === first_name);

//     if (!user) {
//         return res.status(404).json({ message: 'User not found!' });
//     }

//     user.first_name = first_name || user.first_name;
//     user.last_name = last_name || user.last_name;
//     user.email = email || user.email;

//     res.status(200).json({ message: 'User updated successfully', user });
// });

// router.put('/users/:first_name', (req, res) => {
//     const { first_name } = req.params;  // Get first_name from URL params
//     const { last_name, email } = req.body;  // Get last_name and email from the request body

//     // Find the user by first_name
//     const user = users.find((u) => u.first_name === first_name);

//     if (!user) {
//         // If the user isn't found, send a 404 error
//         return res.status(404).json({ message: 'User not found!' });
//     }

//     // Update the user information if provided, otherwise keep the current values
//     user.first_name = first_name || user.first_name;  // first_name comes from URL, so it's unlikely to change
//     user.last_name = last_name || user.last_name;  // Update last_name if provided
//     user.email = email || user.email;  // Update email if provided

//     // Send a success response with the updated user
//     res.status(200).json({ message: 'User updated successfully', user });
// });



router.post('/', (req, res) => {
    const user = req.body;

    users.push({ ...user, id: uuidv4() });

    res.send(`${user.first_name} has been added to the Database`);
})

router.get('/:id', (req, res) => {
    const { id } = req.params;

    const foundUser = users.find((user) => user.id === id)

    res.send(foundUser)
});


router.delete('/:id', (req, res) => {
    const { id } = req.params;

    users = users.filter((user) => user.id !== id)

    res.send(`${id} deleted successfully from database`);
});

module.exports = router;