
$(document).ready(function(){
			var frameWidth = 100;
			var frameHeight = 50;
			var spriteWidth = 800;
			var spriteHeight = 50;
			var spriteElement = document.getElementById("sprite3");
			var curPx = 0;
			var ti;
			function animateSprite() {
				spriteElement.style.backgroundPosition = curPx + 'px 0px';
				curPx = curPx + frameWidth;
				if (curPx >= spriteWidth) {
					curPx = 0;
				}
				ti = setTimeout(animateSprite, 10);
			}
			animateSprite();
		});

