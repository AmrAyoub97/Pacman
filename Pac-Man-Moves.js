var maze;
var Currentlevel = 0;
var NumofFood;
var pacman = document.getElementById('pacmanOverlay');
var res = GenerateMaze(false, 0);
maze = res[0]
NumofFood = res[1]
debugger
var CurrentFace;
var PacmanInterval;
var ghostsIntervals = []
var ghostsTimeout = []
var PacmanX = parseInt(pacman.style.left);
var PacmanY = parseInt(pacman.style.top);
var delay = 20;

var Inprogressflag = false;
var contstate;

var audio = new Audio('resources/waka.mp3');

var Nrow = maze.length;
var Ncol = maze[0].length;
var Points = 0;
document.getElementById('Points').innerHTML = ` ${Points}`;



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
        if (PacmanInterval != null) {
            window.clearInterval(PacmanInterval);
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
        if (PacmanInterval != null) {
            window.clearInterval(PacmanInterval);
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
        if (PacmanInterval != null) {
            window.clearInterval(PacmanInterval);
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
        if (PacmanInterval != null) {
            window.clearInterval(PacmanInterval);
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

    if (PacmanInterval != null) {
        window.clearInterval(PacmanInterval);
    }

    PacmanInterval = setInterval(function () {

        var row = PacmanY / 27;
        var col = PacmanX / 27;
        if (PacmanY % 27 == 0 && PacmanX % 27 == 0 && maze[row][col] == '.') {
            document.getElementById((PacmanY).toString() + (PacmanX).toString()).src = 'resources/' + 'x' + '.png';
            NumofFood -= 1;
            maze[row][col] = 'x';
            document.getElementById('Points').innerHTML = ` ${Points}`;
            Points += 1;
            if (audio.duration > 0)
                audio.play();
            if (NumofFood == 0) {
                Points = 1
                document.getElementById('Points').innerHTML = ` ${Points}`;
                window.clearInterval(PacmanInterval);
                showStatus('w')

            }

        }

        if (PacmanX % 27 == 0 && checkbroder(row, col, CurrentFace)) {
            window.clearInterval(PacmanInterval);
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

    if (PacmanInterval != null) {
        window.clearInterval(PacmanInterval);
    }
    PacmanInterval = setInterval(function () {

        var row = PacmanY / 27;
        var col = PacmanX / 27;

        if (PacmanY % 27 == 0 && PacmanX % 27 == 0 && maze[row][col] == '.') {
            document.getElementById((PacmanY).toString() + (PacmanX).toString()).src = 'resources/' + 'x' + '.png';
            maze[row][col] = 'x';
            NumofFood -= 1;
            document.getElementById('Points').innerHTML = ` ${Points}`;
            Points += 1;

            if (audio.duration > 0)
                audio.play();

            if (NumofFood == 0) {
                Points = 1
                document.getElementById('Points').innerHTML = ` ${Points}`;
                window.clearInterval(PacmanInterval);
                showStatus('w')
            }

        }

        if (PacmanX % 27 == 0) {

            if (PacmanY % 27 == 0 && checkbroder(row, col, CurrentFace))
                window.clearInterval(PacmanInterval);



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

    if (PacmanInterval != null) {
        window.clearInterval(PacmanInterval);
    }


    PacmanInterval = setInterval(function () {

        var row = PacmanY / 27;
        var col = PacmanX / 27;
        if (PacmanY % 27 == 0 && PacmanX % 27 == 0 && maze[row][col] == '.') {
            document.getElementById((PacmanY).toString() + (PacmanX).toString()).src = 'resources/' + 'x' + '.png';
            NumofFood -= 1;
            document.getElementById('Points').innerHTML = ` ${Points}`;
            Points += 1;
            if (audio.duration > 0)
                audio.play();
            maze[row][col] = 'x';
            if (NumofFood == 0) {
                Points = 1
                document.getElementById('Points').innerHTML = ` ${Points}`;
                window.clearInterval(PacmanInterval);
                showStatus('w')

            }

        }

        if (PacmanY % 27 == 0) {

            if (PacmanX % 27 == 0 && checkbroder(row, Math.ceil(col), CurrentFace))
                window.clearInterval(PacmanInterval);

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
    if (PacmanInterval != null) {
        window.clearInterval(PacmanInterval);
    }
    PacmanInterval = setInterval(function () {
        var row = PacmanY / 27;
        var col = PacmanX / 27;

        if (PacmanY % 27 == 0 && PacmanX % 27 == 0 && maze[row][col] == '.') {
            if (audio.duration > 0)
                audio.play();

            document.getElementById((PacmanY).toString() + (PacmanX).toString()).src = 'resources/' + 'x' + '.png';
            NumofFood -= 1;
            document.getElementById('Points').innerHTML = ` ${Points}`;
            Points += 1;
            maze[row][col] = 'x';
            if (NumofFood == 0) {
                Points = 1
                document.getElementById('Points').innerHTML = ` ${Points}`;
                window.clearInterval(PacmanInterval);
                showStatus('w')

            }
        }

        if (PacmanY % 27 == 0) {
            if (PacmanX % 27 == 0 && checkbroder(row, col, CurrentFace))
                window.clearInterval(PacmanInterval);

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
var deltaX = 1;
var deltaY = 1;
var timeInterval = 10;


ghost_1.ghostInitialSteps = 0;
ghost_1.lastDir = 0;
ghost_1.CrossRoad = function () {
    var avList = []
    if (maze[this.y / 27][(this.x / 27) - 1] != '#') {//left road
        avList.push(0)
    }

    if (maze[this.y / 27][(this.x / 27) + 1] != '#') {//right road
        avList.push(1)
    }

    if (maze[(this.y / 27) - 1][this.x / 27] != '#') {//Up road
        avList.push(2)
    }

    if (maze[(this.y / 27) + 1][this.x / 27] != '#') {//Down road
        avList.push(3)
    }

    if ((this.y / 27) == 1) {//first row
        for (var i = 0; i < avList.length; i++) {
            if (avList[i] === 2) {
                avList.splice(i, 1);
            }
        }
    }
    if ((this.y / 27) == 12) {//last row
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

ghost_2.ghostInitialSteps = 0;
ghost_2.lastDir = 0;
ghost_2.CrossRoad = function () {
    var avList = []
    if (maze[this.y / 27][(this.x / 27) - 1] != '#') {//left road
        avList.push(0)
    }

    if (maze[this.y / 27][(this.x / 27) + 1] != '#') {//right road
        avList.push(1)
    }

    if (maze[(this.y / 27) - 1][this.x / 27] != '#') {//Up road
        avList.push(2)
    }

    if (maze[(this.y / 27) + 1][this.x / 27] != '#') {//Down road
        avList.push(3)
    }

    if ((this.y / 27) == 1) {//first row
        for (var i = 0; i < avList.length; i++) {
            if (avList[i] === 2) {
                avList.splice(i, 1);
            }
        }
    }
    if ((this.y / 27) == 12) {//last row
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

ghost_3.ghostInitialSteps = 0;
ghost_3.lastDir = 0;
ghost_3.CrossRoad = function () {
    var avList = []
    if (maze[this.y / 27][(this.x / 27) - 1] != '#') {//left road
        avList.push(0)
    }

    if (maze[this.y / 27][(this.x / 27) + 1] != '#') {//right road
        avList.push(1)
    }

    if (maze[(this.y / 27) - 1][this.x / 27] != '#') {//Up road
        avList.push(2)
    }

    if (maze[(this.y / 27) + 1][this.x / 27] != '#') {//Down road
        avList.push(3)
    }

    if ((this.y / 27) == 1) {//first row
        for (var i = 0; i < avList.length; i++) {
            if (avList[i] === 2) {
                avList.splice(i, 1);
            }
        }
    }
    if ((this.y / 27) == 12) {//last row
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

ghost_4.ghostInitialSteps = 0;
ghost_4.lastDir = 0;
ghost_4.CrossRoad = function () {
    console.log(maze[this.y / 27][(this.x / 27) - 1])
    var avList = []
    if (maze[this.y / 27][(this.x / 27) - 1] != '#') {//left road
        avList.push(0)
    }

    if (maze[this.y / 27][(this.x / 27) + 1] != '#') {//right road
        avList.push(1)
    }

    if (maze[(this.y / 27) - 1][this.x / 27] != '#') {//Up road
        avList.push(2)
    }

    if (maze[(this.y / 27) + 1][this.x / 27] != '#') {//Down road
        avList.push(3)
    }
    if ((this.y / 27) == 1) {//first row
        for (var i = 0; i < avList.length; i++) {
            if (avList[i] === 2) {
                avList.splice(i, 1);
            }
        }
    }
    if ((this.y / 27) == 12) {//last row
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
            if ((Math.abs(this.x - PacmanX) < 27) && (Math.abs(this.y - PacmanY) < 27)) {
                showStatus('l')
                window.clearInterval(stepInterval)
            }
            else{
            this.lastDir = 1;
            if (this.ghostInitialSteps == 26) {
                this.ghostInitialSteps = 0;
                this.x -= deltaX;
                window.clearInterval(stepInterval)
                var dir = this.CrossRoad()
                ghostMoves[dir](this)
                return;
            }
            this.ghostInitialSteps++;
            this.x -= deltaX;
            this.element.style.left = (this.x).toString() + 'px';
        }
        }.bind(self), timeInterval);
        ghostsIntervals.push(stepInterval)
    
    }, function moveRight(self) {
        var stepInterval = setInterval(function () {
            if ((Math.abs(this.x - PacmanX) < 27) && (Math.abs(this.y - PacmanY) < 27)) {
                showStatus('l')
                window.clearInterval(stepInterval)
            }
            else{
            this.lastDir = 0;
            if (this.ghostInitialSteps == 26) {
                this.x += deltaX;
                this.ghostInitialSteps = 0;
                window.clearInterval(stepInterval)
                var dir = this.CrossRoad()
                ghostMoves[dir](this)
                return;
            }
            this.ghostInitialSteps++;
            this.x += deltaX;
            this.element.style.left = (this.x).toString() + 'px';
        }
        }.bind(self), timeInterval);
        ghostsIntervals.push(stepInterval)

    }, function moveUp(self) {

        var stepInterval = setInterval(function () {
            if ((Math.abs(this.x - PacmanX) < 27) && (Math.abs(this.y - PacmanY) < 27)) {
                showStatus('l')
                window.clearInterval(stepInterval)
            }
            else{
            this.lastDir = 3;
            if (this.ghostInitialSteps == 26) {
                this.ghostInitialSteps = 0;
                this.y -= deltaY;
                window.clearInterval(stepInterval)
                var dir = this.CrossRoad()
                ghostMoves[dir](this)
                return;
            }
            this.ghostInitialSteps++;
            this.y -= deltaY;
            this.element.style.top = (this.y).toString() + 'px';
        }
        }.bind(self), timeInterval);
        ghostsIntervals.push(stepInterval)

    }, function moveDown(self) {
        var stepInterval = setInterval(function () {
            if ((Math.abs(this.x - PacmanX) < 27) && (Math.abs(this.y - PacmanY) < 27)) {
                showStatus('l')
                window.clearInterval(stepInterval)
            }
            else
            {
            this.lastDir = 2;
            if (this.ghostInitialSteps == 26) {
                this.ghostInitialSteps = 0;
                this.y += deltaY;
                window.clearInterval(stepInterval)
                var dir = this.CrossRoad()
                ghostMoves[dir](this)
                return;
            }
            this.ghostInitialSteps++;
            this.y += deltaY;
            this.element.style.top = (this.y).toString() + 'px';
        }
        }.bind(self), timeInterval);
        ghostsIntervals.push(stepInterval)
    }]
ghost_1.Move = ghostMoves
ghost_2.Move = ghostMoves
ghost_3.Move = ghostMoves
ghost_4.Move = ghostMoves

function ghostsMakeTheirFirstSteps() {

    ghostsIntervals.forEach(element => {
        window.clearInterval(element);
    });

    ghostsTimeout.forEach(element => {
        window.clearTimeout(element);
    });

    ghost_1.x = parseInt(ghost_1.element.style.left)
    ghost_1.y = parseInt(ghost_1.element.style.top)
    ghost_1.ghostInitialSteps = 0;
    ghost_1.lastDir = 0;

    ghost_2.x = parseInt(ghost_2.element.style.left)
    ghost_2.y = parseInt(ghost_2.element.style.top)
    ghost_2.ghostInitialSteps = 0;
    ghost_2.lastDir = 0;

    ghost_3.x = parseInt(ghost_3.element.style.left)
    ghost_3.y = parseInt(ghost_3.element.style.top)
    ghost_3.ghostInitialSteps = 0;
    ghost_3.lastDir = 0;

    ghost_4.x = parseInt(ghost_4.element.style.left)
    ghost_4.y = parseInt(ghost_4.element.style.top)
    ghost_4.ghostInitialSteps = 0;
    ghost_4.lastDir = 0;

    var ghostInitialSteps = 0;
    //debugger;
    var ghostOneTimeout = setTimeout(() => {
        var stepInterval = setInterval(function () {

            if (ghostInitialSteps == 53) {
                ghost_4.x += deltaX;
                ghostInitialSteps = 0;
                window.clearInterval(stepInterval)
                var dir = ghost_4.CrossRoad()
                ghost_4.Move[dir](ghost_4)
                return;
            }
            ghostInitialSteps++;
            ghost_4.x += deltaX;
            ghost_4.element.style.left = (ghost_4.x).toString() + 'px';
        }, timeInterval);
        ghostsIntervals.push(stepInterval)
    }, 2000);
    ghostsTimeout.push(ghostOneTimeout)
    ghostInitialSteps = 0;
    var ghostTwoTimeout = setTimeout(() => {
        var stepInterval = setInterval(function () {
            if (ghostInitialSteps == 80) {
                ghost_3.x += deltaX;
                ghostInitialSteps = 0;
                window.clearInterval(stepInterval)
                var dir = ghost_3.CrossRoad()
                ghost_3.Move[dir](ghost_3)
                return;
            }
            ghostInitialSteps++;
            ghost_3.x += deltaX;
            ghost_3.element.style.left = (ghost_3.x).toString() + 'px';
        }, timeInterval);
        ghostsIntervals.push(stepInterval)

    }, 4000);
    ghostsTimeout.push(ghostTwoTimeout)

    ghostInitialSteps = 0;
    var ghostThreeTimeout = setTimeout(() => {
        var stepInterval = setInterval(function () {
            if (ghostInitialSteps == 53) {
                ghost_2.x += deltaX;
                ghostInitialSteps = 0;
                window.clearInterval(stepInterval)
                var dir = ghost_2.CrossRoad()
                ghost_2.Move[dir](ghost_2)
                return;
            }
            ghostInitialSteps++;
            ghost_2.x += deltaX;
            ghost_2.element.style.left = (ghost_2.x).toString() + 'px';
        }, timeInterval);
        ghostsIntervals.push(stepInterval)

    }, 8000);
    ghostsTimeout.push(ghostThreeTimeout)

    ghostInitialSteps = 0;
    var ghostFourTimeout = setTimeout(() => {
        var stepInterval = setInterval(function () {
            if (ghostInitialSteps == 80) {
                ghost_1.x += deltaX;
                ghostInitialSteps = 0;
                window.clearInterval(stepInterval)
                var dir = ghost_1.CrossRoad()
                ghost_1.Move[dir](ghost_1)
                return;
            }
            ghostInitialSteps++;
            ghost_1.x += deltaX;
            ghost_1.element.style.left = (ghost_1.x).toString() + 'px';
        }, timeInterval);
        ghostsIntervals.push(stepInterval)

    }, 16000);
    ghostsTimeout.push(ghostFourTimeout)

}
function showStatus(letter) {
    var doc = document.getElementById('dialog')
    switch (letter) {
        case 'w':
            doc.setAttribute('style', 'display:block;content:url(resources/winner.jpg);transform: scale(1.3);')
            setTimeout(() => {
                maze = []
                var res = GenerateMaze(true, Currentlevel + 1)
                maze = res[0]
                NumofFood = res[1]
                console.log(maze)
                console.log(NumofFood)
                Currentlevel += 1;
                PacmanX = parseInt(pacman.style.left);
                PacmanY = parseInt(pacman.style.top);
                Nrow = maze.length;
                Ncol = maze[0].length;
                pacman.classList.remove(CurrentFace);
                document.getElementById('pacmanOverlay').style.backgroundImage = 'resources/Right/pac1.png';
                doc.setAttribute('style', 'display: none');
                ghostsMakeTheirFirstSteps()
            },2000);
            break;
        case 'l':
            window.clearInterval(PacmanInterval)
            doc.setAttribute('style', 'display:block;content:url(resources/gameover.png);')
            setTimeout(() => {
                location.reload();
            }, 1500);
            break;
        default:
            break;
    }
}
ghostsMakeTheirFirstSteps()