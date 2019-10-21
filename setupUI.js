var level1 = MazeSets.HackerLevels[0];
var t = 0;
var left = 0;
level1.maze.forEach(row => {
    for (let index = 0; index < row.length; index++) {
        var element = row[index];
        var img = document.createElement('img')
        if (element == '.')
            element = 'food'
        img.src = 'resources/' + element + '.png'
        img.setAttribute('style',
            `height:27px;
            width:27px;
            top:${t}px;
            left:${left}px;
            padding:0px;
            postion:absolute;
            z-index:1`)
        document.getElementById('pacmanMaze').append(img)
        left += 27;
    }
    left = 0;
    t += 27;
});
