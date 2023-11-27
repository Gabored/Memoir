document.addEventListener('DOMContentLoaded', () => {
    const commentsListDiv = document.getElementById('comments-list');
    const createCommentForm = document.getElementById('create-comment-form');

    // Función para cargar todos los comentarios
    const loadComments = () => {
        fetch('/comments') // Utiliza la ruta definida en tu servidor para listar comentarios
            .then(response => response.json())
            .then(comments => {
                commentsListDiv.innerHTML = ''; // Limpia el div antes de cargar los comentarios

                comments.forEach(comment => {
                    const commentDiv = document.createElement('div');
                    commentDiv.innerHTML = `
                        <p><strong>${comment.writer_user}</strong></p>
                        <p>${comment.body}</p>
                        <hr>
                    `;
                    commentsListDiv.appendChild(commentDiv);
                });
            })
            .catch(error => console.error('Error fetching comments:', error));
    };

    // Cargar los comentarios al cargar la página
    loadComments();

    // Evento de envío del formulario para crear un comentario
    createCommentForm.addEventListener('submit', event => {
        event.preventDefault();

        const formData = new FormData(createCommentForm);
        const newComment = Object.fromEntries(formData.entries());

        fetch('/comments', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newComment)
        })
        .then(response => response.json())
        .then(() => {
            // Después de crear el comentario, cargar la lista actualizada
            loadComments();
            createCommentForm.reset();
        })
        .catch(error => console.error('Error creating comment:', error));
    });
});
