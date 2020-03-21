const menu = document.getElementById('menu');
const verticalPhone = document.getElementById('vPhone');
const horizontalPhone = document.getElementById('hPhone');
const portfolioImages = document.querySelectorAll('.layout-4-column > img');
const form = document.querySelector('form');
const submitBtn = document.getElementById('submit-btn');
const closeBtn = document.getElementById('close-btn');

// add styles to anchors in navbar
menu.addEventListener('click', event => {
    menu.querySelectorAll('a').forEach(elem => elem.classList.remove('active'));
    event.target.classList.add('active');
});
// track scroll
document.addEventListener('scroll', () => {
    let currentPosition = window.scrollY + document.querySelector('header').offsetHeight; //header height adjustment 
    document.querySelectorAll('section').forEach(elem => {
        if(elem.offsetTop <= currentPosition && (elem.offsetTop + elem.offsetHeight) > currentPosition) {
            menu.querySelectorAll('a').forEach(a => {
                a.classList.remove('active');
                if(elem.getAttribute('id') == a.getAttribute('href').substring(1)) {
                    a.classList.add('active');
                }
            });
        }
    });
});

//carousel
const items = document.querySelectorAll('.item');
const slider = document.querySelector('.slider');

let currentItem = 0;
let isEnabled = true;

function changeCurrentItem(n) {
    currentItem = (n + items.length) % items.length;
}
function hideItem(direction) {
    isEnabled = false;
    items[currentItem].classList.add(direction);
    items[currentItem].addEventListener('animationend', function() {
        this.classList.remove('active', direction);
    });
};
function showItem(direction) {
    items[currentItem].classList.add('next', direction);
    items[currentItem].addEventListener('animationend', function() {
        this.classList.remove('next', direction);
        this.classList.add('active');
        isEnabled = true;
    });
}
function previousItem(n) {
    hideItem('to-right');
    changeCurrentItem(n - 1);
    showItem('from-left');
}
function nextItem(n) {
    hideItem('to-left');
    changeCurrentItem(n + 1);
    showItem('from-right');
    if (slider.classList[1] == 'blue') {
        slider.classList.remove('blue');
    }
    else { slider.classList.add('blue'); }
}
document.querySelector('.arrow.left').addEventListener('click', function() {
    if(isEnabled) {
        previousItem(currentItem);
    }
});
document.querySelector('.arrow.right').addEventListener('click', function() {
    if(isEnabled) {
        nextItem(currentItem);
    }
});


//add black screens to phones
let vScreen = document.querySelector('.vertical.black-screen');
let hScreen = document.querySelector('.horizontal.black-screen');

verticalPhone.addEventListener('click', () => {
    vScreen.classList.contains('not-visible') ? vScreen.classList.remove('not-visible') : vScreen.classList.add('not-visible');
});
horizontalPhone.addEventListener('click', () => {
    hScreen.classList.contains('not-visible') ? hScreen.classList.remove('not-visible') : hScreen.classList.add('not-visible');
});

//add border to images in portfolio
document.querySelector('.layout-4-column').addEventListener('click', () => {
    portfolioImages.forEach(elem => elem.classList.remove('active'));
    event.target.classList.add('active');
});

//add message after form is submitted
form.addEventListener('submit', event => {
    event.preventDefault();
});
submitBtn.addEventListener('click', event => {
    if (document.getElementById('name').checkValidity() && document.getElementById('email').checkValidity()) {
        const subject = document.getElementById('subject').value.toString();
        const description = document.getElementById('description').value.toString();
        if(subject == '') {
            document.getElementById('fsubject').innerText = `No subject`;
        } else {
            document.getElementById('fsubject').innerText = `Subject: ${subject}`;
        }
        if(description == '') {
            document.getElementById('fdescription').innerText = `No description`;
        } else {
            document.getElementById('fdescription').innerText = `Description: ${description}`;
        }
        document.getElementById('message-block').classList.remove('not-visible');
    }
});
closeBtn.addEventListener('click', () => {
    document.getElementById('fsubject').innerText = '';
    document.getElementById('fdescription').innerText = '';
    document.getElementById('message-block').classList.add('not-visible');
    document.querySelector('form').reset();
});