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
     
        $form.on('submit', async (e) => {
            e.preventDefault();

            const checkboxes = $('.hashtags-container input[type="checkbox"]:checked');
            const hashtagsSeleccionados = checkboxes.map(function() {
                return $(this).parent().text().trim();
            }).get();

            console.log('Hashtags seleccionados:', hashtagsSeleccionados);
            
            if (archivosSeleccionados.length > 0) {
                const form = new FormData();
                archivosSeleccionados.forEach((archivo) => {
                    form.append('foto', archivo);
                });
    
                const userID = localStorage.getItem('userId');
                console.log(userID);
    
                try {
                    const uploadResponse = await $.ajax({
                        url: 'http://localhost:5001/upload',
                        type: 'POST',
                        mimeType: 'multipart/form-data',
                        processData: false,
                        contentType: false,
                        data: form
                    });
    
                    console.log('Se subieron los archivos correctamente');
                    archivosSeleccionados = [];

                    const response = await $.ajax({
                        url: 'http://localhost:5001/memorias',
                        type: 'GET'
                    });

                    const longitudMemorias = response.length;
                    console.log('Longitud de la lista de memorias:', longitudMemorias);

                    const mediaList = await $.ajax({
                        url: 'http://localhost:5001/medias',
                        type: 'GET'
                    });

                    const mediaSubida = mediaList[longitudMemorias];
                    console.log('media Subida:', mediaSubida);

                    const idComments = [];

                    for (const seleccionado of hashtagsSeleccionados) {
                        console.log("seleccionado : " + seleccionado);

                        try {
                            const hashtagData = await $.ajax({
                                url: `http://localhost:5001/hashtags/search/${seleccionado}`,
                                type: 'GET'
                            });

                            console.log("obtained Hashttag : ", hashtagData);
                            idComments.push(hashtagData._id);
                        } catch (error) {
                            alert('Algo salió mal recuperando los hashtags');
                        }
                    }

                    const promises = [];

                    for (const seleccionado in hashtagsSeleccionados) {
                        const hashtag = hashtagsSeleccionados[seleccionado];
                        const promise = new Promise((resolve, reject) => {
                            $.ajax({
                                url: `http://localhost:5001/hashtags/search/${hashtag}`,
                                type: 'GET',
                                success: (hashtagData) => {
                                    console.log("Hashtag obtenido:", hashtagData);
                                    resolve(hashtagData[0]._id);
                                },
                                error: () => {
                                    console.error('Error obteniendo los hashtags');
                                    reject();
                                }
                            });
                        });
                        promises.push(promise);
                    }

                    let nuevaMemoriaJSON ;
                            

                    Promise.all(promises)
                        .then((ids) => {
                            console.log('IDs de los hashtags:', ids);
                       

                            // Crear objeto de Memoria con los datos recolectados
                            const nuevaMemoria = {
                                user: "6563983db13a3cbac2335143",
                                title: $form.find('input[name="titulo"]').val(),
                                body: $form.find('input[name="descripcion"]').val(),
                                hashtag: ids,
                                media: mediaSubida._id
                            };

                            nuevaMemoriaJSON = JSON.stringify(nuevaMemoria);
                            console.log(nuevaMemoriaJSON)
                            

                            const memoriaResponse = $.ajax({
                                url: 'http://localhost:5001/memorias',
                                type: 'POST',
                                data: nuevaMemoriaJSON,
                                dataType: 'json'
                            });
                })
                .catch((error) => {
                    console.error('Error al obtener los IDs de los hashtags:', error);
                    // Manejar el error apropiadamente
                });

                    alert('Memoria creada exitosamente');
                } catch (error) {
                    console.error('Error en la creación de memoria:', error);
                }
            } else {
                alert('No has seleccionado ningún archivo');
            }
        });
    });
});
