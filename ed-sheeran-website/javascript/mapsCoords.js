const mapOriginalPlus = [
	[826, 603, 793, 787, 984, 814, 989, 619],
	[046, 008, 028, 073, 339, 155, 351, 088],
	[337, 489, 289, 522, 401, 679, 438, 634],
	[266, 193, 287, 263, 524, 173, 506, 112],
	[419, 003, 390, 050, 739, 128, 754, 070],
	[007, 177, 012, 228, 254, 196, 248, 151],
	[763, 024, 764, 088, 963, 091, 962, 026],
	[040, 229, 014, 292, 313, 357, 336, 294],
	[002, 764, 023, 842, 320, 590, 279, 529],
	[064, 411, 038, 563, 522, 436, 388, 330],
	[669, 775, 649, 821, 956, 953, 972, 891],
	[696, 201, 754, 317, 995, 259, 992, 138],
	[579, 249, 543, 295, 970, 474, 988, 425],
	[392, 258, 362, 305, 575, 406, 601, 362],
	[424, 226, 443, 274, 764, 173, 747, 124],
	[845, 440, 811, 464, 960, 610, 989, 578]
];

const mapOriginalMultiply = [
	[801, 033, 821, 103, 951, 066, 929, 000],
	[781, 853, 746, 893, 977, 994, 997, 951],
	[848, 602, 819, 652, 968, 725, 987, 668],
	[811, 501, 825, 549, 995, 502, 988, 450],
	[428, 160, 443, 219, 613, 149, 571, 102],
	[118, 303, 085, 373, 492, 431, 531, 353],
	[028, 016, 000, 070, 395, 133, 416, 077],
	[003, 088, 000, 138, 458, 321, 455, 260],
	[710, 793, 707, 855, 992, 818, 993, 743],
	[511, 223, 507, 274, 691, 289, 697, 239],
	[700, 210, 744, 349, 996, 264, 948, 127],
	[587, 321, 567, 358, 862, 451, 875, 408],
	[015, 628, 008, 734, 154, 763, 233, 676],
	[407, 003, 395, 053, 758, 111, 764, 059],
	[135, 534, 136, 641, 449, 609, 435, 506],
	[010, 486, 019, 538, 356, 467, 340, 420]
];

const mapOriginalDivide = [
	[572, 308, 558, 375, 839, 408, 847, 339],
	[017, 130, 024, 183, 625, 061, 609, 019],
	[826, 579, 846, 656, 990, 613, 974, 546],
	[008, 498, 021, 556, 499, 454, 488, 394],
	[773, 932, 806, 997, 992, 832, 971, 767],
	[664, 001, 653, 054, 984, 122, 989, 063],
	[008, 735, 024, 786, 297, 707, 282, 660],
	[076, 561, 108, 663, 428, 663, 479, 520],
	[013, 017, 018, 087, 318, 073, 320, 015],
	[382, 239, 398, 293, 819, 166, 805, 117],
	[665, 219, 688, 322, 998, 274, 998, 160],
	[042, 251, 055, 299, 673, 108, 657, 064],
	[691, 783, 690, 847, 990, 755, 984, 698],
	[868, 353, 833, 484, 971, 525, 999, 386],
	[013, 344, 003, 392, 352, 415, 355, 362],
	[202, 257, 155, 319 ,532, 384, 557, 316]
];

const mapOriginalPlayer = [
	[250, 250, 62],
	[442, 250, 51],
	[058, 250, 51]
];

// Define as imagens usadas como referência para tamanho e correção
var imagemMusicas = document.getElementById("imagemMusicas"); 
var imagemComandosPlayer = document.getElementById("comandosPlayer");
// Seleciona os mapas do documento
var mapPlus = document.querySelectorAll(".plusRect");
var mapMultiply = document.querySelectorAll(".multiplyRect");
var mapDivide = document.querySelectorAll(".divideRect");
var mapPlayer = document.querySelectorAll(".playerCircle");

function resizeMap() {
	var mapAtual;
	var mapOriginal;
	// Define o parâmetro de correção baseado na imagem de músicas do album
	var paramCorrecPlayer = imagemPlayer.getBoundingClientRect().width / imagemComandosPlayer.naturalWidth;
	// Define o parâmetro de correção baseado na imagem de lista de músicas
	var paramCorrecImagem = imagemMusicas.getBoundingClientRect().width / imagemMusicas.naturalWidth;

	// Configura qual mapas vão ser ajustados de acordo com albumAtual
	switch(albumAtual) {
		case "plus":
			mapAtual = mapPlus;
			mapOriginal = mapOriginalPlus;
			break;
		case "multiply":
			mapAtual = mapMultiply;
			mapOriginal = mapOriginalMultiply;
			break;
		case "divide":
			mapAtual = mapDivide;
			mapOriginal = mapOriginalDivide;
	}

	// Recalcula as coordenadas do mapa selecionado e as recalcula
	for(i = 0; i < mapAtual.length; i++) {
		// Cria um array e adiciona um clone dos valores com as coordenadas originais
		var coordsList = mapOriginal[i].slice(); // O slice serve para fazer um clone do mapOriginal ao inves de uma referenciação (Quando somente atribuida, a mapOriginal era modificada)
		for(j = 0; j < coordsList.length; j++) {
			// Recalcula as coordenadas e re-armazena
			coordsList[j] = (coordsList[j] * paramCorrecImagem).toFixed(2);
		}
		// Atualiza as coordenadas na página
		mapAtual[i].coords = coordsList.join();
	}

	// Recalcula as coordenadas do mapa de comandos do player e as recalcula
	for(i = 0; i < mapPlayer.length; i++) {
		// Cria um array e adiciona um clone dos valores com as coordenadas originais
		var coordsList = mapOriginalPlayer[i].slice(); // O slice serve para fazer um clone do mapOriginal ao inves de uma referenciação (Quando somente atribuida, a mapOriginal era modificada)
		for(j = 0; j < coordsList.length; j++) {
			// Recalcula as coordenadas e re-armazena
			coordsList[j] = (coordsList[j] * paramCorrecPlayer).toFixed(2);
		}
		// Atualiza as coordenadas na página
		mapPlayer[i].coords = coordsList.join();
	}
}

window.addEventListener("resize", resizeMap);