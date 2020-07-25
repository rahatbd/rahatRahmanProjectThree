const tilesApp = {};

tilesApp.colours = ['gold', 'magenta', 'deeppink', 'darkorange', 'crimson', 'darkgreen', 'darkturquoise', 'cornflowerblue',
                    'gold', 'magenta', 'deeppink', 'darkorange', 'crimson', 'darkgreen', 'darkturquoise', 'cornflowerblue'];
tilesApp.coloursCopy = [];
tilesApp.spanID = [];
tilesApp.clickCount = 0;

tilesApp.eventListeners = function() {
    $('span').on('click', function() {
        const randomNumber = Math.floor(Math.random() * tilesApp.colours.length);
        const randomIndex = tilesApp.colours.splice(randomNumber, 1);
        const thisID = $(this).attr('id');
        $(this).css('background-color', randomIndex[0]);
        tilesApp.coloursCopy.push(randomIndex[0]);
        tilesApp.spanID.push(thisID);
        
        // $(this).off('click');
        tilesApp.clickCount++;
        // console.log(randomIndex[0]);
        console.log('Listener', tilesApp.clickCount);
        console.log('Listener', tilesApp.coloursCopy);
        console.log('Listener', tilesApp.spanID);
        tilesApp.colourCheck();
    })
}

tilesApp.colourCheck = function() {
    if (tilesApp.clickCount === 2) {
        if (tilesApp.coloursCopy[0] !== tilesApp.coloursCopy[1]) {
            // setTimeout(function() {
                console.log('test');
                $(`#${tilesApp.spanID[0]}`).css('background-color', 'white');
                $(`#${tilesApp.spanID[1]}`).css('background-color', 'white');
            // }, 200); //use transition    timeout is in 200ms    use variables
        }
        else {
            $(`#${tilesApp.spanID[0]}`).off('click');
            $(`#${tilesApp.spanID[1]}`).off('click');
                // use variables
                // $(`#${tilesApp.spanID[0]}`).css('background-color', tilesApp.coloursCopy[0]);
                // $(`#${tilesApp.spanID[1]}`).css('background-color', tilesApp.coloursCopy[0]);
        }
        tilesApp.coloursCopy = [];
        tilesApp.spanID = [];
        tilesApp.clickCount = 0;
        console.log('Check', tilesApp.coloursCopy);
        console.log('Check', tilesApp.spanID);
        console.log('Check', tilesApp.clickCount);
    }
    else {
        // $(`#${tilesApp.spanID[0]}`).off('click');
    }
}

$(document).ready(function() {
    tilesApp.eventListeners();
})