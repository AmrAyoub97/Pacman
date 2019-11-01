function GenerateMaze(updateFlag = false, mazeNo = 0, levelType = "StandardLevels") {
    var level = MazeSets[levelType][mazeNo].maze;
    var PacmanInd = []
    var GhostInd = []
    var t = 0;
    var left = 0;
    var gamePoints = 0;
    var mazeArray = [];

    for (row = 0; row < level.length; row++) {
        var arr = new Array();
        for (let index = 0; index < level[row].length; index++) {
            var element = level[row][index];
            if (element == '.') {
                element = 'food'
                gamePoints += 1;
                arr.push('.')
            }
            else if (element == 'x') {
                element = 'x'
                arr.push('x')
            }
            else if (element == 'P') {
                element = 'x';
                PacmanInd = [t, left];
                arr.push('x')
            }
            else if (element == 'z') {
                element = 'x'
                GhostInd.push([t, left])
                arr.push('#')
            }
            else {
                arr.push('#')
            }
            var CellImage;
            if (updateFlag == true) {
                var Imgid = t.toString() + left.toString();
                CellImage = document.getElementById(Imgid);
                CellImage.src = 'resources/' + element + '.png';
                CellImage.setAttribute('style',
                    `height:27px;
            width:27px;
            top:${t}px;
            left:${left}px;
            padding:0px;
            position:absolute;
            z-index:1`)
            } else {
                CellImage = document.createElement('img')
                CellImage.src = 'resources/' + element + '.png';
                CellImage.id = t.toString() + left.toString();
                CellImage.setAttribute('style',
                    `height:27px;
            width:27px;
            top:${t}px;
            left:${left}px;
            padding:0px;
            position:absolute;
            z-index:1`)
                document.getElementById('pacmanMaze').append(CellImage)
            }


            left += 27;
        }

        console.log(mazeArray)
        mazeArray.push(arr);
        left = 0;
        t += 27;
    }

    document.getElementById('ghostOneOverlay').style.top = (GhostInd[0][0]).toString() + 'px';
    document.getElementById('ghostOneOverlay').style.left = (GhostInd[0][1]).toString() + 'px';

    document.getElementById('ghostTwoOverlay').style.top = (GhostInd[1][0]).toString() + 'px';
    document.getElementById('ghostTwoOverlay').style.left = (GhostInd[1][1]).toString() + 'px';

    document.getElementById('ghostThreeOverlay').style.top = (GhostInd[2][0]).toString() + 'px';
    document.getElementById('ghostThreeOverlay').style.left = (GhostInd[2][1]).toString() + 'px';

    document.getElementById('ghostFourOverlay').style.top = (GhostInd[3][0]).toString() + 'px';
    document.getElementById('ghostFourOverlay').style.left = (GhostInd[3][1]).toString() + 'px';


    document.getElementById('pacmanOverlay').setAttribute('style', 'background-image: url(resources/Right/pac1.png)');
    document.getElementById('pacmanOverlay').style.top = (PacmanInd[0]).toString() + 'px';
    document.getElementById('pacmanOverlay').style.left = (PacmanInd[1]).toString() + 'px';
    console.log(mazeArray)
    return [mazeArray, gamePoints];
}
