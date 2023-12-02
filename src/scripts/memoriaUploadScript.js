$(function(){
    const $form = $('form').eq(0);
    const $button = $('#submit1').first();

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

    $form.on('change', 'input[name="foto"]', handleFileChange);

    $('#addMore').click(function() {
        const $newInput = $('<input type="file" name="foto">');
        $newInput.change(handleFileChange);
        $('#fileInputsContainer').append($newInput);
    });

    $form.on('submit', (e) => {
        e.preventDefault();

        if(archivosSeleccionados.length > 0){
            const form = new FormData();
            archivosSeleccionados.forEach((archivo) => {
                form.append('foto', archivo);
            });

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

        } else {
            alert('No has seleccionado ningún archivo');
        }
    });
});
