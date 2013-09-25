
$(document).ready(function(){
			var frameWidth = 200;
			var frameHeight = 67;
			var spriteWidth = 1600;
			var spriteHeight = 67;
			var spriteElement = document.getElementById("sprite4");
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

