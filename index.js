let HiddenAnimation = true;
let contentInputs,ring,animatedInput,cloneInput,cloneBox,progressBar,hiddenInput;

document.addEventListener("DOMContentLoaded", function(event) {
    contentInputs = document.querySelectorAll(".progressBar input");
    ring = document.querySelector('.progressBar circle');
    animatedInput = document.querySelector(".progressBar .animated input");
    cloneInput = document.querySelector(".clone input");
    cloneBox = document.querySelector(".clone");
    progressBar = document.querySelector(".progressBar");
    hiddenInput = document.querySelector(".progressBar .hidden");

    progressBarRotation(window.orientation);
});

function checkBoxNumber(){
    let normalInput = document.querySelector(".progressBar .normal input");
    let strokeLength = ring.getTotalLength();
    let result = strokeLength/100*normalInput.value;

    if (normalInput.value<0){normalInput.value = 0};
    if (normalInput.value>=100){normalInput.value = 100;result++};

    ring.style.strokeDasharray = result + ',' + strokeLength;
}

function ringRotation(){
    let start = Date.now();
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

        if  (!animatedInput.checked){
            clearInterval(timer);
            return;
        }
    },10)
}

function checkBoxAnimated(){
    if (animatedInput.checked){
       ringRotation();
    }
}

function checkBoxHidden(){
    cloneBox.style.transitionDuration = 0;
    cloneAmendment();
    cloneBox.style.transitionDuration = 0.3;
    
    for (let i=0;i<=2;i++){
        contentInputs[i].disabled = true;
    }

    HiddenAnimation = false;
    cloneInput.checked = true;
    cloneBox.style.opacity = 1;

    let start = cloneBox.getBoundingClientRect();
    let end = progressBar.getBoundingClientRect();
    let x = start.left-end.left;
    let y = start.top-end.top;
    i = 1;

    let timer = setInterval(function(){
        i-=0.01;
        progressBar.style.opacity = quad(i);

        if (i<=0){
            clearInterval(timer);
            i = 0;

            let timer2 = setInterval(function(){
                i+=0.01;
                cloneBox.style.top = start.top - quad(i)*y;
                cloneBox.style.left = start.left - quad(i)*x;

                if (i>=1){
                    clearInterval(timer2);
                    cloneAmendment();
                    cloneBox.style.zIndex = 1;
                    cloneInput.disabled = false;
                    HiddenAnimation = true;

                    return;
                }
            },10)

            return;
        }
    },10);
}

function cloneAmendment(){
    let hiddenInputFeatures = hiddenInput.getBoundingClientRect();
    cloneBox.style.width = hiddenInputFeatures.width;
    cloneBox.style.height = hiddenInputFeatures.height;

    if (cloneInput.checked){
        hiddenInputFeatures = progressBar.getBoundingClientRect();
    }

    cloneBox.style.top = hiddenInputFeatures.top;
    cloneBox.style.left = hiddenInputFeatures.left;
}

function hiddenCloneReturn(){
    cloneInput.disabled = true;
    HiddenAnimation = false;
    document.querySelector(".progressBar .hidden input").checked = false;

    let end = hiddenInput.getBoundingClientRect();
    let start = progressBar.getBoundingClientRect();
    let x = start.left-end.left;
    let y = start.top-end.top;
    let i = 0;

    let timer = setInterval(function(){
        cloneBox.style.top = start.top - quad(i)*y;
        cloneBox.style.left = start.left - quad(i)*x;
        i+=0.01;

        if (i>=1){
            clearInterval(timer);
            cloneAmendment();
            i = 0;

            let timer2 = setInterval(function(){
                i+=0.01;
                progressBar.style.opacity = quad(i);

                if (i>=1){
                    clearInterval(timer2);
                    cloneBox.style.zIndex = -1;
                    cloneBox.style.opacity = 0;
                    for (i=0;i<=2;i++){
                        contentInputs[i].disabled = false;
                    }
                    HiddenAnimation = true;

                return;
                }
            },10)
            return;
        }
    },10)
}

function quad(timeFraction) {
  return Math.pow(timeFraction, 2)
}

window.addEventListener('resize', () => {
    if (HiddenAnimation){
        cloneAmendment();
    }
});

window.addEventListener("orientationchange", function() {
    progressBarRotation(window.orientation);
}, false);

function progressBarRotation(value){
    let link = document.querySelector(".progressBar .content").style;
    let link2 = progressBar.style;
    if (value == 0){
        link.flexDirection = "column";
        link2.maxWidth = 300;
        link2.maxHeight = 600;
        link2.marginTop = 50;
    }
    else {
        link.flexDirection = "row";
        link2.maxWidth = 500;
        link2.maxHeight = 300;
        link2.marginTop = 20;
    }
    cloneAmendment();
    ringRotation();
}