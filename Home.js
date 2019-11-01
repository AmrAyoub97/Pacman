var UP_MOVE_key = 38;
var DOWN_MOVE_key = 40;
var Enter_key = 13;
var Esc_key = 27;
var helpPage = document.getElementById("help");


var arr = [function OpenNewGame() {
    open('Pacman.html')
}, function OpenHelp() {
    helpPage.setAttribute('style', 'visibility:visible;')
    console.log("Help")
},
function Exit() {
    console.log("Exit")
    window.close()
}]
var ind = 0;
var menu = document.querySelectorAll('p');
document.addEventListener('keydown', function (e) {
    //console.log(e.keyCode)
    if (e.keyCode == UP_MOVE_key) {
        if (ind > 0) {
            menu[ind].style.color = 'white';
            ind--;
            menu[ind].style.color = 'yellow'
        }
    }
    else if (e.keyCode == Esc_key) {
        helpPage.setAttribute('style', 'visibilityy:hidden;')
    }
    else if (e.keyCode == DOWN_MOVE_key) {
        if (ind < 2) {
            menu[ind].style.color = 'white';
            ind++;
            menu[ind].style.color = 'yellow'
        }
    }
    else if (e.keyCode == Enter_key) {
        arr[ind]()
    }
})

