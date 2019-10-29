var level ; 
function SetupMaze(lev) {
    level = MazeSets.HackerLevels[lev];
    var PacmanInd = []
    var GhostInd = []
    var t = 0;
    var left = 0;
    var Cnt = 0;

    for (row = 0; row < level.maze.length; row++) {
        for (let index = 0; index < level.maze[row].length; index++) {
            var element = level.maze[row][index];
            var img = document.createElement('img')
            if (element == '.') {
                element = 'food'
                Cnt += 1;
            }
            else if (element == 'P') {
                element = 'x';
                PacmanInd = [t, left];
            }
            else if (element == 'z') {
                element = 'x'
                GhostInd.push([t, left])
            }
            img.src = 'resources/' + element + '.png';
            img.id = t.toString() + left.toString();
            img.setAttribute('style',
                `height:27px;
            width:27px;
            top:${t}px;
            left:${left}px;
            padding:0px;
            position:absolute;
            
            z-index:1`)

            document.getElementById('pacmanMaze').append(img)
            left += 27;
        }
        left = 0;
        t += 27;
    }

    var img = document.createElement('img')
    img.src = 'resources/' + 'Right/pac1' + '.png'
    img.id = "pacman"
    img.setAttribute('style',
        `height:27px;
            width:27px;
            padding:0px;
            position:absolute;
            z-index:2`)


    document.getElementById('ghostOneOverlay').style.top = (GhostInd[0][0]).toString() + 'px';
    document.getElementById('ghostOneOverlay').style.left = (GhostInd[0][1]).toString() + 'px';

    document.getElementById('ghostTwoOverlay').style.top = (GhostInd[1][0]).toString() + 'px';
    document.getElementById('ghostTwoOverlay').style.left = (GhostInd[1][1]).toString() + 'px';

    document.getElementById('ghostThreeOverlay').style.top = (GhostInd[2][0]).toString() + 'px';
    document.getElementById('ghostThreeOverlay').style.left = (GhostInd[2][1]).toString() + 'px';

    document.getElementById('ghostFourOverlay').style.top = (GhostInd[3][0]).toString() + 'px';
    document.getElementById('ghostFourOverlay').style.left = (GhostInd[3][1]).toString() + 'px';


    document.getElementById('pacmanOverlay').style.top = (PacmanInd[0]).toString() + 'px';
    document.getElementById('pacmanOverlay').style.left = (PacmanInd[1]).toString() + 'px';

    return Cnt;
}
function GenMaze() {
    var Maze = [];

    for (var row = 0; row < level.maze.length; row++) {
        var arr = new Array();
        for (var index = 0; index < level.maze[0].length; index++) {

            if (level.maze[row][index] === 'P') {
                arr.push('x')
            }
            else if (level.maze[row][index] === 'x') {
                arr.push('x')
            }
            else if (level.maze[row][index] === '.') {
                arr.push('.')
            }
            else {
                arr.push('#');
            }
        }
        Maze.push(arr);

    }
    return Maze;
};


