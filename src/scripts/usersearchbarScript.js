

// Fetch all users
function fetchUsers() {
    $.ajax({
        url: '/users', // Endpoint to fetch all users
        method: 'GET',
        dataType: 'json',
        success: function (users) {
            displayUsers(users);
        },
        error: function (error) {
            console.error('Error fetching users:', error);
        }
    });
}

// Search user by ID or Name
function searchUser(value) {
    $.ajax({
        url: `/users/${value}`, // Endpoint to get user by ID
        method: 'GET',
        dataType: 'json',
        success: function (user) {
            displayUsers([user]);
        },
        error: function (error) {
            console.error('Error searching user:', error);
        }
    });
}

// Display users in the table
function displayUsers(users) {
    const userTableBody = $('#userTable tbody');
    userTableBody.empty(); // Clear the existing content

    users.forEach(user => {
        const tableRow = $('<tr>');
        tableRow.append(`<td>${user.name}</td>`);
        tableRow.append(`<td>${user.surname}</td>`);
        tableRow.append(`<td>${user.username}</td>`);
        tableRow.append(`<td>${user.email}</td>`);
        tableRow.append(`<td>${user.location || ''}</td>`); // Add default empty string for optional fields
        tableRow.append(`<td>${user.interests}</td>`);
        tableRow.append(`<td>${user.role}</td>`);
        // Add more columns as needed based on your User Schema

        userTableBody.append(tableRow);
    });
}
