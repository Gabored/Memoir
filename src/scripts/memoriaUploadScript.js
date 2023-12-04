

$(document).ready(function() {
    $(function(){
        const $form = $('#crear-memoria-form');
        const $button = $('.submiter');
        let archivosSeleccionados = [];
     
        function handleFileChange(e) {
            console.log('Archivo seleccionado', this.files[0]);
            const file = this.files[0];
            const exists = archivosSeleccionados.some(archivo => archivo.name === file.name && archivo.size === file.size && archivo.lastModified === file.lastModified);
            if (!exists) {
                archivosSeleccionados.push(file);
                $button.prop('disabled', false);
            }
        }    
     
        $form.on('change', '#file-input', handleFileChange);
     
        $('#addMore').click(function() {
            const $newInput = $('<input type="file" name="foto">');
            $newInput.change(handleFileChange);
            $('#fileInputsContainer').append($newInput);
        });
     
        $form.on('submit', (e) => {
    
    
            e.preventDefault();
    
            // Obtener los checkboxes marcados dentro del formulario
            const checkboxes = $('.hashtags-container input[type="checkbox"]:checked');
    
            // Array para almacenar los textos de los labels seleccionados
            const hashtagsSeleccionados = [];
    
            // Recorrer los checkboxes marcados y obtener el texto del label asociado
            checkboxes.each(function() {
                console.log("entré")
                const labelText = $(this).parent().text().trim(); // Obtener el texto del label asociado al checkbox
                hashtagsSeleccionados.push(labelText); // Agregar el texto a tu array
            });
    
            // hashtagsSeleccionados ahora contendrá los textos de los labels seleccionados
            console.log('Hashtags seleccionados:', hashtagsSeleccionados);
            
            if(archivosSeleccionados.length > 0){
                const form = new FormData();
                archivosSeleccionados.forEach((archivo) => {
                    form.append('foto', archivo);
                });
    
                userID = localStorage.getItem('userId');
                console.log(userID);
    
    
                $.ajax({
                    url: 'http://localhost:5001/upload',
                    type: 'POST',
                    mimeType: 'multipart/form-data',
                    processData: false,
                    contentType: false,
                    data: form,
                    success: () => {
                        alert('Se subieron los archivos correctamente');
                        archivosSeleccionados = [];
                    },
                    error: () => {
                        alert('Algo salió mal');
                    }
                });
    
                $.ajax({
                    url: 'http://localhost:5001/memorias', 
                    type: 'GET',
                    success: function(response) {
                        // Aquí response contendrá la lista de memorias
                        const longitudMemorias = response.length; // Obtener la longitud de la lista
                        console.log('Longitud de la lista de memorias:', longitudMemorias);
            
            
                        $.ajax({
                            url: 'http://localhost:5001/medias', 
                            type: 'GET',
                            success: function(mediaList) {
                                // Aquí response contendrá la lista de medias
                                const mediaSubida = mediaList[longitudMemorias]; 
                                console.log('media Subida:', mediaSubida);
                                

                                
                                $.ajax({
                                    url: 'http://localhost:5001/hashtags/',
                                    type: 'GET',
                                    mimeType: 'multipart/form-data',
                                    processData: false,
                                    contentType: false,
                                    data: form,
                                    success: () => {
                                        alert('Se subieron los archivos correctamente');
                                        archivosSeleccionados = [];
                                    },
                                    error: () => {
                                        alert('Algo salió mal');
                                    }
                                });
                    

    
                                    // Crear objeto de Memoria con los datos recolectados
                                    const nuevaMemoria = {
                                    user: userID,  // Asignar el ID del usuario correspondiente
                                    title: $form.find('#titulo').val(),
                                    body: $form.find('#descripcion').val(),
                                    hashtag: hashtagsSeleccionados, // Array con los _id de los hashtags
                                    media: mediaSubida._id // Array con los _id de los medias
                                };
                    
                                console.log(nuevaMemoria);
                            },
                            error: function(xhr, status, error) {
                                console.error('Error al obtener la lista de memorias:', error);
                            }
                        });
            
                       
            
                    },
                    error: function(xhr, status, error) {
                        console.error('Error al obtener la lista de memorias:', error);
                    }
                });
    
            } else {
                alert('No has seleccionado ningún archivo');
            }
        });
    });

});