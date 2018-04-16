var instagramContainer = document.getElementById("instaPhotosContainer");
var fotosInsta = instagramContainer.querySelectorAll("img");
var telaCheia = document.getElementById("imageOverPage");
var imgTelaCheia = telaCheia.querySelector("img");
var linkTelaCheia = telaCheia.querySelector("a");
var topMenu = document.getElementById("toTopMenu");

function aumentarImgInsta(numImg) {	
	imgTelaCheia.src = "imgs/instagram/insta-ed"+ numImg +".jpg"
	linkTelaCheia.href = fotosInsta[numImg-1].dataset.link;
	topMenu.classList.add("displayNone");
	telaCheia.classList.remove("displayNone");
	telaCheia.addEventListener('click', function(e) {
		if (e.target.id == "imageOverPage" || e.target.id == "closeImageOverPage") {
			telaCheia.classList.add("displayNone");
			topMenu.classList.remove("displayNone");
		}
	});
}