var iFrameContainer = document.getElementById("iFrameContainer");
var topMenu = document.getElementById("toTopMenu");
var telaCheia = document.getElementById("imageOverPage");

function openIFrame(site) {
	iFrameContainer.classList.remove("displayNone");
	topMenu.classList.add("displayNone");
	iFrameContainer.addEventListener('click', function(e) {
		if(e.target.id == "iFrameContainer" || e.target.id == "btnFechar") {
			iFrameContainer.classList.add("displayNone");
			topMenu.classList.remove("displayNone");
		}
	});
}

/* Adiciona o evento para quando scrollar a página */
document.addEventListener("scroll", function() {
	function scroll() {
		if (window.pageYOffset > 200) {
			topMenu.classList.remove("displayNone");
		} else {
			topMenu.classList.add("displayNone");
		}
	}

	if (telaCheia != null) {
		if (iFrameContainer.classList.contains("displayNone") && telaCheia.classList.contains("displayNone")) {
			scroll();
		}
	} else {
		if (iFrameContainer.classList.contains("displayNone")) {
			scroll();
		}
	}	
});