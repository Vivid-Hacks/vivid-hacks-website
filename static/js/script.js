let allQuestions = document.querySelectorAll("#faqs .question");
for (let p = 0; p < allQuestions.length; p++) {
    allQuestions[p].children[1].classList.add("invisible");
    allQuestions[p].children[0].innerHTML = '<i class="fas fa-plus-circle"></i> ' + allQuestions[p].children[0].innerHTML
    allQuestions[p].addEventListener("click", function (event) {
        this.children[1].classList.toggle("invisible");
        this.children[1].classList.toggle("normal-height");
        var contentHeight = $(allQuestions[p].children[1]).outerHeight(true) + 25;
        $(allQuestions[p]).animate({ "height": contentHeight }, 200);
    })
}
let allLinks = document.querySelectorAll("a");
for (let i = 0; i < allLinks.length; i++) {
    if (allLinks[i].getAttribute("href") === null) continue;
    if (allLinks[i].getAttribute("href").startsWith("/") || allLinks[i].getAttribute("href").startsWith("#")) continue;
    allLinks[i].target = "_blank"
}
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}
window.addEventListener('click', function (e) {
    if (document.getElementsByClassName('mobile')[0].contains(e.target)) {
        // Clicked in box
    } else {
        hideMobileNavbar();
    }
});
async function showMobileNavbar() {
    document.getElementsByClassName("right-navbar")[0].style.left = "10px";
    document.getElementsByClassName("top-bar")[0].style.top = "-61px";
    await sleep(500)
    document.getElementsByClassName("right-navbar")[0].style.left = "0px";
}
function hideMobileNavbar() {
    document.getElementsByClassName("right-navbar")[0].style.left = "-500px";
    document.getElementsByClassName("top-bar")[0].style.top = "0";
}
function toggleMobileNavbar() {
    if (document.getElementsByClassName("right-navbar")[0].style.left !== "0px") {
        showMobileNavbar();
    } else {
        hideMobileNavbar();
    }
}

var modalOpen = false;
    function join() {
        if (modalOpen === true) return;
        document.querySelectorAll(".body")[0].classList.add("opaque");
        document.querySelectorAll(".signup-modal")[0].classList.remove('notvisible')
        setTimeout(function () { modalOpen = true; }, 100)
    }
    document.addEventListener("click", function (event) {
        if (modalOpen === false) return;
        var isClickInsideElement = document.querySelectorAll(".signup-modal")[0].contains(event.target);
        if (!isClickInsideElement) {
            document.querySelectorAll(".body")[0].classList.remove("opaque");
            document.querySelectorAll(".signup-modal")[0].classList.add('notvisible');
            modalOpen = false;
        }
    })
    function removeEvntLisnr(el) {
        elClone = el.cloneNode(true);

        el.parentNode.replaceChild(elClone, el);
    }
    function sendForm() {
        let name = document.getElementById("signup-name").value;
        let email = document.getElementById("signup-email").value;
        let xp = document.getElementById("signup-xp").value;
        var bad = false;
        if (name === "") {
            bad = true;
            document.querySelectorAll("[for=signup-name]")[1].innerText = "This field is required!";
        } else {
            document.querySelectorAll("[for=signup-name]")[1].innerHTML = "&nbsp";
        }

        if (email === "") {
            bad = true;
            document.querySelectorAll("[for=signup-email]")[1].innerText = "This field is required!";
        } else {
            document.querySelectorAll("[for=signup-email]")[1].innerHTML = "&nbsp";
        }

        if (xp === "") {
            bad = true;
            document.querySelectorAll("[for=signup-xp]")[1].innerText = "This field is required!";
        } else {
            document.querySelectorAll("[for=signup-xp]")[1].innerHTML = "&nbsp";
        }
        if (Number(xp) > 10) {
            document.querySelectorAll("[for=signup-xp]")[1].innerText = "A number from 1-10 please!";
            bad = true;
        } else {
            document.querySelectorAll("[for=signup-xp]")[1].innerHTML = "&nbsp";
        }
        requiredMessages();
        if (validateEmail(email) === false) {
            bad = true;
            document.querySelectorAll("[for=signup-email]")[1].innerText = "Valid emails please!";
        } else {
            document.querySelectorAll("[for=signup-xp]")[1].innerHTML = "&nbsp";
        }
        if (bad === true) return;
        fetch("https://vividhacks-backend.vercel.app/api/endpoint?query=waitlist", {
            method: "POST",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                email: email,
                name: name,
                level: Number(xp)
            })
        }).then(function(res){return res.text()}).then(function(result){
            alert(result)
        })
    }
    function requiredMessages() {
        document.addEventListener("keypress", function () {
            setTimeout(next, 10);
            function next() {
                let name = document.getElementById("signup-name").value;
                let email = document.getElementById("signup-email").value;
                let xp = document.getElementById("signup-xp").value;

                if (name === "") {
                    bad = true;
                    document.querySelectorAll("[for=signup-name]")[1].innerText = "This field is required!";
                } else {
                    document.querySelectorAll("[for=signup-name]")[1].innerHTML = "&nbsp";
                }

                if (email === "") {
                    bad = true;
                    document.querySelectorAll("[for=signup-email]")[1].innerText = "This field is required!";
                } else {
                    document.querySelectorAll("[for=signup-email]")[1].innerHTML = "&nbsp";
                }

                if (xp === "") {
                    bad = true;
                    document.querySelectorAll("[for=signup-xp]")[1].innerText = "This field is required!";
                } else {
                    document.querySelectorAll("[for=signup-xp]")[1].innerHTML = "&nbsp";
                }
                if (Number(xp) > 10) {
                    document.querySelectorAll("[for=signup-xp]")[1].innerText = "A number from 1-10 please!";
                    bad = true;
                } else {
                    document.querySelectorAll("[for=signup-xp]")[1].innerHTML = "&nbsp";
                }
                if (validateEmail(email) === false) {
                    bad = true;
                    document.querySelectorAll("[for=signup-email]")[1].innerText = "Valid emails please!";
                } else {
                    document.querySelectorAll("[for=signup-xp]")[1].innerHTML = "&nbsp";
                }
            }
        })
    }
    function validateEmail(emailAdress) {
        let regexEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        if (emailAdress.match(regexEmail)) {
            return true;
        } else {
            return false;
        }
    }