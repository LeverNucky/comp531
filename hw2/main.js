'use strict'
window.onload = function() {
    //set the images dict
    var images ={
        "img1" : ['img/1-2.jpg',
    'img/1-3.jpg',
    'img/1-4.jpg',],
        "img2" : ['img/2-2.jpg',
    'img/2-3.jpg',
    'img/2-4.jpg',],
        "img3" : ['img/3-2.jpg',
    'img/3-3.jpg',
    'img/3-4.jpg',],
        "img4" : ['img/4-2.jpg',
    'img/4-3.jpg',
    'img/4-4.jpg',]
    }

    var pics = document.getElementsByName("pic")
    //itrate through all the pics
    pics.forEach(function(pic){
        
        var img=pic.getElementsByTagName("img")[0]
        var btn=pic.getElementsByTagName("button")[0]
        img.value=setInterval(function(){
            if (btn.innerHTML==="Stop"){
                var x=Math.floor(Math.random()*3)
                img.src=images[img.id][x]   
            }
        },(Math.random() * 4 + 1)*1000)
        btn.onclick=function(){
            if (btn.innerHTML==="Stop"){
                btn.innerHTML="Start"
            }else{
                btn.innerHTML="Stop"
            }
            
        }
    })
}