var mze = MazeSets.StandardLevels[0].maze;
var PacmanInd = []
var t = 0;
var left = 0;
for (var i = 0; i < mze.length; i++) {
    for (var j = 0; j < mze[i].length; j++) {
        var element = mze[i][j];
        var img = document.createElement('img')
        if (element == '.')
            element = 'food'
        else if (element == 'P') {
            element = 'x'
            mze[i][j] = 'x'
            PacmanInd = [t, left]
        }
        img.src = 'resources/' + element + '.png'
        img.id = `bt_${t}+l${left}`
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
};

var img = document.createElement('img')
img.src = 'resources/' + 'Right/pac1' + '.png'
img.id = "pacman"
img.setAttribute('style',
    `height:27px;
            width:27px;
            padding:0px;
            position:absolute;
            z-index:2`)

document.getElementById('pacmanOverlay').style.top = (PacmanInd[0]).toString() + 'px';
document.getElementById('pacmanOverlay').style.left = (PacmanInd[1]).toString() + 'px';
