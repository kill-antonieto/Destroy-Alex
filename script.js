document.addEventListener("DOMContentLoaded", function() {
    const ball = document.getElementById("ball");
    const leftBar = document.getElementById("left-bar");
    const rightBar = document.getElementById("right-bar");
    const playButton = document.getElementById("play-button");
    const titleContainer = document.getElementById("title-container");

    let ballSpeedX = 5; // Velocidad inicial de la pelota en el eje X
    let ballSpeedY = 5; // Velocidad inicial de la pelota en el eje Y

    let leftBarPosition = 50; // Posición inicial de la barra izquierda
    let rightBarPosition = 50; // Posición inicial de la barra derecha

    let gameStarted = false; // Estado del juego

    // Función para actualizar la posición de las barras
    function updateBars() {
        leftBar.style.top = leftBarPosition + "px";
        rightBar.style.top = rightBarPosition + "px";
    }

    // Función para actualizar la posición de la pelota
    function updateBall() {
        const ballRect = ball.getBoundingClientRect();
        const leftBarRect = leftBar.getBoundingClientRect();
        const rightBarRect = rightBar.getBoundingClientRect();

        // Actualizar la posición de la pelota
        ball.style.left = (ballRect.left + ballSpeedX) + "px";
        ball.style.top = (ballRect.top + ballSpeedY) + "px";

        // Comprobar colisiones con las barras y el área de juego
        if (
            ballRect.left <= 0 ||
            ballRect.right >= window.innerWidth ||
            ballRect.top <= 0 ||
            ballRect.bottom >= window.innerHeight
        ) {
            // Cambiar la dirección de la pelota en caso de colisión con los bordes
            ballSpeedX = -ballSpeedX;
            ballSpeedY = -ballSpeedY;
        }

        // Comprobar colisiones con las barras
        if (
            ballRect.left <= leftBarRect.right &&
            ballRect.right >= leftBarRect.left &&
            ballRect.top <= leftBarRect.bottom &&
            ballRect.bottom >= leftBarRect.top
        ) {
            // Cambiar la dirección de la pelota en caso de colisión con la barra izquierda
            ballSpeedX = Math.abs(ballSpeedX); // Hacer positiva la velocidad en X
        }

        if (
            ballRect.left <= rightBarRect.right &&
            ballRect.right >= rightBarRect.left &&
            ballRect.top <= rightBarRect.bottom &&
            ballRect.bottom >= rightBarRect.top
        ) {
            // Cambiar la dirección de la pelota en caso de colisión con la barra derecha
            ballSpeedX = -Math.abs(ballSpeedX); // Hacer negativa la velocidad en X
        }
    }

    // Función para que la barra derecha siga a la pelota
    function moveRightBar() {
        // Puedes ajustar la velocidad de seguimiento según tus necesidades
        const speed = 2;
        if (ball.getBoundingClientRect().top > rightBar.getBoundingClientRect().top) {
            rightBarPosition += speed;
        } else {
            rightBarPosition -= speed;
        }

        // Asegurarse de que la barra no salga del área de juego
        rightBarPosition = Math.max(0, Math.min(window.innerHeight - rightBar.clientHeight, rightBarPosition));
    }

    // Función para comenzar el juego
    function startGame() {
        if (!gameStarted) {
            console.log("Juego iniciado");
            gameStarted = true;
            playButton.style.display = "none"; // Ocultar el botón de "JUGAR"
            titleContainer.style.display = "none"; // Ocultar el contenedor de la imagen y el texto
            // Agrega aquí la lógica adicional del juego, como el movimiento de la pelota y las colisiones.
            setInterval(updateGame, 20); // Actualiza cada 20 milisegundos (ajusta según tus necesidades)
        }
    }

    // Evento de clic en el botón de "JUGAR"
    playButton.addEventListener("click", startGame);

    // Evento de teclado para el movimiento de la barra izquierda
    document.addEventListener("keydown", function(event) {
        switch (event.key) {
            case "w":
                leftBarPosition -= 10;
                break;
            case "s":
                leftBarPosition += 10;
                break;
        }

        // Asegurarse de que la barra izquierda no salga del área de juego
        leftBarPosition = Math.max(0, Math.min(window.innerHeight - leftBar.clientHeight, leftBarPosition));

        // Actualizar la posición de las barras en la interfaz
        updateBars();
    });

    // Función para actualizar el juego (lógica adicional del juego)
    function updateGame() {
        updateBall();
        moveRightBar(); // Agrega el movimiento automático de la barra derecha
        updateBars();
    }
});
