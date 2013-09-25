
$(document).ready(function(){
			var frameWidth = 200;
			var frameHeight = 122;
			var spriteWidth = 1800;
			var spriteHeight = 122;
			var spriteElement = document.getElementById("sprite2");
			var curPx = 0;
			var ti;
			function animateSprite() {
				spriteElement.style.backgroundPosition = curPx + 'px 0px';
				curPx = curPx + frameWidth;
				if (curPx >= spriteWidth) {
					curPx = 0;
				}
				ti = setTimeout(animateSprite, 16);
			}
			animateSprite();
		});

