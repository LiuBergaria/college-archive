var player = document.createElement("audio"); // Cria o elemento audio / player
player.autoplay = false;
var lyricsAtual;
var legendaAtual = 0; //indexOf da legenda atual; a primeira é 0

// Função para player iniciar a prox. música quando acabar
player.onended = function() {
	playerNextPrevious(1);
}

// Função para iniciar o player
function playMusic(musica) {
	if (musica === undefined) { // Modo aleatório
		player.pause(); // Para evitar erros caso já esteja ativo
		// Sorteia uma música
		do {
			var x = Math.floor(Math.random()*listaMusicasAtual.length);
		} while (tituloPlayer.innerHTML == listaMusicasAtual[x]); // Verifica se a música é repetida e caso seja refaz o sorteio
		musicaAtual = listaMusicasAtual[x];
	} else { // Caso o parâmetro música seja passado
			musicaAtual = listaMusicasAtual[musica];		 
	}
	if (albumAtual === "divide") { // Condicional apenas para o álbum "Divide" por ser o único a possuir capas personalizadas para cada música
		 // Muda a imagem para a capa da musica
		imagemPlayer.style.backgroundImage = "url('imgs/divide/" + musicaAtual + ".jpg')";
	}
	// Muda o título do player conforme a música
	tituloPlayer.innerHTML = musicaAtual;
	// Muda o caminho do áudio de acordo com a música
	player.src = "mscs/" + albumAtual + "/" + musicaAtual + ".mp3";
	player.play();
	atualizarKaraoke();
}

function playerPlayPause() {
	if (player.paused) {
		if (player.src !== "") {
			player.play();
		} else {
			playMusic(0);			
		}
	} else {
		player.pause();
	}
}

function playerNextPrevious(num) {
	var musicaAtualIndex = listaMusicasAtual.indexOf(musicaAtual);
	// O teste 'musicaAtualIndex === -1' serve para caso não tenha nenhuma musica tocando
	if (musicaAtualIndex === -1 || (musicaAtualIndex === 15 && num === 1)) {
		playMusic(0);
	} else if (musicaAtualIndex === 0 && num === -1) {
		playMusic(15);
	} else {
		playMusic(musicaAtualIndex + num);
	}
}

/* Modo Karaoke */
function lyricsPlayPause() {
	if (lyricsContainer.style.display === "none") {
		lyricsContainer.style.display = "flex";
		player.addEventListener("timeupdate", karaoke);
	} else {		
		lyricsContainer.style.display = "none";
		player.removeEventListener("timeupdate", karaoke);
	}
	atualizarKaraoke();
}

function atualizarKaraoke() {
	switch(albumAtual) {
		case "plus":
			lyricsAtual = plusLyrics[listaMusicasAtual.indexOf(musicaAtual)];
			break;
		case "multiply":
			lyricsAtual = multiplyLyrics[listaMusicasAtual.indexOf(musicaAtual)];
			break;
		case "divide":
			lyricsAtual = divideLyrics[listaMusicasAtual.indexOf(musicaAtual)];
	}
	legendaAtual = 0;
	lyricsContainer.innerHTML = "...";
}

function karaoke() {
	if ((lyricsAtual[legendaAtual].start <= player.currentTime) && (lyricsAtual[legendaAtual].end > player.currentTime)){
		lyricsContainer.innerHTML = lyricsAtual[legendaAtual].text;
	}
	else if (lyricsAtual[legendaAtual].end < player.currentTime){
		legendaAtual++;
	}
	else {
		if (lyricsContainer.innerHTML === "...") {
			lyricsContainer.innerHTML = ".";
		} else if (lyricsContainer.innerHTML !== "." && lyricsContainer.innerHTML !== ".." && lyricsContainer.innerHTML !== "..."){
			lyricsContainer.innerHTML = ".";
		} else {
			lyricsContainer.innerHTML += ".";
		}
	}
}