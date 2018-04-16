var video = document.getElementById("videoLocal");
var btnVideo = document.getElementById("btnVideo");
var btnVideoContainer = document.getElementById("btnVideoContainer");

window.addEventListener("load", function() {
	video.load();
});

video.addEventListener("ended", function() {
	btnVideo.classList = "fas fa-redo-alt";
	btnVideoContainer.classList = "visible";
	video.currentTime = 0;
});

function playVideo() {
	setTimeout(function () {
		if (video.paused) {
			video.play();
			btnVideo.classList = "far fa-pause-circle";
			btnVideoContainer.classList = "visibleOver";
		} else {
			video.pause();
			btnVideo.classList = "far fa-play-circle";
			btnVideoContainer.classList = "visible";
		}
	}, 200); //Delay entre funções para que evite problemas recorrentes do uso das funções play() e pause()
}