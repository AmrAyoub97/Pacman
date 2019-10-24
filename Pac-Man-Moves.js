var pacman = document.getElementById('pacmanOverlay');
var CurrentFace = -1;
var deltaX = 1;
var deltaY = 1;
var timeInterval = 10;
var lock = 8;
var myInt;
var x = parseInt(pacman.style.left);
var y = parseInt(pacman.style.top);



document.addEventListener('keydown', function (e) {
    //console.log(e.keyCode);

    if (e.keyCode == 80) {//game paused
        window.clearInterval(myInt);
    }
    else if (e.keyCode == 37) // left
    {

        if (CurrentFace != -1) {
            pacman.classList.remove(CurrentFace);
        }

        pacman.classList.add('MoveLeft');
        CurrentFace = 'MoveLeft';

        if (myInt != null) {
            window.clearInterval(myInt);
        }

        myInt = setInterval(function () {
            x -= deltaX;
            pacman.style.left = (x).toString() + 'px';

        }, timeInterval);

    }
    else if (e.keyCode == 38) // up
    {
        //debugger;
        if (CurrentFace != -1) {
            pacman.classList.remove(CurrentFace);
        }
        pacman.classList.add('MoveUp');
        CurrentFace = 'MoveUp';

        if (myInt != null) {
            window.clearInterval(myInt);
        }

        myInt = setInterval(function () {
            if (x % 27 < lock) {
                //x -= x % 27;
                y -= deltaY;
                pacman.style.top = (y).toString() + 'px';
            }

        }, timeInterval);

    }
    else if (e.keyCode == 39) //right
    {

        if (CurrentFace != -1) {
            pacman.classList.remove(CurrentFace);
        }
        pacman.classList.add('MoveRight');
        CurrentFace = 'MoveRight';

        if (myInt != null) {
            window.clearInterval(myInt);
        }
        myInt = setInterval(function () {
            x += deltaX;
            pacman.style.left = (x).toString() + 'px';

        }, timeInterval);


    }
    else if (e.keyCode == 40) //down
    {
        if (CurrentFace != -1) {
            pacman.classList.remove(CurrentFace);
        }
        pacman.classList.add('MoveDown');
        CurrentFace = 'MoveDown';
        if (myInt != null) {
            window.clearInterval(myInt);
        }
        myInt = setInterval(function () {
            if (x % 27 < lock) {
                //x -= x % 27;
                y += deltaY;
                pacman.style.top = (y).toString() + 'px';
            }
            pacman.style.top = (y).toString() + 'px';

        }, timeInterval);

    }



})