
                        $(document).ready(function(){
			var frameWidth = 100;
			var frameHeight = 51;
			var spriteWidth = 800;
			var spriteHeight = 51;
			var spriteElement = document.getElementById("sprite2");
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

