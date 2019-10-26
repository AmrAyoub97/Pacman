var maze = mze
var pacman = document.getElementById('pacmanOverlay');
var CurrentFace = -1;
var deltaX = 1;
var deltaY = 1;
var timeInterval = 10;
var myInt;
var currDir = 0;
var nxtDir = 0;
var PAUSE_key = 80;
var LEFT_MOVE_key = 37;
var UP_MOVE_key = 38;
var RIGHT_MOVE_key = 39;
var DOWN_MOVE_key = 40;
var SIZE = 27;
var lastState = 0;
var x = parseInt(pacman.style.left);//x-axis(l,r)
var y = parseInt(pacman.style.top);//y-axis(u,d)
document.addEventListener('keydown', function (e) {

    if (e.keyCode == PAUSE_key) {//game paused
        stopPacman()
    }
    else if (e.keyCode == LEFT_MOVE_key) // left
    {
        //debugger;
        if (currDir != 0) {
            nxtDir = 'l'
        } else {
            if (checkBlockTypeAtDirection('l') != "wall") {
                PacmanMoveLeft()
            }
        }
    }
    else if (e.keyCode == UP_MOVE_key) // up
    {
        //debugger;
        if (currDir != 0) {
            nxtDir = 'u'
        }
        else {
            if (checkBlockTypeAtDirection('u') != "wall") {
                PacmanMoveUp()
            }
        }
    }
    else if (e.keyCode == RIGHT_MOVE_key) //right
    {
        //debugger;
        if (currDir != 0) {
            nxtDir = 'r'
        }
        else {
            if (checkBlockTypeAtDirection('r') != "wall") {
                PacmanMoveRight()
            }
        }
    }
    else if (e.keyCode == DOWN_MOVE_key) //down
    {
        //debugger;
        if (currDir != 0) {
            nxtDir = 'd'
        }
        else {
            if (checkBlockTypeAtDirection('d') != "wall") {
                PacmanMoveDown()
            }
        }
    }
    console.log(currDir + ": Current Direction")
    console.log(nxtDir + ": Next Direction")

})
function stopPacman() {
    window.clearInterval(myInt);
}
function ChangeDirction(cur, next) {
    if (cur == next) { return; }
    else if (next == 'u') {
        if (checkBlockTypeAtDirection('u') != "wall") {
            nxtDir = 0;
            PacmanMoveUp()
        }
    }
    else if (next == 'd') {
        if (checkBlockTypeAtDirection('d') != "wall") {
            nxtDir = 0;
            PacmanMoveDown()
        }
    }
    else if (next == 'l') {
        if (checkBlockTypeAtDirection('l') != "wall") {
            nxtDir = 0;
            PacmanMoveLeft()
        }
    }
    else if (next == 'r') {
        if (checkBlockTypeAtDirection('r') != "wall") {
            nxtDir = 0;
            PacmanMoveRight()
        }
    }
}
function PacmanMoveLeft() {
    currDir = 'l';
    if (CurrentFace != -1) {
        pacman.classList.remove(CurrentFace);
    }
    pacman.classList.add('MoveLeft');
    CurrentFace = 'MoveLeft';

    if (myInt != null) {
        stopPacman()
    }

    myInt = setInterval(function () {
        var nxtBlk = checkBlockTypeAtDirection('l');
        console.log(nxtBlk)
        if (nxtBlk != null) {//step done
            if (nxtDir != 0) {
                if (checkBlockTypeAtDirection(nxtDir) != "wall") {
                    ChangeDirction(currDir, nxtDir)
                } else {
                    x -= deltaX;
                    pacman.style.left = (x).toString() + 'px';
                }
            } else {
                if (nxtBlk == "wall")
                    stopPacman()
                else {
                    x -= deltaX;
                    pacman.style.left = (x).toString() + 'px';
                }
            }
        }
        else {
            x -= deltaX;
            pacman.style.left = (x).toString() + 'px';
        }
    }, timeInterval);
}
function PacmanMoveRight() {
    currDir = 'r';
    if (CurrentFace != -1) {
        pacman.classList.remove(CurrentFace);
    }

    pacman.classList.add('MoveRight');
    CurrentFace = 'MoveRight';

    if (myInt != null) {
        stopPacman()
    }

    myInt = setInterval(function () {
        var nxtBlk = checkBlockTypeAtDirection('r');
        console.log(nxtBlk)
        if (nxtBlk != null) {//step done
            if (nxtDir != 0) {
                if (checkBlockTypeAtDirection(nxtDir) != "wall") {
                    ChangeDirction(currDir, nxtDir)
                } else {
                    x += deltaX;
                    pacman.style.left = (x).toString() + 'px';
                }
            } else {
                if (nxtBlk == "wall")
                    stopPacman()
                else {
                    x += deltaX;
                    pacman.style.left = (x).toString() + 'px';
                }
            }
        }
        else {
            x += deltaX;
            pacman.style.left = (x).toString() + 'px';
        }
    }, timeInterval);
}
function PacmanMoveUp() {
    currDir = 'u';

    if (CurrentFace != -1) {
        pacman.classList.remove(CurrentFace);
    }

    pacman.classList.add('MoveUp');
    CurrentFace = 'MoveUp';

    if (myInt != null) {
        stopPacman()
    }

    myInt = setInterval(function () {
        var nxtBlk = checkBlockTypeAtDirection('u');
        console.log(nxtBlk)
        if (nxtBlk != null) {//step done
            if (nxtDir != 0) {
                if (checkBlockTypeAtDirection(nxtDir) != "wall") {
                    ChangeDirction(currDir, nxtDir)
                } else {
                    y -= deltaY;
                    pacman.style.top = (y).toString() + 'px';
                }
            } else {
                if (nxtBlk == "wall")
                    stopPacman()
                else {
                    y -= deltaY;
                    pacman.style.top = (y).toString() + 'px';
                }
            }
        }
        else {
            y -= deltaY;
            pacman.style.top = (y).toString() + 'px';
        }
    }, timeInterval);
}
function PacmanMoveDown() {
    currDir = 'd';

    if (CurrentFace != -1) {
        pacman.classList.remove(CurrentFace);
    }

    pacman.classList.add('MoveDown');
    CurrentFace = 'MoveDown';

    if (myInt != null) {
        stopPacman()
    }

    myInt = setInterval(function () {
        var nxtBlk = checkBlockTypeAtDirection('d');
        console.log(nxtBlk)
        if (nxtBlk != null) {//step done
            if (nxtDir != 0) {
                if (checkBlockTypeAtDirection(nxtDir) != "wall") {
                    ChangeDirction(currDir, nxtDir)
                } else {
                    y += deltaY;
                    pacman.style.left = (y).toString() + 'px';
                }
            } else {
                if (nxtBlk == "wall")
                    stopPacman()
                else {
                    y += deltaY;
                    pacman.style.top = (y).toString() + 'px';
                }
            }
        }
        else {
            y += deltaY;
            pacman.style.top = (y).toString() + 'px';
        }
    }, timeInterval);
}
function checkBlockTypeAtDirection(dir) {
    if (dir == 'l') {
        var type = null;
        var block = (document.getElementById(`bt_${y}+l${x - 27}`) != null) ? true : false;
        if (block == true) {
            if (maze[y / 27][(x - 27) / 27] == '.') {
                type = "food"
            }
            else if (maze[y / 27][(x - 27) / 27] == 'x') {
                type = "empty";
            }

            else if (maze[y / 27][(x - 27) / 27] == 'P') {
                type = "empty";
            }
            else {
                type = "wall"
            }
        }
        return type;
    }
    else if (dir == 'r') {
        var type = null;
        var block = (document.getElementById(`bt_${y}+l${x + 27}`) != null) ? true : false;
        if (block == true) {
            if (maze[y / 27][(x + 27) / 27] == '.') {
                type = "food";
            }
            else if (maze[y / 27][(x + 27) / 27] == 'x') {
                type = "empty";
            }

            else if (maze[y / 27][(x + 27) / 27] == 'P') {
                type = "empty";
            }
            else {
                type = "wall"
            }
        }
        return type;
    }
    else if (dir == 'u') {
        var type = null
        var block = (document.getElementById(`bt_${y - 27}+l${x}`) != null) ? true : false;
        if (block == true) {
            if (maze[(y - 27) / 27][x / 27] == '.') {
                type = "food";
            }
            else if (maze[(y - 27) / 27][x / 27] == 'x') {
                type = "empty";
            }
            else if (maze[(y - 27) / 27][x / 27] == 'P') {
                type = "empty";
            }
            else {
                type = "wall"
            }
        }
        return type;
    }
    else if (dir == 'd') {
        var type = null
        var block = (document.getElementById(`bt_${y + 27}+l${x}`) != null) ? true : false;
        if (block == true) {
            if (maze[(y + 27) / 27][x / 27] == '.') {
                type = "food";
            }
            else if (maze[(y + 27) / 27][x / 27] == 'x') {
                type = "empty";
            }

            else if (maze[(y + 27) / 27][x / 27] == 'P') {
                type = "empty";
            }
            else {
                type = "wall"
            }
        }
        return type;
    }
}