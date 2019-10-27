var UP_MOVE_key = 38;
var DOWN_MOVE_key = 40;
var Enter_key = 13;

var arr = [function OpenNewGame() {
    open('Pacman.html')
}, function OpenHelp() {
    console.log("Help")
},
function Exit() {
    console.log("Exit")
    window.close()
}]
var ind = 0;
var menu = document.querySelectorAll('p');
document.addEventListener('keydown', function (e) {

    console.log(e.keyCode)
    if (e.keyCode == UP_MOVE_key) {
        if (ind > 0) {
            menu[ind].style.color = 'white';
            ind--;
            menu[ind].style.color = 'yellow'
        }
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

