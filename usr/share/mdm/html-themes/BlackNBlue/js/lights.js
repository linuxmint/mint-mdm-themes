
		$(document).ready(function(){
			var frameWidth = 340;
			var frameHeight = 340;
			var spriteWidth = 3060;
			var spriteHeight = 340;
			var spriteElement = document.getElementById("sprite1");
			var curPx = 0;
			var ti;
			function animateSprite() {
				spriteElement.style.backgroundPosition = curPx + 'px 0px';
				curPx = curPx + frameWidth;
				if (curPx >= spriteWidth) {
					curPx = 0;
				}
				ti = setTimeout(animateSprite, 130);
			}
			animateSprite();
		});
	
