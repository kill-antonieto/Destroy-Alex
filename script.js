document.addEventListener("DOMContentLoaded", function() {
    const ball = document.getElementById("ball");
    const leftBar = document.getElementById("left-bar");
    const rightBar = document.getElementById("right-bar");
    const playButton = document.getElementById("play-button");
    const titleContainer = document.getElementById("title-container");

    let ballSpeedX = 5;
    let ballSpeedY = 5;

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

        ball.style.left = (ballRect.left + ballSpeedX) + "px";
        ball.style.top = (ballRect.top + ballSpeedY) + "px";

        if (
            ballRect.left <= 0 ||
            ballRect.right >= window.innerWidth ||
            ballRect.top <= 0 ||
            ballRect.bottom >= window.innerHeight
        ) {
            ballSpeedX = -ballSpeedX;
            ballSpeedY = -ballSpeedY;
        }

        if (
            ballRect.left <= leftBarRect.right &&
            ballRect.right >= leftBarRect.left &&
            ballRect.top <= leftBarRect.bottom &&
            ballRect.bottom >= leftBarRect.top
        ) {
            ballSpeedX = Math.abs(ballSpeedX);
        }

        if (
            ballRect.left <= rightBarRect.right &&
            ballRect.right >= rightBarRect.left &&
            ballRect.top <= rightBarRect.bottom &&
            ballRect.bottom >= rightBarRect.top
        ) {
            ballSpeedX = -Math.abs(ballSpeedX);
        }
    }

    function moveRightBar() {
        const speed = 2;
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

    document.addEventListener("keydown", function(event) {
        switch (event.key) {
            case "w":
                leftBarPosition -= 10;
                break;
            case "s":
                leftBarPosition += 10;
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
});
