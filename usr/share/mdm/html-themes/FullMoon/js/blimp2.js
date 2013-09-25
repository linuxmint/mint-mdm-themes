
$(document).ready(function(){
			var frameWidth = 50;
			var frameHeight = 70;
			var spriteWidth = 400;
			var spriteHeight = 70;
			var spriteElement = document.getElementById("sprite2");
			var curPx = 0;
			var ti;
			function animateSprite() {
				spriteElement.style.backgroundPosition = curPx + 'px 0px';
				curPx = curPx + frameWidth;
				if (curPx >= spriteWidth) {
					curPx = 0;
				}
				ti = setTimeout(animateSprite, 20);
			}
			animateSprite();
		});

