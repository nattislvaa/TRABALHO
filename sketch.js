let tela = "menu";
let jogador;
let inimigo;
let tempoInicial = 30;
let tempoRestante;
let startTime;
let venceu = false;

let botaoX, botaoY, botaoW, botaoH;

function setup() {
  createCanvas(600, 400);
  jogador = createVector(width/2, height/2);
  inimigo = createVector(random(width), random(height));
  
  botaoW = 200;
  botaoH = 60;
  botaoX = width / 2 - botaoW / 2;
  botaoY = height / 2 + 40;
  
  textFont('Arial Black');
}

function draw() {
  if (tela === "menu") {
    telaMenu();
  } else if (tela === "jogo") {
    telaJogo();
  } else if (tela === "fim") {
    telaFinal();
  }
}

function telaMenu() {
  background('#3A80E0'); // fundo azul

  fill(255);
  textAlign(CENTER, CENTER);
  textSize(36);
  text("FUGE DO INVASOR", width/2, height/2 - 60);

  if (
    mouseX > botaoX &&
    mouseX < botaoX + botaoW &&
    mouseY > botaoY &&
    mouseY < botaoY + botaoH
  ) {
    fill('#A1D4FF');
    stroke('#FFFFAA');
    strokeWeight(4);
  } else {
    fill('#7EC8E3');
    stroke(255);
    strokeWeight(2);
  }
  
  rect(botaoX, botaoY, botaoW, botaoH, 20);
  
  noStroke();
  fill(0);
  textSize(28);
  text("JOGAR", width/2, botaoY + botaoH/2);

  textSize(16);
  fill(255);
  text("Use W/A/S/D ou setas para fugir do inimigo!", width/2, height - 30);
}

function mousePressed() {
  if (tela === "menu") {
    if (
      mouseX > botaoX &&
      mouseX < botaoX + botaoW &&
      mouseY > botaoY &&
      mouseY < botaoY + botaoH
    ) {
      reiniciarJogo();
    }
  } else if (tela === "fim") {
    tela = "menu";
  }
}

function telaJogo() {
  background(30);

  tempoRestante = tempoInicial - int((millis() - startTime) / 1000);
  if (tempoRestante <= 0) {
    tempoRestante = 0;
    venceu = true;
    tela = "fim";
  }

  fill(0, 200, 255);
  ellipse(jogador.x, jogador.y, 30, 30);

  let velocidade = 3;
  if (keyIsDown(LEFT_ARROW) || keyIsDown(65)) jogador.x -= velocidade;
  if (keyIsDown(RIGHT_ARROW) || keyIsDown(68)) jogador.x += velocidade;
  if (keyIsDown(UP_ARROW) || keyIsDown(87)) jogador.y -= velocidade;
  if (keyIsDown(DOWN_ARROW) || keyIsDown(83)) jogador.y += velocidade;

  jogador.x = constrain(jogador.x, 15, width - 15);
  jogador.y = constrain(jogador.y, 15, height - 15);

  inimigo.lerp(jogador, 0.01);
  fill(255, 0, 100);
  ellipse(inimigo.x, inimigo.y, 30, 30);

  if (dist(jogador.x, jogador.y, inimigo.x, inimigo.y) < 25) {
    venceu = false;
    tela = "fim";
  }

  fill(255);
  textSize(18);
  textAlign(LEFT, TOP);
  text("Tempo: " + tempoRestante, 10, 10);
}

function telaFinal() {
  background(20);
  fill(255);
  textAlign(CENTER, CENTER);
  textSize(32);
  text(venceu ? "VITÓRIA!!!" : "Game Over! 😵", width / 2, height / 2 - 30);
  textSize(18);
  text("Clique para voltar ao menu", width / 2, height / 2 + 20);
}

function reiniciarJogo() {
  jogador = createVector(width/2, height/2);
  inimigo = createVector(random(width), random(height));
  startTime = millis();
  tela = "jogo";
}


