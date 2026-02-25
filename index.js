let HiddenAnimation=true;
function Number(){
    let s = document.getElementById("number");
    let ring = document.querySelector('.ring');
    let strokeLength = ring.getTotalLength();
    let result = strokeLength/100*s.value;
    ring.style.strokeDasharray = result + ',' + strokeLength;
}
function Animated(){
    let check = document.getElementById("Animated");
    if (check.checked){
        let start = Date.now();
        let ring = document.querySelector('.ring');
        let trans = ring.style.transform;
        let b = -90;
        let deg = "";
        if (trans.length != 0){
            let i=7;
            while (trans[i]!="d" && i <100){
                deg+=trans[i];
                i++;
            }
            b = parseInt(deg);
        }
        let timer = setInterval(function(){
            let a = -(((start - Date.now())/7-b)%360);
            ring.style.transform = `rotate(${a}deg)`;
            if  (!check.checked){
                clearInterval(timer);
                return;
            }
        },10)
    }
    Clone();
}
function Hidden(){
    HiddenAnimation = false;
    document.querySelector(".clone input").checked = true;
    document.querySelector(".clone").style.opacity = 1;
    let start = document.querySelector(".clone").getBoundingClientRect();
    let end = document.querySelector(".progress_bar").getBoundingClientRect();
    let x = start.left-end.left;
    let y = start.top-end.top;
    let i = 1;
    let timer = setInterval(function(){
        i-=0.01;
        document.querySelector(".progress_bar").style.opacity = quad(i);
        if (i<=0){
            clearInterval(timer);
             i = 0;
            let timer2 = setInterval(function(){
                i+=0.01;
                document.querySelector(".clone").style.top = start.top - quad(i)*y;
                document.querySelector(".clone").style.left = start.left - quad(i)*x;
                if (i>=1){
                clearInterval(timer2);
                document.querySelector(".clone").style.zIndex = 1;
                HiddenAnimation = true;
                return;
        }
    },10)
            return;
        }
    },10);
}

function Clone(){
    let bar = document.querySelector(".progress_bar_content_switches_hidden").getBoundingClientRect();
    let clone = document.querySelector(".clone");
    clone.style.width = bar.width;
    clone.style.height = bar.height;
    if (document.querySelector(".clone input").checked){
        bar = document.querySelector(".progress_bar").getBoundingClientRect();
    }
    clone.style.top = bar.top;
    clone.style.left = bar.left;
}

function HiddenClone(){
    HiddenAnimation = false;
    document.querySelector(".progress_bar_content_switches_hidden input").checked = false;
    let end = document.querySelector(".progress_bar_content_switches_hidden").getBoundingClientRect();
    let start = document.querySelector(".progress_bar").getBoundingClientRect();
    let x = start.left-end.left;
    let y = start.top-end.top;
    let i = 0;
    let timer = setInterval(function(){
        document.querySelector(".clone").style.top = start.top - quad(i)*y;
        document.querySelector(".clone").style.left = start.left - quad(i)*x;
        i+=0.1;
        if (i>=1){
            clearInterval(timer);
            i = 0;
            let timer2 = setInterval(function(){
                i+=0.01;
                document.querySelector(".progress_bar").style.opacity = quad(i);
                if (i>=1){
                clearInterval(timer2);
                document.querySelector(".clone").style.zIndex = -1;
                document.querySelector(".clone").style.opacity = 0;
                HiddenAnimation = true;
                return;
        }
    },10)
            return;
        }
    },100)
}
function quad(timeFraction) {
  return Math.pow(timeFraction, 2)
}

document.addEventListener("DOMContentLoaded", function(event) { 
  Clone();
});

window.addEventListener('resize', () => {
    if (HiddenAnimation){
        Clone();
    }
});
window.addEventListener("orientationchange", function() {
    // Выводим числовое значение ориентации
    console.log(window.orientation);
}, false);