
		$(document).ready(function(){
			var frameWidth = 300;
			var frameHeight = 183;
			var spriteWidth = 2700;
			var spriteHeight = 183;
			var spriteElement = document.getElementById("sprite1");
			var curPx = 0;
			var ti;
			function animateSprite() {
				spriteElement.style.backgroundPosition = curPx + 'px 0px';
				curPx = curPx + frameWidth;
				if (curPx >= spriteWidth) {
					curPx = 0;
				}
				ti = setTimeout(animateSprite, 14);
			}
			animateSprite();
		});
	
