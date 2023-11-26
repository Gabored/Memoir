$.ajax({
    url: 'http://localhost:5001/users',
    type: 'GET',
    success: (data) => {
        console.log('Usuarios: ', data);
        // Aquí puedes procesar y mostrar los datos de los usuarios como desees
    },
    error: () => {
        console.error('Error al obtener la lista de usuarios');
    }
});