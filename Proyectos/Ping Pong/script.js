let menu = document.getElementById("menu");
let game = document.getElementById("game");
let playerUno = document.getElementById("playerUno");
let playerDos = document.getElementById("playerDos");
let ball = document.getElementById("ball");
let puntajeUno = document.getElementById("puntajeUno");
let puntajeDos = document.getElementById("puntajeDos");
let unJugador = document.getElementById("unJugador");
let dosJugadores = document.getElementById("dosJugadores");
let reset = document.getElementById("reset");
let ganador = document.getElementById("ganador");
let resultado = document.getElementById("resultado");
let volverMenu = document.getElementById("volverMenu");

let modoJuego = "off";
let juegoActivo = false;
//Variables 

let pelota = ball.getBoundingClientRect();
let jugadorUno = playerUno.getBoundingClientRect();
let jugadorDos = playerDos.getBoundingClientRect();
let juego = game.getBoundingClientRect();

let teclasPresionadas = {};

let speedBallY = 5;
let speedBallX = 5;

let speedUno = 5;
let speedDos = 5;

let playerUnoX = 10;
let playerUnoY = 200;
let playerDosX = 970;
let playerDosY = 200;

let ballX = 480;
let ballY = 240;

let puntosUno = 0;
let puntosDos = 0;

let win = 0;


unJugador.addEventListener("click", () => {
    if (modoJuego == "off") {
        modoJuego = "uno";
        menu.classList.add("oculto");
        game.classList.remove("oculto");
        iniciarJuego();
    }
})

dosJugadores.addEventListener("click", () => {
    if (modoJuego == "off") {
        modoJuego = "dos";
        menu.classList.add("oculto");
        game.classList.remove("oculto");
        iniciarJuego();
    }
})

function iniciarJuego() {

    juegoActivo = true;
    moverPelota();
    moverPaletas();


}


function moverPelota() {
    if (!juegoActivo) return;
    ballY += speedBallY;
    ball.style.top = ballY + "px";
    ballX += speedBallX;
    ball.style.left = ballX + "px";
    colision();
    requestAnimationFrame(moverPelota);
}

function colision() {
    pelota = ball.getBoundingClientRect();
    jugadorUno = playerUno.getBoundingClientRect();
    jugadorDos = playerDos.getBoundingClientRect();

    if (ballY >= 480 || ballY <= 0) {
        speedBallY *= -1;
    }
    if (ballX <= 0) {
        puntosDos++;
        puntajeDos.innerText = puntosDos;
        ballX = 480;
        speedBallX *= -1;
        if (puntosDos == 7) {
            win = 2;
            winner();
        }
    }
    if (ballX >= 980) {
        puntosUno++;
        puntajeUno.innerText = puntosUno;
        ballX = 480;
        speedBallX *= -1;
        if (puntosUno == 7) {
            win = 1;
            winner();
        }
    }

    if (
        pelota.right >= jugadorDos.left &&
        pelota.bottom >= jugadorDos.top &&
        pelota.top <= jugadorDos.bottom
    ) {
        speedBallX *= -1;
    }

    if (
        pelota.left <= jugadorUno.right &&
        pelota.bottom >= jugadorUno.top &&
        pelota.top <= jugadorUno.bottom
    ) {
        speedBallX *= -1;
    }

}

document.addEventListener("keydown", (event) => {
    teclasPresionadas[event.key] = true;
})

document.addEventListener("keyup", (event) => {
    teclasPresionadas[event.key] = false;
})



function moverPaletas() {
    pelota = ball.getBoundingClientRect();
    jugadorDos = playerDos.getBoundingClientRect();
    let centroPlayerDos = jugadorDos.top + (jugadorDos.height / 2);
    if (!juegoActivo) return;
    if (modoJuego == "uno") {
        if (playerUnoY > 0 && teclasPresionadas["ArrowUp"]) {
            playerUnoY -= speedUno;
            playerUno.style.top = playerUnoY + "px";
        }

        if (playerUnoY < 400 && teclasPresionadas["ArrowDown"]) {
            playerUnoY += speedUno;
            playerUno.style.top = playerUnoY + "px";
        }
        if (pelota.top < centroPlayerDos) {
            playerDosY -= speedDos - 2;
        } else if (pelota.bottom > centroPlayerDos) {
            playerDosY += speedDos - 2;
        }

        if (playerDosY < 0) {
            playerDosY = 0;
        }
        if (playerDosY > 400) {
            playerDosY = 400;
        }
        playerDos.style.top = playerDosY + "px";

    }
    if (modoJuego == "dos") {
        if (playerUnoY > 0 && teclasPresionadas["ArrowUp"]) {
            playerUnoY -= speedUno;
            playerUno.style.top = playerUnoY + "px";
        }

        if (playerUnoY < 400 && teclasPresionadas["ArrowDown"]) {
            playerUnoY += speedUno;
            playerUno.style.top = playerUnoY + "px";
        }
        if (playerDosY > 0 && teclasPresionadas["w"]) {
            playerDosY -= speedDos;
            playerDos.style.top = playerDosY + "px";
        }
        if (playerDosY < 400 && teclasPresionadas["s"]) {
            playerDosY += speedUno;
            playerDos.style.top = playerDosY + "px";
            playerUno.style.top = playerUnoY + "px";
        }
    }
    requestAnimationFrame(moverPaletas);
}

function winner() {
    if (win == 1) {
        ganador.innerText = "Ganador Jugador Uno"
        resultado.classList.remove("oculto");
        game.classList.add("oculto");
        juegoActivo = false;
    } else if (win == 2) {
        ganador.innerText = "Ganador Jugador Dos"
        resultado.classList.remove("oculto");
        game.classList.add("oculto");
        juegoActivo = false;
    }
}

reset.addEventListener("click", reiniciarJuego);

function reiniciarJuego() {
    puntosUno = 0;
    puntosDos = 0;
    puntajeUno.innerText = puntosUno;
    puntajeDos.innerText = puntosDos;
    playerUnoY = 200;
    playerDosY = 200;
    playerDos.style.top = playerDosY + "px";
    playerUno.style.top = playerUnoY + "px";
    menu.classList.add("oculto");
    game.classList.remove("oculto");
    resultado.classList.add("oculto")
    iniciarJuego();
}

volverMenu.addEventListener("click", function () {
    modoJuego = "off"
    puntosUno = 0;
    puntosDos = 0;
    puntajeUno.innerText = puntosUno;
    puntajeDos.innerText = puntosDos;
    playerUnoY = 200;
    playerDosY = 200;
    playerDos.style.top = playerDosY + "px";
    playerUno.style.top = playerUnoY + "px";
    menu.classList.remove("oculto");
    game.classList.add("oculto");
    resultado.classList.add("oculto")
})
