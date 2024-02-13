document.addEventListener("DOMContentLoaded", function() {
    const ball = document.getElementById("ball");
    const leftBar = document.getElementById("left-bar");
    const rightBar = document.getElementById("right-bar");

    // Posiciones iniciales de las barras
    let leftBarPosition = 50; // ajusta la posición inicial según tus necesidades
    let rightBarPosition = 50; // ajusta la posición inicial según tus necesidades

    // Velocidad de movimiento de las barras
    const barSpeed = 10;

    // Función para actualizar la posición de las barras
    function updateBars() {
        leftBar.style.top = leftBarPosition + "px";
        rightBar.style.top = rightBarPosition + "px";
    }

    // Evento de teclado para el movimiento de las barras
    document.addEventListener("keydown", function(event) {
        switch (event.key) {
            case "w":
                leftBarPosition -= barSpeed;
                break;
            case "s":
                leftBarPosition += barSpeed;
                break;
            case "ArrowUp":
                rightBarPosition -= barSpeed;
                break;
            case "ArrowDown":
                rightBarPosition += barSpeed;
                break;
        }

        // Asegurarse de que las barras no salgan del área de juego
        leftBarPosition = Math.max(0, Math.min(window.innerHeight - leftBar.clientHeight, leftBarPosition));
        rightBarPosition = Math.max(0, Math.min(window.innerHeight - rightBar.clientHeight, rightBarPosition));

        // Actualizar la posición de las barras en la interfaz
        updateBars();
    });

    // Llamar a la función de actualización inicialmente
    updateBars();

    // Agrega aquí la lógica adicional del juego, como el movimiento de la pelota y las colisiones.

});
