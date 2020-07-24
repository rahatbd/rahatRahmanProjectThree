const tilesApp = {};

tilesApp.colours = ['gold', 'magenta', 'deeppink', 'darkorange', 'crimson', 'darkgreen', 'darkturquoise', 'cornflowerblue',
                    'gold', 'magenta', 'deeppink', 'darkorange', 'crimson', 'darkgreen', 'darkturquoise', 'cornflowerblue'];
// tilesApp.coloursCopy = tilesApp.colours;

tilesApp.eventListeners = function() {
    $('span').on('click', function() {
        let randomNumber = Math.floor(Math.random() * tilesApp.colours.length);
        let randomIndex = tilesApp.colours.splice(randomNumber, 1);
        $(this).css('background-color', randomIndex[0]);
        $(this).off('click');
        console.log(randomIndex[0]);
    })
}

$(document).ready(function() {
    tilesApp.eventListeners();
})