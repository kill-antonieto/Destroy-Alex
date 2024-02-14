document.addEventListener("DOMContentLoaded", function() {
    const ball = document.getElementById("ball");
    const leftBar = document.getElementById("left-bar");
    const rightBar = document.getElementById("right-bar");
    const playButton = document.getElementById("play-button");
    const titleContainer = document.getElementById("title-container");

    let ballSpeedX = 10;
    let ballSpeedY = 10;

    let leftBarPosition = 50;
    let rightBarPosition = 50;

    let gameStarted = false;

    function updateBars() {
        leftBar.style.top = leftBarPosition + "px";
        rightBar.style.top = rightBarPosition + "px";
    }

    function updateBall() {
        const ballRect = ball.getBoundingClientRect();
        const leftBarRect = leftBar.getBoundingClientRect();
        const rightBarRect = rightBar.getBoundingClientRect();

        ball.style.left = Math.round(ballRect.left + ballSpeedX) + "px";
        ball.style.top = Math.round(ballRect.top + ballSpeedY) + "px";

        if (
            ballRect.left <= 0 ||
            ballRect.right >= window.innerWidth
        ) {
            ballSpeedX = -ballSpeedX;
        }

        if (
            ballRect.top <= 0 ||
            ballRect.bottom >= window.innerHeight
        ) {
            ballSpeedY = -ballSpeedY;
        }

        if (
            ballRect.left <= leftBarRect.right &&
            ballRect.right >= leftBarRect.left &&
            ballRect.top <= leftBarRect.bottom &&
            ballRect.bottom >= leftBarRect.top
        ) {
            ballSpeedX = Math.abs(ballSpeedX);
            ballSpeedY = getRandomDirection(); // Cambio de dirección aleatorio en el eje Y
        }

        if (
            ballRect.left <= rightBarRect.right &&
            ballRect.right >= rightBarRect.left &&
            ballRect.top <= rightBarRect.bottom &&
            ballRect.bottom >= rightBarRect.top
        ) {
            ballSpeedX = -Math.abs(ballSpeedX);
            ballSpeedY = getRandomDirection(); // Cambio de dirección aleatorio en el eje Y
        }
    }

    function moveRightBar() {
        const speed = 4;
        if (ball.getBoundingClientRect().top > rightBar.getBoundingClientRect().top) {
            rightBarPosition += speed;
        } else {
            rightBarPosition -= speed;
        }

        rightBarPosition = Math.max(0, Math.min(window.innerHeight - rightBar.clientHeight, rightBarPosition));
    }

    function startGame() {
        if (!gameStarted) {
            console.log("Juego iniciado");
            gameStarted = true;
            playButton.style.display = "none";
            titleContainer.style.display = "none";
            setInterval(updateGame, 20);
        }
    }

    playButton.addEventListener("click", startGame);

    document.addEventListener("mousemove", function(event) {
        // Mover la barra izquierda con el mouse
        leftBarPosition = event.clientY - leftBar.clientHeight / 2;
        leftBarPosition = Math.max(0, Math.min(window.innerHeight - leftBar.clientHeight, leftBarPosition));
        updateBars();
    });

    document.addEventListener("keydown", function(event) {
        switch (event.key) {
            case "w":
                leftBarPosition -= 15;
                break;
            case "s":
                leftBarPosition += 15;
                break;
        }

        leftBarPosition = Math.max(0, Math.min(window.innerHeight - leftBar.clientHeight, leftBarPosition));
        updateBars();
    });

    function updateGame() {
        updateBall();
        moveRightBar();
        updateBars();
    }

    // Función auxiliar para obtener una dirección aleatoria en el eje Y
    function getRandomDirection() {
        return (Math.random() > 0.5) ? 10 : -10;
    }
});
