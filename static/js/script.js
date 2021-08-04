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