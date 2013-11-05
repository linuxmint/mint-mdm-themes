
		$(document).ready(function(){
			var frameWidth = 300;
			var frameHeight = 100;
			var spriteWidth = 2400;
			var spriteHeight = 100;
			var spriteElement = document.getElementById("sprite1");
			var curPx = 0;
			var ti;
			function animateSprite() {
				spriteElement.style.backgroundPosition = curPx + 'px 0px';
				curPx = curPx + frameWidth;
				if (curPx >= spriteWidth) {
					curPx = 0;
				}
				ti = setTimeout(animateSprite, 30);
			}
			animateSprite();
		});
	
