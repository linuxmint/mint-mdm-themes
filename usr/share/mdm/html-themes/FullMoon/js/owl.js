
$(document).ready(function(){
			var frameWidth = 250;
			var frameHeight = 270;
			var spriteWidth = 2500;
			var spriteHeight = 270;
			var spriteElement = document.getElementById("sprite5");
			var curPx = 0;
			var ti;
			function animateSprite() {
				spriteElement.style.backgroundPosition = curPx + 'px 0px';
				curPx = curPx + frameWidth;
				if (curPx >= spriteWidth) {
					curPx = 0;
				}
				ti = setTimeout(animateSprite, 140);
			}
			animateSprite();
		});

