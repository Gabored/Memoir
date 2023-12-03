$(function () {
    // Función para obtener el ID del usuario
    function obtenerUserId() {
        return localStorage.getItem('userId');
    }

    // Función para cargar la información del usuario
    function cargarUserInfo() {
        $.ajax({
            url: 'http://localhost:5001/user-info',
            type: 'GET',
            dataType: 'json',
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            },
            success: function (data) {
                mostrarUserInfo(data);
                configurarEventos();
            }
        });
    }

    // Función para mostrar la información del usuario
    function mostrarUserInfo(data) {
        var userInfoHtml = '<div><strong>Nombre:</strong> <span id="name">' + data.name + '</span></div>';
        userInfoHtml += '<div><strong>Apellido:</strong> <span id="surname">' + data.surname + '</span></div>';
        userInfoHtml += '<div><strong>Nombre de usuario:</strong> <span id="username">' + data.username + '</span></div>';
        userInfoHtml += '<div><strong>Email:</strong> <span id="email">' + data.email + '</span></div>';
        userInfoHtml += '<div><strong>Ubicación:</strong> <span id="location">' + data.location + '</span></div>';
        userInfoHtml += '<div><strong>Intereses:</strong> <span id="interests">' + data.interests + '</span></div>';

        $('#user-info-container').html(userInfoHtml);
    }

    // Función para configurar eventos
    function configurarEventos() {
        var isEditing = false;

        $('.edit-button').on('click', function () {
            if (!isEditing) {
                isEditing = true;
                habilitarEdicionCampos();
            }
        });

        $('.save-button').on('click', function () {
            var editedData = obtenerDatosEditados();
            guardarCambios(editedData);
        });

        $('.delete-button').on('click', function () {
            borrarCuenta();
        });

        $('.logout-button').on('click', function () {
            cerrarSesion();
        });
    }

    // Función para habilitar la edición de campos
    function habilitarEdicionCampos() {
        $('#name, #surname, #username, #email, #location, #interests').attr('contenteditable', true).css('border', '1px solid green');
        $('.save-button').show();
    }

    // Función para obtener los datos editados
    function obtenerDatosEditados() {
        return {
            name: $('#name').text(),
            surname: $('#surname').text(),
            username: $('#username').text(),
            email: $('#email').text(),
            location: $('#location').text(),
            interests: $('#interests').text(),
        };
    }

    // Función para guardar cambios
    function guardarCambios(editedData) {
        var userId = obtenerUserId();

        if (userId) {
            var url = 'http://localhost:5001/edit-account/' + userId;

            $.ajax({
                url: url,
                type: 'PUT',
                data: JSON.stringify(editedData),
                contentType: 'application/json',
                headers: {
                    'Authorization': 'Bearer ' + localStorage.getItem('token')
                },
                success: function (response) {
                    alert('Cambios guardados correctamente');
                },
                error: function (xhr, status, error) {
                    console.log(xhr);
                    console.log(status);
                    console.log(error);
                    alert('Error al guardar los cambios');
                }
            });
        } else {
            alert('El userId es nulo o indefinido');
        }
    }

    // Función para borrar cuenta
    function borrarCuenta() {
        var userId = obtenerUserId();
        if (confirm('¿Estás seguro de que quieres borrar tu cuenta?')) {
            $.ajax({
                url: 'http://localhost:5001/delete-account/' + userId,
                type: 'DELETE',
                headers: {
                    'Authorization': 'Bearer ' + localStorage.getItem('token')
                },
                success: function (response) {
                    alert('Cuenta eliminada correctamente');
                    window.location.href = 'login.html';
                },
                error: function (xhr, status, error) {
                    alert('Error al borrar la cuenta');
                }
            });
        }
    }

    // Función para cerrar sesión
    function cerrarSesion() {
        localStorage.removeItem('token');
        window.location.href = 'login.html';
    }

    // Inicializar la carga de información del usuario
    cargarUserInfo();
});
