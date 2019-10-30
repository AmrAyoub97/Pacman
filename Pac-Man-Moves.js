var Currentlevel = 0;
var NumofFood = SetupUi(Currentlevel);
var pacman = document.getElementById('pacmanOverlay');
var CurrentFace;
var myInt;

var PacmanX = parseInt(pacman.style.left);
var PacmanY = parseInt(pacman.style.top);
var delay = 35;

var Inprogressflag = false;
var contstate;

var audio = new Audio('resources/waka.mp3');

var maze;
maze = GenMaze(Currentlevel);
var Nrow = maze.length;
var Ncol = maze[0].length;
var Points=0;


function checkbroder(Currentx, Currenty, CurrentFace) {
    var Xrow = Currentx;
    var Ycol = Currenty;

    if (Currentx == 0 && CurrentFace == 'MoveUp') {
        return true;
    }
    else if (Currentx == Nrow - 1 && CurrentFace == 'MoveDown') {
        return true;
    }
    else if (Currenty == 0 && CurrentFace == 'MoveLeft') {
        return true;
    }
    else if (Currenty == Ncol - 1 && CurrentFace == 'MoveRight') {
        return true;
    }

    else if (CurrentFace == 'MoveLeft' && !(maze[Xrow][Ycol - 1] == 'x' || maze[Xrow][Ycol - 1] == '.')) { return true; }

    else if (CurrentFace == 'MoveRight' && !(maze[Xrow][Ycol + 1] == 'x' || maze[Xrow][Ycol + 1] == '.')) { return true; }

    if (CurrentFace == 'MoveUp' && !(maze[Xrow - 1][Ycol] == 'x' || maze[Xrow - 1][Ycol] == '.')) { return true; }

    else if (CurrentFace == 'MoveDown' && !(maze[Xrow + 1][Ycol] == 'x' || maze[Xrow + 1][Ycol] == '.')) { return true; }

    return false;
}

function CheckWall(DesireState) {

    if ((DesireState == 'MoveUp' || DesireState == 'MoveDown') && CurrentFace == 'MoveLeft') {
        var tempx = PacmanX;
        var tempy = PacmanY;

        if (PacmanX % 27 < 21) {
            tempx = PacmanX - (PacmanX % 27)
        }
        else {
            tempx = PacmanX + (27 - (PacmanX % 27))
        }

        if (DesireState == 'MoveUp' && (maze[(tempy / 27) - 1][tempx / 27] == '.' || maze[(tempy / 27) - 1][tempx / 27] == 'x'))
            return false;

        else if (DesireState == 'MoveDown' && (maze[(tempy / 27) + 1][tempx / 27] == '.' || maze[(tempy / 27) + 1][tempx / 27] == 'x'))
            return false;

        return true;
    }
    else if ((DesireState == 'MoveUp' || DesireState == 'MoveDown') && CurrentFace == 'MoveRight') {
        var tempx = PacmanX;
        var tempy = PacmanY;
        if (PacmanX % 27 > 6) {
            tempx = PacmanX + (27 - (PacmanX % 27))
        }
        else {
            tempx = PacmanX - (PacmanX % 27)
        }
        if (DesireState == 'MoveUp' && (maze[(tempy / 27) - 1][tempx / 27] == '.' || maze[(tempy / 27) - 1][tempx / 27] == 'x'))
            return false;

        if (DesireState == 'MoveDown' && (maze[(tempy / 27) + 1][tempx / 27] == '.' || maze[(tempy / 27) + 1][tempx / 27] == 'x'))
            return false;

        return true;
    }
    else if ((DesireState == 'MoveRight' || DesireState == 'MoveLeft') && CurrentFace == 'MoveUp') {
        var tempx = PacmanX;
        var tempy = PacmanY;

        if (PacmanY % 27 < 21) {
            tempy = PacmanY - (PacmanY % 27);
        }
        else {
            tempy = PacmanY + (27 - PacmanY % 27);
        }
        if (DesireState == 'MoveRight' && (maze[tempy / 27][(tempx / 27) + 1] == '.' || maze[tempy / 27][(tempx / 27) + 1] == 'x'))
            return false;
        if (DesireState == 'MoveLeft' && (maze[tempy / 27][(tempx / 27) - 1] == '.' || maze[tempy / 27][(tempx / 27) - 1] == 'x'))
            return false;

        return true;
    }

    else if ((DesireState == 'MoveRight' || DesireState == 'MoveLeft') && CurrentFace == 'MoveDown') {
        var tempx = PacmanX;
        var tempy = PacmanY;
        if (PacmanY % 27 > 6) {
            tempy = PacmanY + (27 - PacmanY % 27);
        }
        else {
            tempy = PacmanY - (PacmanY % 27);
        }
        if (DesireState == 'MoveRight' && (maze[tempy / 27][(tempx / 27) + 1] == '.' || maze[tempy / 27][(tempx / 27) + 1] == 'x'))
            return false;
        if (DesireState == 'MoveLeft' && (maze[tempy / 27][(tempx / 27) - 1] == '.' || maze[tempy / 27][(tempx / 27) - 1] == 'x'))
            return false;

        return true;
    }
}

function SetPixel(DesireState) {
    if ((DesireState == 'MoveUp' || DesireState == 'MoveDown') && CurrentFace == 'MoveLeft') {
        if (myInt != null) {
            window.clearInterval(myInt);
        }
        if (contstate != null) {
            window.clearInterval(contstate);
        }

        if (PacmanX % 27 < 21) {
            contstate = setInterval(function () {
                if (PacmanX % 27 == 0) {
                    window.clearInterval(contstate);
                }
                else {
                    PacmanX -= 3;
                    pacman.style.left = (PacmanX).toString() + 'px';
                }
            }, delay);
        }
        else {
            contstate = setInterval(function () {
                if (PacmanX % 27 == 0) {
                    window.clearInterval(contstate);
                }
                else {
                    PacmanX += 3;
                    pacman.style.left = (PacmanX).toString() + 'px';
                }
            }, delay);
        }
    }

    else if ((DesireState == 'MoveUp' || DesireState == 'MoveDown') && CurrentFace == 'MoveRight') {
        if (myInt != null) {
            window.clearInterval(myInt);
        }
        if (contstate != null) {
            window.clearInterval(contstate);
        }

        if (PacmanX % 27 > 6) {
            contstate = setInterval(function () {
                if (PacmanX % 27 == 0) {
                    window.clearInterval(contstate);
                }
                else {
                    PacmanX += 3;
                    pacman.style.left = (PacmanX).toString() + 'px';
                }

            }, delay);
        }
        else {
            contstate = setInterval(function () {
                if (PacmanX % 27 == 0) {

                    window.clearInterval(contstate);
                }
                else {
                    PacmanX -= 3;
                    pacman.style.left = (PacmanX).toString() + 'px';
                }
            }, delay);
        }
    }

    else if ((DesireState == 'MoveRight' || DesireState == 'MoveLeft') && CurrentFace == 'MoveUp') {
        if (myInt != null) {
            window.clearInterval(myInt);
        }
        if (contstate != null) {
            window.clearInterval(contstate);
        }
        if (PacmanY % 27 < 21) {
            contstate = setInterval(function () {
                if (PacmanY % 27 == 0) {
                    window.clearInterval(contstate);
                }
                else {
                    PacmanY -= 3;
                    pacman.style.top = (PacmanY).toString() + 'px';
                }
            }, delay - 30);
        }
        else {

            contstate = setInterval(function () {
                if (PacmanY % 27 == 0) {
                    window.clearInterval(contstate);
                }
                else {
                    PacmanY += 3;
                    pacman.style.top = (PacmanY).toString() + 'px';
                }
            }, delay - 30);

        }

    }
    else if ((DesireState == 'MoveRight' || DesireState == 'MoveLeft') && CurrentFace == 'MoveDown') {
        if (myInt != null) {
            window.clearInterval(myInt);
        }
        if (contstate != null) {
            window.clearInterval(contstate);
        }
        if (PacmanY % 27 > 6) {
            contstate = setInterval(function () {
                if (PacmanY % 27 == 0) {
                    window.clearInterval(contstate);
                }
                else {
                    PacmanY += 3;
                    pacman.style.top = (PacmanY).toString() + 'px';
                }
            }, delay - 30);
        }

        else {

            contstate = setInterval(function () {
                if (PacmanY % 27 == 0) {
                    window.clearInterval(contstate);
                }
                else {
                    PacmanY -= 3;
                    pacman.style.top = (PacmanY).toString() + 'px';
                }
            }, delay - 30);

        }
    }
}

var MoveLeft = function () {

    if (CurrentFace != null) {
        pacman.classList.remove(CurrentFace);
    }

    pacman.classList.add('MoveLeft');
    CurrentFace = 'MoveLeft';

    if (myInt != null) {
        window.clearInterval(myInt);
    }
    myInt = setInterval(function () {

        var row = PacmanY / 27;
        var col = PacmanX / 27;

        if (PacmanY % 27 == 0 && PacmanX % 27 == 0 && maze[row][col] == '.') {
            document.getElementById((PacmanY).toString() + (PacmanX).toString()).src = 'resources/' + 'x' + '.png';
            NumofFood -= 1;
            maze[row][col] = 'x';

            document.getElementById('Points').innerHTML=` ${Points}`;
            Points+=1;

            if (audio.duration > 0)
                audio.play();
            if (NumofFood == 0) {
                Points=1
                document.getElementById('Points').innerHTML=` ${Points}`;
                window.clearInterval(myInt);
                showStatus('w')
                setTimeout(function () {


                }, 1000);
                setTimeout(function () {

                    document.getElementById('dialog').setAttribute('style', 'display: none');

                    NumofFood = UpdateUi(Currentlevel + 1);
                    maze = GenMaze(Currentlevel + 1);
                    Currentlevel += 1;
                    PacmanX = parseInt(pacman.style.left);
                    PacmanY = parseInt(pacman.style.top);
                    var Nrow = maze.length;
                    var Ncol = maze[0].length;

                    pacman.classList.remove(CurrentFace);
                    document.getElementById('pacmanOverlay').style.backgroundImage = 'resources/Right/pac1.png';


                }, 2000);
            }

        }

        if (PacmanX % 27 == 0 && checkbroder(row, col, CurrentFace)) {
            window.clearInterval(myInt);
        }

        else {
            PacmanX -= 3;
            pacman.style.left = (PacmanX).toString() + 'px';
        }


    }, delay);
}
var MoveRight = function () {

    if (CurrentFace != -1) {
        pacman.classList.remove(CurrentFace);
    }
    pacman.classList.add('MoveRight');
    CurrentFace = 'MoveRight';

    if (myInt != null) {
        window.clearInterval(myInt);
    }
    myInt = setInterval(function () {

        var row = PacmanY / 27;
        var col = PacmanX / 27;

<<<<<<< HEAD
        if (y % 27 == 0 && x % 27 == 0 && maze[row][col] == '.') {
            document.getElementById((y).toString() + (x).toString()).src = 'resources/' + 'x' + '.png';
            debugger;
            document.getElementById('Points').innerHTML=` ${Points}`;
            Points+=1;
=======
        if (PacmanY % 27 == 0 && PacmanX % 27 == 0 && maze[row][col] == '.') {
            document.getElementById((PacmanY).toString() + (PacmanX).toString()).src = 'resources/' + 'x' + '.png';
>>>>>>> 9c2ac830a8aca7200aa569a16eba3bb83274c20f
            maze[row][col] = 'x';
            NumofFood -= 1;

            if (audio.duration > 0)
                audio.play();

            if (NumofFood == 0) {
                Points=1
                document.getElementById('Points').innerHTML=` ${Points}`;
                window.clearInterval(myInt);
                showStatus('w')

                setTimeout(function () {


                }, 1000);
                setTimeout(function () {

<<<<<<< HEAD
                    document.getElementById('Winner').setAttribute('style', 'display: none');
=======
                    document.getElementById('dialog').setAttribute('style', 'display: none');

>>>>>>> 9c2ac830a8aca7200aa569a16eba3bb83274c20f
                    NumofFood = UpdateUi(Currentlevel + 1);
                    maze = GenMaze(Currentlevel + 1);
                    Currentlevel += 1;
                    PacmanX = parseInt(pacman.style.left);
                    PacmanY = parseInt(pacman.style.top);
                    var Nrow = maze.length;
                    var Ncol = maze[0].length;

                    pacman.classList.remove(CurrentFace);
                    document.getElementById('pacmanOverlay').style.backgroundImage = 'resources/Right/pac1.png';


                }, 2000);
            }

        }

        if (PacmanX % 27 == 0) {

            if (PacmanY % 27 == 0 && checkbroder(row, col, CurrentFace))
                window.clearInterval(myInt);



            else {
                PacmanX += 3;
                pacman.style.left = (PacmanX).toString() + 'px';
            }

        }

        else {
            PacmanX += 3;
            pacman.style.left = (PacmanX).toString() + 'px';
        }



    }, delay);

}

var MoveUp = function () {

    if (CurrentFace != null) {
        pacman.classList.remove(CurrentFace);
    }

    pacman.classList.add('MoveUp');
    CurrentFace = 'MoveUp';

    if (myInt != null) {
        window.clearInterval(myInt);
    }


    myInt = setInterval(function () {

<<<<<<< HEAD
        var row = y / 27;
        var col = x / 27;
        if (y % 27 == 0 && x % 27 == 0 && maze[row][col] == '.') {
            document.getElementById((y).toString() + (x).toString()).src = 'resources/' + 'x' + '.png';
            document.getElementById('Points').innerHTML=` ${Points}`;
            Points+=1;
=======
        var row = PacmanY / 27;
        var col = PacmanX / 27;
        if (PacmanY % 27 == 0 && PacmanX % 27 == 0 && maze[row][col] == '.') {
            document.getElementById((PacmanY).toString() + (PacmanX).toString()).src = 'resources/' + 'x' + '.png';
>>>>>>> 9c2ac830a8aca7200aa569a16eba3bb83274c20f
            NumofFood -= 1;
            if (audio.duration > 0)
                audio.play();
            maze[row][col] = 'x';
            if (NumofFood == 0) {
                
                Points=1
                document.getElementById('Points').innerHTML=` ${Points}`;
                window.clearInterval(myInt);
                showStatus('w')

                setTimeout(function () {


                }, 1000);
                setTimeout(function () {

                    document.getElementById('dialog').setAttribute('style', 'display: none');

                    NumofFood = UpdateUi(Currentlevel + 1);
                    maze = GenMaze(Currentlevel + 1);
                    Currentlevel += 1;
                    PacmanX = parseInt(pacman.style.left);
                    PacmanY = parseInt(pacman.style.top);
                    var Nrow = maze.length;
                    var Ncol = maze[0].length;

                    pacman.classList.remove(CurrentFace);
                    document.getElementById('pacmanOverlay').style.backgroundImage = 'resources/Right/pac1.png';


                }, 2000);


            }

        }

        if (PacmanY % 27 == 0) {

            if (PacmanX % 27 == 0 && checkbroder(row, Math.ceil(col), CurrentFace))
                window.clearInterval(myInt);

            else {
                PacmanY -= 3;
                pacman.style.top = (PacmanY).toString() + 'px';
            }
        }

        else {
            PacmanY -= 3;
            pacman.style.top = (PacmanY).toString() + 'px';
        }



    }, delay);


}
var MoveDown = function () {
    if (CurrentFace != null) {
        pacman.classList.remove(CurrentFace);
    }

    pacman.classList.add('MoveDown');
    CurrentFace = 'MoveDown';
    if (myInt != null) {
        window.clearInterval(myInt);
    }
    myInt = setInterval(function () {
        var row = PacmanY / 27;
        var col = PacmanX / 27;

        if (PacmanY % 27 == 0 && PacmanX % 27 == 0 && maze[row][col] == '.') {
            if (audio.duration > 0)
                audio.play();

<<<<<<< HEAD
            document.getElementById('Points').innerHTML=` ${Points}`;
            Points+=1;

            document.getElementById((y).toString() + (x).toString()).src = 'resources/' + 'x' + '.png';
=======
            document.getElementById((PacmanY).toString() + (PacmanX).toString()).src = 'resources/' + 'x' + '.png';
>>>>>>> 9c2ac830a8aca7200aa569a16eba3bb83274c20f
            NumofFood -= 1;
            maze[row][col] = 'x';
            if (NumofFood == 0) {
                Points=1
                document.getElementById('Points').innerHTML=` ${Points}`;
                window.clearInterval(myInt);
                showStatus('w')
                setTimeout(function () {
                }, 1000);
                setTimeout(function () {

                    document.getElementById('dialog').setAttribute('style', 'display: none');

                    NumofFood = UpdateUi(Currentlevel + 1);
                    maze = GenMaze(Currentlevel + 1);
                    Currentlevel += 1;
                    PacmanX = parseInt(pacman.style.left);
                    PacmanY = parseInt(pacman.style.top);
                    var Nrow = maze.length;
                    var Ncol = maze[0].length;

                    pacman.classList.remove(CurrentFace);
                    document.getElementById('pacmanOverlay').style.backgroundImage = 'resources/Right/pac1.png';


                }, 2000);


            }
        }

        if (PacmanY % 27 == 0) {
            if (PacmanX % 27 == 0 && checkbroder(row, col, CurrentFace))
                window.clearInterval(myInt);

            else {
                PacmanY += 3;
                pacman.style.top = (PacmanY).toString() + 'px';
            }

        }

        else {
            PacmanY += 3;
            pacman.style.top = (PacmanY).toString() + 'px';
        }


    }, delay);
}

document.addEventListener('keydown', function (e) {

    // if (e.keyCode == 80){//game paused
    //     window.clearInterval(myInt);
    // }
    // else 

    if (e.keyCode == 37) // left
    {
        if (!CheckWall('MoveLeft')) {
            SetPixel('MoveLeft');
            MoveLeft();
        }
    }
    else if (e.keyCode == 38) // up
    {

        if (!CheckWall('MoveUp')) {
            SetPixel('MoveUp');
            MoveUp();
        }
    }
    else if (e.keyCode == 39) //right
    {

        if (!CheckWall('MoveRight')) {
            SetPixel('MoveRight');
            MoveRight();
        }
    }
    else if (e.keyCode == 40) //down
    {
        if (!CheckWall('MoveDown')) {
            SetPixel('MoveDown');
            MoveDown();
        }
    }



})



var ghost_1 = { element: document.getElementById('ghostOneOverlay') }
var ghost_2 = { element: document.getElementById('ghostTwoOverlay') }
var ghost_3 = { element: document.getElementById('ghostThreeOverlay') }
var ghost_4 = { element: document.getElementById('ghostFourOverlay') }
var CurrentFace = -1;
var deltaX = 1;
var deltaY = 1;
var timeInterval = 10;

ghost_1.x = parseInt(ghost_1.element.style.left)
ghost_1.PacmanY = parseInt(ghost_1.element.style.top)
ghost_1.step = 0;
ghost_1.lastDir = 0;
ghost_1.CrossRoad = function () {
    var avList = []
    if (maze[this.PacmanY / 27][(this.x / 27) - 1] != '#') {//left road
        avList.push(0)
    }

    if (maze[this.PacmanY / 27][(this.x / 27) + 1] != '#') {//right road
        avList.push(1)
    }

    if (maze[(this.PacmanY / 27) - 1][this.x / 27] != '#') {//Up road
        avList.push(2)
    }

    if (maze[(this.PacmanY / 27) + 1][this.x / 27] != '#') {//Down road
        avList.push(3)
    }

    if ((this.PacmanY / 27) == 1) {//first row
        for (var i = 0; i < avList.length; i++) {
            if (avList[i] === 2) {
                avList.splice(i, 1);
            }
        }
    }
    if ((this.PacmanY / 27) == 12) {//last row
        for (var i = 0; i < avList.length; i++) {
            if (avList[i] === 3) {
                avList.splice(i, 1);
            }
        }
    }
    if ((this.x / 27) == 1) {//first col
        for (var i = 0; i < avList.length; i++) {
            if (avList[i] === 0) {
                avList.splice(i, 1);
            }
        }
    }
    if ((this.x / 27) == 18) {//last col
        for (var i = 0; i < avList.length; i++) {
            if (avList[i] === 1) {
                avList.splice(i, 1);
            }
        }
    }
    for (var i = 0; i < avList.length; i++) {
        if (avList[i] === this.lastDir && avList.length > 1) {
            avList.splice(i, 1);
        }
    }
    return avList[((Math.random() * 10).toFixed() % avList.length)]

}
ghost_2.x = parseInt(ghost_2.element.style.left)
ghost_2.PacmanY = parseInt(ghost_2.element.style.top)
ghost_2.step = 0;
ghost_2.lastDir = 0;
ghost_2.CrossRoad = function () {
    var avList = []
    if (maze[this.PacmanY / 27][(this.x / 27) - 1] != '#') {//left road
        avList.push(0)
    }

    if (maze[this.PacmanY / 27][(this.x / 27) + 1] != '#') {//right road
        avList.push(1)
    }

    if (maze[(this.PacmanY / 27) - 1][this.x / 27] != '#') {//Up road
        avList.push(2)
    }

    if (maze[(this.PacmanY / 27) + 1][this.x / 27] != '#') {//Down road
        avList.push(3)
    }

    if ((this.PacmanY / 27) == 1) {//first row
        for (var i = 0; i < avList.length; i++) {
            if (avList[i] === 2) {
                avList.splice(i, 1);
            }
        }
    }
    if ((this.PacmanY / 27) == 12) {//last row
        for (var i = 0; i < avList.length; i++) {
            if (avList[i] === 3) {
                avList.splice(i, 1);
            }
        }
    }
    if ((this.x / 27) == 1) {//first col
        for (var i = 0; i < avList.length; i++) {
            if (avList[i] === 0) {
                avList.splice(i, 1);
            }
        }
    }
    if ((this.x / 27) == 18) {//last col
        for (var i = 0; i < avList.length; i++) {
            if (avList[i] === 1) {
                avList.splice(i, 1);
            }
        }
    }
    for (var i = 0; i < avList.length; i++) {
        if (avList[i] === this.lastDir) {
            avList.splice(i, 1);
        }
    }
    return avList[((Math.random() * 10).toFixed() % avList.length)]

}
ghost_3.x = parseInt(ghost_3.element.style.left)
ghost_3.PacmanY = parseInt(ghost_3.element.style.top)
ghost_3.step = 0;
ghost_3.lastDir = 0;
ghost_3.CrossRoad = function () {
    var avList = []
    if (maze[this.PacmanY / 27][(this.x / 27) - 1] != '#') {//left road
        avList.push(0)
    }

    if (maze[this.PacmanY / 27][(this.x / 27) + 1] != '#') {//right road
        avList.push(1)
    }

    if (maze[(this.PacmanY / 27) - 1][this.x / 27] != '#') {//Up road
        avList.push(2)
    }

    if (maze[(this.PacmanY / 27) + 1][this.x / 27] != '#') {//Down road
        avList.push(3)
    }

    if ((this.PacmanY / 27) == 1) {//first row
        for (var i = 0; i < avList.length; i++) {
            if (avList[i] === 2) {
                avList.splice(i, 1);
            }
        }
    }
    if ((this.PacmanY / 27) == 12) {//last row
        for (var i = 0; i < avList.length; i++) {
            if (avList[i] === 3) {
                avList.splice(i, 1);
            }
        }
    }
    if ((this.x / 27) == 1) {//first col
        for (var i = 0; i < avList.length; i++) {
            if (avList[i] === 0) {
                avList.splice(i, 1);
            }
        }
    }
    if ((this.x / 27) == 18) {//last col
        for (var i = 0; i < avList.length; i++) {
            if (avList[i] === 1) {
                avList.splice(i, 1);
            }
        }
    }
    for (var i = 0; i < avList.length; i++) {
        if (avList[i] === this.lastDir) {
            avList.splice(i, 1);
        }
    }
    return avList[((Math.random() * 10).toFixed() % avList.length)]

}
ghost_4.x = parseInt(ghost_4.element.style.left)
ghost_4.PacmanY = parseInt(ghost_4.element.style.top)
ghost_4.step = 0;
ghost_4.lastDir = 0;
ghost_4.CrossRoad = function () {
    var avList = []
    if (maze[this.PacmanY / 27][(this.x / 27) - 1] != '#') {//left road
        avList.push(0)
    }

    if (maze[this.PacmanY / 27][(this.x / 27) + 1] != '#') {//right road
        avList.push(1)
    }

    if (maze[(this.PacmanY / 27) - 1][this.x / 27] != '#') {//Up road
        avList.push(2)
    }

    if (maze[(this.PacmanY / 27) + 1][this.x / 27] != '#') {//Down road
        avList.push(3)
    }
    if ((this.PacmanY / 27) == 1) {//first row
        for (var i = 0; i < avList.length; i++) {
            if (avList[i] === 2) {
                avList.splice(i, 1);
            }
        }
    }
    if ((this.PacmanY / 27) == 12) {//last row
        for (var i = 0; i < avList.length; i++) {
            if (avList[i] === 3) {
                avList.splice(i, 1);
            }
        }
    }
    if ((this.x / 27) == 1) {//first col
        for (var i = 0; i < avList.length; i++) {
            if (avList[i] === 0) {
                avList.splice(i, 1);
            }
        }
    }
    if ((this.x / 27) == 18) {//last col
        for (var i = 0; i < avList.length; i++) {
            if (avList[i] === 1) {
                avList.splice(i, 1);
            }
        }
    }
    for (var i = 0; i < avList.length; i++) {
        if (avList[i] === this.lastDir) {
            avList.splice(i, 1);
        }
    }
    return avList[((Math.random() * 10).toFixed() % avList.length)]

}
var ghostMoves = [
    function moveLeft(self) {
        var stepInterval = setInterval(function () {
            if ((Math.abs(this.x - PacmanX) < 27) && (Math.abs(this.PacmanY - PacmanY) < 27)) {
                showStatus('l')
                window.clearInterval(stepInterval)
            }
            this.lastDir = 1;
            if (this.step == 26) {
                this.step = 0;
                this.x -= deltaX;
                window.clearInterval(stepInterval)
                var dir = this.CrossRoad()
                ghostMoves[dir](this)
                return;
            }
            this.step++;
            this.x -= deltaX;
            this.element.style.left = (this.x).toString() + 'px';
        }.bind(self), timeInterval);
    }, function moveRight(self) {
        var stepInterval = setInterval(function () {
            if ((Math.abs(this.x - PacmanX) < 27) && (Math.abs(this.PacmanY - PacmanY) < 27)) {
                showStatus('l')
                window.clearInterval(stepInterval)
            }
            this.lastDir = 0;
            if (this.step == 26) {
                this.x += deltaX;
                this.step = 0;
                window.clearInterval(stepInterval)
                var dir = this.CrossRoad()
                ghostMoves[dir](this)
                return;
            }
            this.step++;
            this.x += deltaX;
            this.element.style.left = (this.x).toString() + 'px';
        }.bind(self), timeInterval);
    }, function moveUp(self) {

        var stepInterval = setInterval(function () {
            if ((Math.abs(this.x - PacmanX) < 27) && (Math.abs(this.PacmanY - PacmanY) < 27)) {
                showStatus('l')
                window.clearInterval(stepInterval)
            }
            this.lastDir = 3;
            if (this.step == 26) {
                this.step = 0;
                this.PacmanY -= deltaY;
                window.clearInterval(stepInterval)
                var dir = this.CrossRoad()
                ghostMoves[dir](this)
                return;
            }
            this.step++;
            this.PacmanY -= deltaY;
            this.element.style.top = (this.PacmanY).toString() + 'px';
        }.bind(self), timeInterval);
    }, function moveDown(self) {
        var stepInterval = setInterval(function () {
            if ((Math.abs(this.x - PacmanX) < 27) && (Math.abs(this.PacmanY - PacmanY) < 27)) {
                showStatus('l')
                window.clearInterval(stepInterval)
            }
            this.lastDir = 2;
            if (this.step == 26) {
                this.step = 0;
                this.PacmanY += deltaY;
                window.clearInterval(stepInterval)
                var dir = this.CrossRoad()
                ghostMoves[dir](this)
                return;
            }
            this.step++;
            this.PacmanY += deltaY;
            this.element.style.top = (this.PacmanY).toString() + 'px';
        }.bind(self), timeInterval);
    }]



ghost_1.Move = ghostMoves
ghost_2.Move = ghostMoves
ghost_3.Move = ghostMoves
ghost_4.Move = ghostMoves

ghost_4.CrossRoad()
var step = 0;
setTimeout(() => {
    var stepInterval = setInterval(function () {

        if (step == 53) {
            ghost_4.x += deltaX;
            step = 0;
            window.clearInterval(stepInterval)
            var dir = ghost_4.CrossRoad()
            ghost_4.Move[dir](ghost_4)
            return;
        }
        step++;
        ghost_4.x += deltaX;
        ghost_4.element.style.left = (ghost_4.x).toString() + 'px';
    }, timeInterval);

}, 1000);

step = 0;
setTimeout(() => {
    var stepInterval = setInterval(function () {
        if (step == 80) {
            ghost_3.x += deltaX;
            step = 0;
            window.clearInterval(stepInterval)
            var dir = ghost_3.CrossRoad()
            ghost_3.Move[dir](ghost_3)
            return;
        }
        step++;
        ghost_3.x += deltaX;
        ghost_3.element.style.left = (ghost_3.x).toString() + 'px';
    }, timeInterval);

}, 4000);

step = 0;
setTimeout(() => {
    var stepInterval = setInterval(function () {
        if (step == 53) {
            ghost_2.x += deltaX;
            step = 0;
            window.clearInterval(stepInterval)
            var dir = ghost_2.CrossRoad()
            ghost_2.Move[dir](ghost_2)
            return;
        }
        step++;
        ghost_2.x += deltaX;
        ghost_2.element.style.left = (ghost_2.x).toString() + 'px';
    }, timeInterval);

}, 8000);
step = 0;
setTimeout(() => {
    var stepInterval = setInterval(function () {
        if (step == 80) {
            ghost_1.x += deltaX;
            step = 0;
            window.clearInterval(stepInterval)
            var dir = ghost_1.CrossRoad()
            ghost_1.Move[dir](ghost_1)
            return;
        }
        step++;
        ghost_1.x += deltaX;
        ghost_1.element.style.left = (ghost_1.x).toString() + 'px';
    }, timeInterval);

}, 16000);
function showStatus(letter) {
    var doc = document.getElementById('dialog')
    switch (letter) {
        case 'w':
            doc.setAttribute('style', 'display:block;content:url(resources/winner.jpg);transform: scale(1.3);')
            break;
        case 'l':
            window.clearInterval(myInt)
            doc.setAttribute('style', 'display:block;content:url(resources/gameover.png);')
            setTimeout(() => {
                location.reload();
            }, 3000);
            break;
        default:
            break;
    }
}