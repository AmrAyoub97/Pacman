SetupMaze(0)
var maze = GenMaze()
var pacman = document.getElementById('pacmanOverlay');

var ghost_1 = { element: document.getElementById('ghostOneOverlay') }
var ghost_2 = { element: document.getElementById('ghostTwoOverlay') }
var ghost_3 = { element: document.getElementById('ghostThreeOverlay') }
var ghost_4 = { element: document.getElementById('ghostFourOverlay') }
var CurrentFace = -1;
var deltaX = 1;
var deltaY = 1;
var timeInterval = 10;

ghost_1.x = parseInt(ghost_1.element.style.left)
ghost_1.y = parseInt(ghost_1.element.style.top)
ghost_1.step = 0;
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
ghost_2.x = parseInt(ghost_2.element.style.left)
ghost_2.y = parseInt(ghost_2.element.style.top)
ghost_2.step = 0;
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
ghost_3.x = parseInt(ghost_3.element.style.left)
ghost_3.y = parseInt(ghost_3.element.style.top)
ghost_3.step = 0;
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
ghost_4.x = parseInt(ghost_4.element.style.left)
ghost_4.y = parseInt(ghost_4.element.style.top)
ghost_4.step = 0;
ghost_4.lastDir = 0;
ghost_4.CrossRoad = function () {
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
            this.lastDir = 3;
            if (this.step == 26) {
                this.step = 0;
                this.y -= deltaY;
                window.clearInterval(stepInterval)
                var dir = this.CrossRoad()
                ghostMoves[dir](this)
                return;
            }
            this.step++;
            this.y -= deltaY;
            this.element.style.top = (this.y).toString() + 'px';
        }.bind(self), timeInterval);
    }, function moveDown(self) {
        var stepInterval = setInterval(function () {
            this.lastDir = 2;
            if (this.step == 26) {
                this.step = 0;
                this.y += deltaY;
                window.clearInterval(stepInterval)
                var dir = this.CrossRoad()
                ghostMoves[dir](this)
                return;
            }
            this.step++;
            this.y += deltaY;
            this.element.style.top = (this.y).toString() + 'px';
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
