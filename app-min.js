const navCon = document.getElementById('navCon');
const navLinks = document.getElementById('navLinks');

function addNavCon(event) {

    let x = window.matchMedia("(max-width: 920px)")
    if (x.matches) { // If media query matches
        if (navCon.style.height == '80vh') {
            // event.classList.remove("active");
            navCon.style.position = "absolute";
            document.getElementById('dropdownicon').style.transform = 'rotateX(0deg)';
            return navCon.style.height = '0em';
        }

        console.log(event);
        document.getElementById('dropdownicon').style.transform = 'rotateX(180deg)';
        navCon.style.height = '80vh';
        // event.classList.add("active");
        navCon.style.position = "absolute";
        return;
    }

    /***************************************************************/

    if (navCon.style.height == '30em' || navCon.style.height == '100vh') {

        document.getElementById('dropdownicon').style.transform = 'rotateZ(0deg)';
        navCon.style.position = "absolute";
        return navCon.style.height = '0em';

    }
    document.getElementById('dropdownicon').style.transform = 'rotateZ(180deg)';

    navCon.style.height = '30em';

}
/****************************************************************/
function viewLinks(element, {
    expand
}) {
    let x = window.innerWidth;

    // for small screen
    if (x < 601) {
        if (!expand) {
            navLinks.style.height = '100vh';
            navLinks.style.display = 'block';
            element.setAttribute("onclick", 'viewLinks(this, {expand:true})');
        } else {
            navLinks.style.height = '0vh';
            navLinks.style.display = 'none';
            element.setAttribute("onclick", 'viewLinks(this, {expand:false})');
        }

    }

    // for small screen
    if (x < 841) {
        if (!expand) {
            // navLinks.style.height = '100vh';
            navLinks.style.display = 'block';
            element.setAttribute("onclick", 'viewLinks(this, {expand:true})');
        } else {
            // navLinks.style.height = '0vh';
            navLinks.style.display = 'none';
            element.setAttribute("onclick", 'viewLinks(this, {expand:false})');
        }

    }



    // if (navLinks.style.transform == 'scale(1)') {
    //     navLinks.style.transform = 'scale(0)';
    //     navCon.style.height = '0em';
    //     document.body.getElementsByClassName("active")[0].classList.remove("active");
    //     return
    // }
    // navLinks.style.transform = 'scale(1)';
}

const showNavLinks = () => {
    let x = window.innerWidth;
    if (x > 840) {
        document.getElementById('dropdownicon').style.transform = 'rotateX(0deg)';

        navLinks.style.transform = 'scale(1)';
        // document.body.getElementsByClassName("active").classList.remove('active');

        navCon.style.height = '0em';
    } else {
        navLinks.style.transform = 'scale(0)';
        // document.body.getElementsByClassName("active")[0].classList.remove("active");
        navCon.style.height = '0em';
    }

};



function showDegree(element, {
    expand
}) {


    //close engg degree
    document.getElementById('engg').setAttribute("onclick", 'showDegree(this,{expand:false})');
    document.getElementById('engg').children[0].style.transform = 'rotateZ(0deg)';
    document.getElementById('engg').children[1].style.display = 'none';

    //close medical degree
    document.getElementById('medical').setAttribute("onclick", 'showDegree(this,{expand:false})');
    document.getElementById('medical').children[0].style.transform = 'rotateZ(0deg)';
    document.getElementById('medical').children[1].style.display = 'none';

    //close engg degree
    document.getElementById('management').setAttribute("onclick", 'showDegree(this,{expand:false})');
    document.getElementById('management').children[0].style.transform = 'rotateZ(0deg)';
    document.getElementById('management').children[1].style.display = 'none';

    //close engg degree
    document.getElementById('commerce').setAttribute("onclick", 'showDegree(this,{expand:false})');
    document.getElementById('commerce').children[0].style.transform = 'rotateZ(0deg)';
    document.getElementById('commerce').children[1].style.display = 'none';

    //close engg degree
    document.getElementById('art').setAttribute("onclick", 'showDegree(this,{expand:false})');
    document.getElementById('art').children[0].style.transform = 'rotateZ(0deg)';
    document.getElementById('art').children[1].style.display = 'none';

    if (expand) {

        element.setAttribute("onclick", 'showDegree(this,{expand:false})');
        console.log(element.children[0].style.transform = 'rotateZ(0deg)');
        element.children[1].style.display = 'none';

    } else {
        console.log(element.children[0].style.transform = 'rotateZ(90deg)');
        element.setAttribute("onclick", 'showDegree(this,{expand:true})');
        element.children[1].style.display = 'block';

    }

}



// window.addEventListener('resize', showNavLinks);