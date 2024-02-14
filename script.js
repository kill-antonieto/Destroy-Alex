document.addEventListener("DOMContentLoaded", function() {
    const ball = document.getElementById("ball");
    const leftBar = document.getElementById("left-bar");
    const rightBar = document.getElementById("right-bar");

    // Posiciones iniciales de las barras
    let leftBarPosition = 50; // ajusta la posición inicial según tus necesidades
    let rightBarPosition = 50; // ajusta la posición inicial según tus necesidades

    // Velocidad de movimiento de las barras
    const barSpeed = 10;

    // Estado del juego
    let gameStarted = false;

    // Función para actualizar la posición de las barras
    function updateBars() {
        leftBar.style.top = leftBarPosition + "px";
        rightBar.style.top = rightBarPosition + "px";
    }

    // Función para comenzar el juego
    function startGame() {
        if (!gameStarted) {
            gameStarted = true;
            // Agrega aquí la lógica adicional del juego, como el movimiento de la pelota y las colisiones.
            // Puedes usar setInterval para actualizar la posición de la pelota en un bucle de juego.
            setInterval(updateGame, 20); // Actualiza cada 20 milisegundos (ajusta según tus necesidades)
        }
    }

    // Evento de clic en el botón de "Play"
    const playButton = document.getElementById("play-button");
    playButton.addEventListener("click", startGame);

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

    // Función para actualizar el juego (lógica adicional del juego)
    function updateGame() {
        // Aquí puedes implementar la lógica del movimiento de la pelota y las colisiones
        // Recuerda ajustar las posiciones y condiciones según tus necesidades.
    }

});
