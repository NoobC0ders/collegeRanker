const collegeCon = document.getElementById('collegeCon');
const navLinks = document.getElementById('navLinks');

function addNavCon(id, {
    expand
}) {
    element = document.getElementById(id);
    if (expand) {
        element.setAttribute("onclick", 'addNavCon(`collageDropDown`,{expand:false})');
        x = window.matchMedia("(max-width: 600px)")
        if (x.matches) {
            element.classList.remove('active1');
        }
        collegeCon.style.position = "absolute";
        element.children[0].style.transform = 'rotateZ(0deg)';
        collegeCon.style.height = '0em';
    } else {
        element.setAttribute("onclick", 'addNavCon(`collageDropDown`,{expand:true})');
        x = window.matchMedia("(max-width: 600px)")
        if (x.matches) {
            element.classList.add('active1');
            element.children[0].style.transform = 'rotateZ(180deg)';
            collegeCon.style.height = '80vh';
            collegeCon.style.position = "absolute";
            return
        }

        x = window.matchMedia("(max-width: 1820px)")
        if (x.matches) {
            element.children[0].style.transform = 'rotateZ(180deg)';
            collegeCon.style.height = '30em';
        }
    }



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
            addNavCon('collageDropDown', {
                expand: true
            });
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
    //     collegeCon.style.height = '0em';
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

        collegeCon.style.height = '0em';
    } else {
        navLinks.style.transform = 'scale(0)';
        // document.body.getElementsByClassName("active")[0].classList.remove("active");
        collegeCon.style.height = '0em';
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



let modal = document.getElementById("myModal");
let regmodal = document.getElementById("regModal");

// Get the button that opens the modal
let btn = document.getElementById("myBtn");



// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];
var regspan = document.getElementById("regclose");


// When the user clicks on the button, open the modal
btn.onclick = function () {
    modal.style.display = "block";
}


// When the user clicks on <span> (x), close the modal
span.onclick = function () {
    modal.style.display = "none";
}
regspan.onclick = function () {
    regmodal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function (event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
    if (event.target == regModal) {
        regmodal.style.display = "none";
    }
}



// window.addEventListener('resize', showNavLinks);


/*******************************For hamburgur effect********************************** */
/**
 * forEach implementation for Objects/NodeLists/Arrays, automatic type loops and context options
 *
 * @private
 * @author Todd Motto
 * @link https://github.com/toddmotto/foreach
 * @param {Array|Object|NodeList} collection - Collection of items to iterate, could be an Array, Object or NodeList
 * @callback requestCallback      callback   - Callback function for each iteration.
 * @param {Array|Object|NodeList} scope=null - Object/NodeList/Array that forEach is iterating over, to use as the this value when executing callback.
 * @returns {}
 */
var forEach = function (t, o, r) {
    if ("[object Object]" === Object.prototype.toString.call(t))
        for (var c in t) Object.prototype.hasOwnProperty.call(t, c) && o.call(r, t[c], c, t);
    else
        for (var e = 0, l = t.length; l > e; e++) o.call(r, t[e], e, t)
};

var hamburgers = document.querySelectorAll(".hamburger");
if (hamburgers.length > 0) {
    forEach(hamburgers, function (hamburger) {
        hamburger.addEventListener("click", function () {
            this.classList.toggle("is-active");
        }, false);
    });
}


function showFilterDegree(element, {
    childID,
    expand
}) {


    if (!expand) {
        let onClick = `showFilterDegree(this,{childID:'${childID}',expand:true,})`;
        element.setAttribute("onclick", onClick);
        console.log(element.children[0].style.transform = 'rotateZ(90deg)');
        document.getElementById(childID).style.height = "auto";
        document.getElementById(childID).style.overflow = "visible";
        document.getElementById(childID).style.transition = "0.5s ease-in-out";

    } else {
        let onClick = `showFilterDegree(this,{childID:'${childID}',expand:false,})`;
        element.setAttribute("onclick", onClick);
        console.log(element.children[0].style.transform = 'rotateZ(0deg)');
        document.getElementById(childID).style.height = "0px";
        document.getElementById(childID).style.overflow = "hidden";
    }
}

showFilterDegree(document.getElementById('enggFilter'), {
    childID: 'enggdegree',
    expand: false
});

function checkLength(event) {
    const value = event.value;
    if (value.length > 10) {
        document.getElementById("regSubmit").disabled = true;
        document.getElementById('mobileErr').innerText = "Length of mobile number is more than 10";

        // window.alert("length of mobile number is more than 10");

    } else {
        document.getElementById('mobileErr').innerText = "";

        document.getElementById('regSubmit').disabled = false;
    }
}

Notiflix.Notify.Init({
    fontFamily: "Quicksand",
    useGoogleFont: true,
    position: "right-bottom",
    closeButton: true,
});