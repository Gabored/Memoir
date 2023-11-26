$(function(){
    const $form = $('form').eq(0);
    const $button = $('#submit1').first();
    const fileInput = $('input[name="archivo"]')[0];

    let archivoSeleccionado = null;
    
    // Función para verificar si ya seleccione un archivo
    fileInput.addEventListener('change', (e) => {
        console.log('Archivo seleccionado', fileInput.files[0]);
        archivoSeleccionado = fileInput.files[0];
        $button.prop('disabled', false);
    });

    $form.on('submit', (e) => {
        e.preventDefault();

        if(archivoSeleccionado){
            const form = new FormData();
            form.append('archivo', archivoSeleccionado);

            $.ajax({
                url: 'http://localhost:5001/upload',
                type: 'POST',
                mimeType: 'multipart/form-data',
                processData: false,
                contentType: false,
                data: form,
                success: () => {
                    alert('Se subió el archivo correctamente');
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