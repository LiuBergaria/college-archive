var albumAtual = "divide";
var musicaAtual = undefined;
var listaMusicasAtual = listaMusicas.divide;

var corPlus = "#ea6b41";
var corMultiply = "#4ad979";
var corDivide = "#02cdff";

var imagemPlayer = document.getElementById("imagemPlayer");
var tituloPlayer = document.getElementById("tituloPlayer");
var imagemMusicas = document.getElementById("imagemMusicas");

var menuPrincipal = document.getElementById("menuPrincipal");

var lyricsContainer = document.getElementById("lyricsContainer");
var listaMusicasTexto =  document.getElementById("listaMusicasTexto");
var listaMusicasImagem =  document.getElementById("listaMusicasImagem");

var plusHistory = document.getElementById("plusHistory");
var multiplyHistory = document.getElementById("multiplyHistory");
var divideHistory = document.getElementById("divideHistory");

// Funções para serem chamadas quando a página terminar de carregar
window.addEventListener("load", resizeMap)

function mudarAlbum(album) {
	// Atalhos para deixar o código mais limpo
	var btnPlus = document.querySelector(".btnAlbunsPlus");
	var btnMultiply = document.querySelector(".btnAlbunsMultiply");
	var btnDivide = document.querySelector(".btnAlbunsDivide");
	var tituloMusicas = document.querySelectorAll(".tituloMusica");
	var cor;

	// Reset da área de história do álbum
	plusHistory.style.display = "none";
	multiplyHistory.style.display = "none";
	divideHistory.style.display = "none";

	if (album != albumAtual) { // Verifica se o álbum atual já não está selecionado
		// Centralizar botão do album passado pelo parâmetro
		switch(album) {
			case "plus":
				btnPlus.style.order = 0;
				btnMultiply.style.order = -1;
				btnDivide.style.order = 1;
				cor = corPlus;
				albumAtual = "plus";
				listaMusicasAtual = listaMusicas.plus;
				plusHistory.style.display = "flex";
				break;
			case "multiply":
				btnPlus.style.order = -1;
				btnMultiply.style.order = 0;
				btnDivide.style.order = 1;
				cor = corMultiply;
				albumAtual = "multiply";
				listaMusicasAtual = listaMusicas.multiply;
				multiplyHistory.style.display = "flex";
				break;
			case "divide":
				btnPlus.style.order = -1;
				btnMultiply.style.order = 1;
				btnDivide.style.order = 0;
				cor = corDivide;
				albumAtual = "divide";
				listaMusicasAtual = listaMusicas.divide;
				divideHistory.style.display = "flex";
		}

		// Reset	
		menuPrincipal.style.color = cor;
		tituloPlayer.style.textShadow = "1px 1px 4px " + cor;
		tituloPlayer.innerHTML = albumAtual;
		imagemPlayer.style.backgroundImage = "url(imgs/" + albumAtual + "/" + albumAtual + ".jpg)";
		player.pause();
		player.removeAttribute("src"); // Reseta a propriedade 'src' do áudio
		musicaAtual = undefined;
		atualizarKaraoke();	

		// Recria a lista de músicas de texto
		for (i = 0; i < tituloMusicas.length; i++) {
			tituloMusicas[i].innerHTML = (i+1) + ". " + listaMusicasAtual[i];
		}

		// Chamada de função com o parâmetro 'manter' verdadeiro apenas para atualizar a imagem e o mapa
		altMenuMusicas(true);
		
	}
}

function altMenuMusicas(manter) {
	if (manter && listaMusicasImagem.style.display === "flex") { // Caso específico para trocar a imagem quando trocar o álbum (Caso a imagem esteja visível)
		document.querySelector("#imagemMusicas").src = "imgs/musicas-" + albumAtual + ".png";
		resizeMap();
	} else if (!manter) {
			// Caso a função seja chamada sem o parâmetro 'manter', ele ativa/desativa a exibição das lista de músicas como imagem
			if (listaMusicasImagem.style.display === "none") {
			listaMusicasImagem.querySelector("#imagemMusicas").src = "imgs/musicas-" + albumAtual + ".png";
			listaMusicasImagem.style.display = "flex";
			listaMusicasTexto.style.display = "none";
			resizeMap();
			} else {
				listaMusicasImagem.style.display = "none";
				listaMusicasTexto.style.display = "flex";
			}		
	}
	document.querySelector("#imagemMusicas").useMap = albumAtual + "Map"; // Atualiza qual mapa deve ser usado de acordo com o album atual
}