// setting Box
document.querySelector('.fa-gear').onclick = function(){
    this.classList.toggle('fa-spin');
    document.querySelector('.setting-box').classList.toggle('open');
}
let myColors = document.querySelectorAll('.color-list li');
if(window.localStorage.getItem('color-option') !== null){
    document.documentElement.style.setProperty('--main-color',window.localStorage.getItem('color-option'));
    myColors.forEach((li)=> {
        li.classList.remove('active');
            if(li.dataset.color === window.localStorage.getItem('color-option')){
                li.classList.add('active')
            }
    });

}

myColors.forEach((li)=>{
    li.addEventListener('click',(e)=>{
        document.documentElement.style.setProperty('--main-color',e.target.dataset.color);
        window.localStorage.setItem('color-option', e.target.dataset.color)
        li.parentElement.querySelector(".active").classList.remove('active');
        e.target.classList.add('active');
    })
})

let RBGOption = localStorage.getItem('random-background');
let randomBg = document.querySelectorAll('.random-bg span');
randomBg.forEach((span)=>{
    span.addEventListener('click',(e)=>{
        handleActive(e)
        if(e.target.classList.contains('no')){
            RBGOption = false;
            clearInterval(RBGInterval);
            window.localStorage.setItem('random-background','false')
        }
        else {
            RBGOption = true;
            RBG();
            window.localStorage.setItem('random-background','true')
        }
    })
})

if(localStorage.getItem('random-background')!== null){
    randomBg.forEach((span)=>span.classList.remove('active'));
    if(localStorage.getItem('random-background') === 'false'){
        RBGOption = false;
        document.querySelector('span.no').classList.add('active')
    }
    else {
        RBGOption = true;
        document.querySelector('span.yes').classList.add('active')
    }
}

document.querySelector(".reset-button").addEventListener('click',() =>{
    localStorage.removeItem('bullets_option');
    localStorage.removeItem('random-background');
    localStorage.removeItem('color-option');
    window.location.reload();
    
})
//Bullets
const numOfBullets = document.querySelectorAll(".section");
const navBullets = document.querySelector(".nav-bullets")
for(let i=0 ; i < numOfBullets.length ; i++){
    const bullet = document.createElement("div");
    bullet.className = 'bullet';
    bullet.setAttribute('data-section' , `.${numOfBullets[i].dataset.name}`)
    navBullets.appendChild(bullet);
    const tooltip = document.createElement("div");
    tooltip.classList = 'tooltip';
    tooltip.textContent = numOfBullets[i].dataset.name;
    bullet.appendChild(tooltip);
}

const allBullet = document.querySelectorAll(".bullet");
allBullet.forEach((bullet) => {
    bullet.addEventListener('click' , (e)=>{
        document.querySelector(e.target.dataset.section).scrollIntoView({
            behavior: 'smooth'
        })
    })
})

const bulletsLocalItem = localStorage.getItem('bullets_option');
if(bulletsLocalItem !== null){
    document.querySelectorAll(".bullets-option span").forEach(span => span.classList.remove('active'))
    if(bulletsLocalItem === 'no'){
        document.querySelector('.nav-bullets').style.right = '-50px';
        document.querySelector('.bullets-option .no').classList.add('active')
        
    }
    else{
        document.querySelector('.nav-bullets').style.right = '40px';
        document.querySelector('.bullets-option .yes').classList.add('active')    }
}

document.querySelectorAll(".bullets-option span").forEach(span => {
    span.addEventListener('click', e =>{
        if(span.classList.contains('no')){
            document.querySelector('.nav-bullets').style.right = '-50px';
            localStorage.setItem("bullets_option" , "no")
        }
        else {
            document.querySelector('.nav-bullets').style.right = '40px';
            localStorage.setItem("bullets_option" , "yes")
        }
        handleActive(e)
    })
})



// Landing Page
let RBGInterval;
let myImgs = ['01.jpg' , '02.jpg' , '03.jpg', '04.jpg' , '05.jpg'];
function RBG(){
    if(RBGOption === true){
        RBGInterval = setInterval(()=>{
            let randomNum = Math.floor(Math.random()*myImgs.length);
            document.querySelector(".landing-page").style.backgroundImage = `url('img/${myImgs[randomNum]}')`;
        },2000);
    }
}
RBG();

let toggleBtn = document.querySelector('.toggle-menu');
let tLinks = document.querySelector(".links");
toggleBtn.addEventListener('click',() => {
    tLinks.classList.toggle("open")
})

// About US
let aboutUs = document.querySelector(".about-us");
let gallery = document.querySelector(".gallery");
window.onscroll = function (){
    let aboutOffsetTop = aboutUs.offsetTop;
    let aboutOuterHeight = aboutUs.offsetHeight;
    let windowHeight = this.innerHeight;
    let windowScrollTop = this.pageYOffset;
    if(windowScrollTop > aboutOffsetTop+aboutOuterHeight-windowHeight){
        document.querySelector(".about-us span").style.width='150px';
        document.querySelector(".about-us button").style.opacity='1';
        document.querySelector(".about-us .img-box img").style.opacity='1';
    }


//Gallery 

    let galleryOffsetTop = gallery.offsetTop;
    let galleryOuterHeight = gallery.offsetHeight;
    if(windowScrollTop > galleryOffsetTop - 100){
        document.querySelectorAll(".gallery .box img").forEach((img)=>{
        document.querySelector(".gallery span").style.width='180px';
            img.style.inset = '0 0';
            img.style.opacity = '1'
        })
    }

}

let galleryProduct = document.querySelectorAll(".gallery .box img");

galleryProduct.forEach(img =>{
    img.addEventListener('click',(e)=>{
        let overlay = document.createElement('div');
        overlay.className = 'popup-overlay';
        document.body.appendChild(overlay);
        let popupBox = document.createElement('div');
        popupBox.className = 'popup-box';
        let popupImg = document.createElement('img');
        popupImg.src = e.target.src;
        overlay.appendChild(popupBox);
        if(e.target.alt != null){
            let imgHeading = document.createElement('h3');
            let imgText = document.createTextNode(e.target.alt);
            imgHeading.appendChild(imgText);
            popupBox.appendChild(imgHeading)
        }
        popupBox.appendChild(popupImg);
        //Close Button
        let closeButton = document.createElement('span');
        closeButton.className = 'close-button';
        closeButton.textContent = 'X';
        popupBox.appendChild(closeButton);
    })
})

addEventListener('click',(e)=>{
    if(e.target.className === "close-button"){
        document.querySelector('.popup-overlay').remove();
    }
})

function handleActive(ev){
    ev.target.parentElement.querySelectorAll(".active").forEach(element => {
        element.classList.remove("active");
    });
    ev.target.classList.add("active")
}
