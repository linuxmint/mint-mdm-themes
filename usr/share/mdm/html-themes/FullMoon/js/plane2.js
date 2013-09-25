
$(document).ready(function(){
			var frameWidth = 40;
			var frameHeight = 56;
			var spriteWidth = 320;
			var spriteHeight = 56;
			var spriteElement = document.getElementById("sprite3");
			var curPx = 0;
			var ti;
			function animateSprite() {
				spriteElement.style.backgroundPosition = curPx + 'px 0px';
				curPx = curPx + frameWidth;
				if (curPx >= spriteWidth) {
					curPx = 0;
				}
				ti = setTimeout(animateSprite, 18);
			}
			animateSprite();
		});

