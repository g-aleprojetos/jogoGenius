
let order = [];
let clickedOrder = [];
let score = 0;
let proximo = true;

//0 - verde
//1 - vermelho
//2 - amarelo
//3 - azul

const blue = document.querySelector('.blue');
const red = document.querySelector('.red');
const green = document.querySelector('.green');
const yellow = document.querySelector('.yellow');


//cria ordem aletoria de cores
let shuffleOrder = () => {
    if (proximo) {
        let colorOrder = Math.floor(Math.random() * 4);
        order[order.length] = colorOrder;
        clickedOrder = [];

        for (let i in order) {
            let elementColor = createColorElement(order[i]);
            lightColor(elementColor, Number(i) + 1);
        }
    }
}

//acende a proxima cor
let lightColor = (element, number) => {
    number = number * 800;

    setTimeout(() => {
        element.classList.add('selected');
    }, number - 400);

    setTimeout(() => {
        element.classList.remove('selected');
    }, number);
}

//checa se os botoes clicados são os mesmos da ordem gerada no jogo
let checkOrder = () => {
    for (let i in clickedOrder) {


        if (clickedOrder[i] != order[i]) {
            proximo = false;
            gameOver();
            break;
        }
    }

    if (clickedOrder.length == order.length) {
        console.log(proximo)
        if (proximo) {
            setTimeout(() => {
                $("#fundoGame").append("<div id='proxNivel'></div>");
                $("#proxNivel").html("<h1 class='tituloModal'> Próximo Nivel </h1><p class='textoModal'>Sua pontuação foi: " + score + "</p>" + "<button class='botaoModal' onClick= nextLevel();>Continuar</h3></button>");
            }, 1000);
        }
    }
}

//funcao para o clique do usuario
let click = (color) => {
    clickedOrder[clickedOrder.length] = color;
    createColorElement(color).classList.add('selected');

    setTimeout(() => {
        createColorElement(color).classList.remove('selected');
        checkOrder();
    }, 250);
}

//funcao que retorna a cor
let createColorElement = (color) => {
    if (color == 0) {
        return green;
    } else if (color == 1) {
        return red;
    } else if (color == 2) {
        return yellow;
    } else if (color == 3) {
        return blue;
    }
}

//funcao para proximo nivel do jogo
let nextLevel = () => {
    $("#proxNivel").remove();
    score++;
    setTimeout(() => { shuffleOrder(); }, 1000);
}

//funcao para game over
let gameOver = () => {
    setTimeout(() => {
        $("#fundoGame").append("<div id='gameOver'></div>");
        $("#gameOver").html("<h1 class='tituloModal'> GAME OVER </h1><p class='textoModal'>Sua pontuação foi: " + score + "</p>" + "<button class='botaoModal' onClick= playGame();>Reiniciar</h3></button>");
    }, 1000);
    order = [];
    clickedOrder = [];

}

//funcao de inicio do jogo
let playGame = () => {
    $("#gameOver").remove();
    $("#inicio").hide();
    proximo = true;
    score = 0;
    setTimeout(() => { nextLevel(); }, 1000);

}

//eventos de clique para as cores
green.onclick = () => click(0);
red.onclick = () => click(1);
yellow.onclick = () => click(2);
blue.onclick = () => click(3);

