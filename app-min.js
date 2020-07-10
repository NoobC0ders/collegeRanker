const navCon = document.getElementById('navCon');
const navLinks = document.getElementById('navLinks');

function addNavCon(event) {

    let x = window.matchMedia("(max-width: 920px)")
    if (x.matches) { // If media query matches
        if (navCon.style.height == '100vh') {
            event.classList.remove("active");
            navCon.style.position = "fixed";
            return navCon.style.height = '0em';

        }

        console.log(event);
        navCon.style.height = '100vh';
        event.classList.add("active");
        navCon.style.position = "absolute";
        return;
    }



    if (navCon.style.height == '30em' || navCon.style.height == '100vh') {
        event.classList.toggle("active");
        navCon.style.position = "absolute";
        return navCon.style.height = '0em';

    }

    console.log(event);
    navCon.style.height = '30em';
    event.classList.toggle("active");
    // navCon.style.position = "relative";

    // console.log(navCon);

}

function viewLinks(event) {

    if (navLinks.style.transform == 'scale(1)') {
        navLinks.style.transform = 'scale(0)';
        navCon.style.height = '0em';
        document.body.getElementsByClassName("active")[0].classList.remove("active");
        return
    }
    navLinks.style.transform = 'scale(1)';
}

const showNavLinks = () => {
    let x = window.innerWidth;
    if (x > 840) {
        navLinks.style.transform = 'scale(1)';
        document.body.getElementsByClassName("active").classList.remove('active');

        navCon.style.height = '0em';
    } else
        navLinks.style.transform = 'scale(0)';
    document.body.getElementsByClassName("active")[0].classList.remove("active");
    navCon.style.height = '0em';


};


window.addEventListener('resize', showNavLinks);