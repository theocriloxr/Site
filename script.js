var sections = document.getElementsByClassName('section');
var footer = document.querySelector('footer');
var lastScrollTop = window.scrollY;
var height = window.innerHeight;
var quoted = "At Rocon, we redefine communication with a modern touch—offering seamless connections, engaging chats, and the power to share like royalty. Whether you're looking to bond with friends, network professionally, or express yourself creatively, Rocon empowers you to do it all.";
var theme = localStorage.getItem('theme') ? localStorage.getItem('theme') : getPreferredTheme();;
var bgcolor = '#172C47';
var tcolor = '#fff';

function saveTheme(theme) {
    localStorage.setItem('theme', theme);
}
function getPreferredTheme() {
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
        return 'dark';
    }
    return 'light';
}
function Theme() {
    if (!(theme == 'dark')) {
        bgcolor = '#fff';
        tcolor = '#333'
    } else {
        bgcolor = '#172C47';
        tcolor = '#fff';
    }
    document.body.style.backgroundColor = bgcolor
    document.body.style.color = tcolor
}
function SwitchTheme (){
    theme = !(theme=='dark')? 'dark' : 'light';
    setTheme()
}
function setTheme(){
    switchers = document.getElementsByClassName('switch');
    Theme()
    saveTheme(theme)
    if (switchers.length > 0) {
        var parent = switchers[0];
        var child = parent.children[0];

        if ((theme=='dark')) child.style.marginLeft = '2.8em';
        else child.style.marginLeft = '.2em';
        switchers[0].style.borderColor = tcolor
        switchers[0].children[0].style.backgroundColor = bgcolor
    } else return;
}
// Helper function to add or remove a class
function toggleClass(element, className, condition) {
    if (condition) {
        element.classList.add(className);
    } else {
        element.classList.remove(className);
    }
}
// Function to handle animations
function handleFade(section, currentScrollTop, lastScrollTop) {
    const rect = section.getBoundingClientRect();
    const isVisible = rect.top < window.innerHeight && rect.bottom > 0;

    if (isVisible) {
        var scrollingDown = currentScrollTop >= lastScrollTop;
        toggleClass(section, 'fade-in', true);
        toggleClass(section, 'fade-out', false);

        if (scrollingDown) {
            if (section == sections[0]) {return}
            section.classList.add('fade-in-from-bottom');
            section.classList.remove('fade-in-from-top');

            if (section == sections[2]) {
                children = section.getElementsByTagName('span');
                let n = 0;
                // console.log('animating')
                Array.from(children).forEach((s) =>{
                    s.style.animation = `UpandDown .5s ease-in-out forwards ${n}s`;
                    n += .1
                });
            }

        } else {
            if (section == sections[-1]) {return}
            section.classList.add('fade-in-from-top');
            section.classList.remove('fade-in-from-bottom');
        }
    } else {
        toggleClass(section, 'fade-in', false);
        toggleClass(section, 'fade-out', true);
    }
}
// Function to handle color changes
function handleColor(section, trueColor) {
    const rect = section.getBoundingClientRect();
    const isMajorityVisible = rect.top >= -window.innerHeight / 2 && rect.top <= window.innerHeight / 2;
    section.style.color = isMajorityVisible ? trueColor : tcolor;
}
// Function to handle background color changes
function handleBackgroundColor(section, trueColor) {
    const rect = section.getBoundingClientRect();
    const isMajorityVisible = -height/2 < rect.top && rect.top < height/2;
    // others.style.backgroundColor = section.style.backgroundColor = isMajorityVisible ? trueColor : '#fff';
    document.body.style.backgroundColor = isMajorityVisible ? trueColor : bgcolor;
}
function ShowProfile(identity) {
    var detail = document.getElementById('detail');
    var id = document.getElementById(identity);
    var others = id.parentElement.children;

    Array.from(others).forEach((prof) => {

        if (prof == id)
            toggleClass(prof, 'profile-clicked', true); //Add the profile details

        else {
            if (prof.getElementsByClassName('profile-detail').length == 0) { //Retrieve the profile details
                let child = detail.children[0];
                let prof_det = child.getElementsByClassName('profile-detail')[0]
                detail.removeChild(child)
                prof_det.parentElement.removeChild(prof_det);
                prof.appendChild(prof_det);
            }
            toggleClass(prof, 'profile-clicked', false);
        }
    });

    //make the section here
    let sect = document.createElement('div');
    let img_content = document.createElement('div');
    let text_content = document.createElement('div');

    sect.classList.add('section');
    img_content.classList.add('image-content');
    text_content.classList.add('text-content');

    //Update the image element and append it to the img-content and furthermore to the sect
    let img = document.createElement('img');
    img.src = id.querySelector('img').src;
    img_content.appendChild(img);

    //Create, update the text details as well
    let name = document.createElement('h1');
    let associate = document.createElement('h3');
    let profile_det = id.getElementsByClassName('profile-detail')[0];

    name.textContent = id.children[1].textContent;
    associate.textContent = id.children[2].textContent;
    id.removeChild(profile_det);

    text_content.appendChild(name);
    text_content.appendChild(associate);
    text_content.appendChild(profile_det);

    //sect additions
    sect.appendChild(img_content);
    sect.appendChild(text_content)


    detail.appendChild(sect);

}

//DOMContentLoaded event listener
document.addEventListener("DOMContentLoaded", function() {
    navbar = document.querySelector('nav');
    let t = document.title.toLowerCase();
    sections = document.getElementsByClassName('section');
    theme = localStorage.getItem('theme') ? localStorage.getItem('theme') : getPreferredTheme();
    setTheme();
    // document.body.children[1].styles.paddingTop = navbar.height;
    // navbar.style.paddingBottom = navbar.height;

    if (t.includes('rocon') || t.includes('home')) {
        const landing = document.getElementById('landing');
        var rocon = document.getElementsByClassName('rocon-title')[0];
        var welcome = document.getElementsByClassName('welcome-title')[0];
        var quote = sections[2].querySelector('h1');
        setTimeout(() => {
            rocon.style.animation = "peekUp .25s ease-in-out forwards";
        }, 500);
        setTimeout(() => {
            rocon.style.animation = "moveRight 1s ease-in-out forwards";
        }, 1000);
        setTimeout(() => {
            rocon.style.animation = "SmoveLeft 1s ease-in-out forwards";
            welcome.style.animation = "peekLeft .75s ease-in-out forwards";
        }, 2000);
        setTimeout(() => {
            rocon.style.animation = "SmoveRight 1s ease-in-out forwards";
            welcome.style.animation = "peekRight .75s ease-in-out forwards";
        }, 3000);
        setTimeout(() => {
            rocon.style.animation = "moveRight 1s ease-in-out forwards reverse";
        }, 4000);
        setTimeout(() => {
            landing.style.animation = "pullOut 1s ease-in-out forwards";
            // mainContent.style.display = 'block';
            // mainContent.style.animation = 'fadeInMain 1s ease-in-out forwards';
        }, 5250)
        sections[3].style.transition = sections[2].style.transition = "color 0.5s ease-in-out";

        quoted.split(" ").forEach(word => {
            s = document.createElement("span");
            s.textContent = word;
        if (quoted.startsWith(word)) s.textContent = '"' + word;
        else if (quoted.endsWith(word)) s.textContent = word + '"';
            quote.appendChild(s)
        });
    } else if (t.includes('feature')) {
        Array.from(sections).forEach((section, index) => {
            let img = section.getElementsByClassName('image-content')[0]
            if (index % 2 == 0) {
                section.style.marginLeft = '10%';
                img.style.borderRadius = '20px 0 0 20px';
                img.style.background = 'linear-gradient(45deg, #3386ee, #632763';
            } else {
                section.style.marginRight = '10%';
                img.style.borderRadius = '0 20px 20px 0';
                img.style.background = 'linear-gradient(45deg, #632763, #3386ee';
            }
        })
    } else if (t.includes('how it work')) {
        Array.from(sections).forEach((section) => {
            contents = section.children;
            Array.from(contents).forEach((cont, index) => {
                if (index % 2 == 0) {
                    cont.style.alignSelf = 'flex-start';
                    cont.style.textAlign = 'right';
                    cont.style.borderRadius = '0 25px 25px 0';
                } else {
                    cont.style.alignSelf = 'flex-end';
                    cont.style.borderRadius = '25px 0 0 25px';
                }
            });
        });
    } else if (t.includes('download')) {
        sections[0].style.opacity = 1
        // handleFade(sections[0], window.scrollY, lastScrollTop);
    }
})

// Scroll event listener
document.addEventListener("scroll", function () {
    let t = document.title.toLowerCase();
    const currentScrollTop = window.scrollY;
    // Theme();
    Array.from(sections).forEach(section => {

        if (t.includes('rocon') || t.includes('home')) {
            handleColor(sections[2], !(theme == 'dark')? '#632763' : '#C64EC6');
            handleColor(sections[3], '#fff');
            handleBackgroundColor(sections[3], ' #632763');
            handleFade(section, currentScrollTop, lastScrollTop);

        } else if (t.includes('feature')) {
            section.style.transition = 'translateX(50vh)';
            handleFade(section, currentScrollTop, lastScrollTop);
        }
    });
})