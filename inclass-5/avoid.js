window.onload = function(){
	var avoidBtn = document.getElementById("avoid_button");
	var winDiv = document.getElementById("win_div");

	avoidBtn.onmouseover=function(){
    	if (!event.shiftKey){
    		console.log(window.innerWidth)
    		console.log(avoidBtn.offsetWidth)
    		avoidBtn.style.left = Math.random()*(window.innerWidth-avoidBtn.offsetWidth) + "px";
        	avoidBtn.style.top = Math.random()*(window.innerHeight-avoidBtn.offsetHeight) + "px";
        	
    	}
	
    }
    avoidBtn.onclick = function() {
    	if (avoidBtn.innerHTML == "Click Me") {
    		winDiv.style.display ='block';
    		avoidBtn.innerHTML = "Play Again";
    		
    	} else if (avoidBtn.innerHTML == "Play Again") {
    		avoidBtn.innerHTML = "Click Me";

    		winDiv.style.display = 'none';
    	}
    }
    
}