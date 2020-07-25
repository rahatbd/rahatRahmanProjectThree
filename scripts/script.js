const tilesApp = {};

tilesApp.colours = ['gold', 'magenta', 'deeppink', 'darkorange', 'crimson', 'darkgreen', 'darkturquoise', 'cornflowerblue',
                    'gold', 'magenta', 'deeppink', 'darkorange', 'crimson', 'darkgreen', 'darkturquoise', 'cornflowerblue'];
tilesApp.spanColour = [];
tilesApp.spanID = [];
tilesApp.clickCount = 0;

tilesApp.setColours = function() {
    for (let i=0; i<16; i++) {
        $(`#${i}`).on('click', function() {
            $(this).removeClass('black');
            const colour = $(this).data('colour');
            const thisID = $(this).attr('id');
            if (thisID !== tilesApp.spanID[0] && thisID !== tilesApp.spanID[1]) {
                tilesApp.clickCount++;
                tilesApp.spanColour.push(colour);
                tilesApp.spanID.push(thisID);
            }
            console.log('ListenerClick', tilesApp.clickCount);
            console.log('ListenerSpanColour', tilesApp.spanColour);
            console.log('ListenerSpanID', tilesApp.spanID);
            tilesApp.matchCheck();
        })
    }
}

tilesApp.matchCheck = () => {
    if (tilesApp.clickCount === 2) {
        setTimeout(function() {
            if (tilesApp.spanColour[0] !== tilesApp.spanColour[1]) {
                $(`#${tilesApp.spanID[0]}`).addClass('black');
                $(`#${tilesApp.spanID[1]}`).addClass('black');
            } else {
                $(`#${tilesApp.spanID[0]}`).off('click');
                $(`#${tilesApp.spanID[1]}`).off('click');
            }
            tilesApp.spanColour = [];
            tilesApp.spanID = [];
            tilesApp.clickCount = 0;
            console.log('Check', tilesApp.clickCount);
            console.log('Check', tilesApp.spanColour);
            console.log('Check', tilesApp.spanID);
        }, 200)
    }
}

tilesApp.init = () => {
    tilesApp.setColours();
}

$(document).ready(function () {
    tilesApp.init();
})