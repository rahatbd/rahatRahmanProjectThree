const tilesApp = {};

tilesApp.coloursArray = ['gold', 'magenta', 'deeppink', 'darkorange', 'crimson', 'darkgreen', 'darkturquoise', 'cornflowerblue',
                         'gold', 'magenta', 'deeppink', 'darkorange', 'crimson', 'darkgreen', 'darkturquoise', 'cornflowerblue'];

tilesApp.spanColour = [];
tilesApp.spanID = [];
tilesApp.clickCount = 0;
tilesApp.matchCount = 0;
tilesApp.totalClick = 0;

//Fisher–Yates shuffle algorithm
tilesApp.shuffleColours = () => {
    for (let i = tilesApp.coloursArray.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [tilesApp.coloursArray[i], tilesApp.coloursArray[j]] = [tilesApp.coloursArray[j], tilesApp.coloursArray[i]];
    }
}

tilesApp.setColours = function() {
    for (let i = 0; i < tilesApp.coloursArray.length; i++) {
        $(`#${i}`).addClass(tilesApp.coloursArray[i]);
        $(`#${i}`).on('click', function() {
            const tile = this;
            const tileID = $(this).attr('id');
            setColour(tile, tileID);
        })
        $(`#${i}`).on('keydown', function(event) {
            const tile = this;
            const tileID = $(this).attr('id');
            if (event.keyCode === 13) setColour(tile, tileID);
        })
        const setColour = (tile, tileID) => {
            if (tileID !== tilesApp.spanID[0] && tileID !== tilesApp.spanID[1]) {
                $(tile).removeClass('black');
                tilesApp.spanColour.push(tilesApp.coloursArray[i]);
                tilesApp.spanID.push(tileID);
                tilesApp.clickCount++;
                tilesApp.totalClick++;
                tilesApp.matchCheck();
            }
        }
    }
}

tilesApp.matchCheck = () => {
    if (tilesApp.clickCount === 2) {
        setTimeout(function() {
            if (tilesApp.spanColour[0] !== tilesApp.spanColour[1]) {
                $(`#${tilesApp.spanID[0]}`).addClass('black');
                $(`#${tilesApp.spanID[1]}`).addClass('black');
            } else {
                if ($(document).width() !== 320) {
                    $(`#${tilesApp.spanID[1]}`).addClass('vibrate-1');
                    $(`#${tilesApp.spanID[0]}`).addClass('vibrate-1');
                }
                $(`#${tilesApp.spanID[0]}`).off('click');
                $(`#${tilesApp.spanID[1]}`).off('click');
                tilesApp.matchCount++;
                tilesApp.matchComplete();
            }
            tilesApp.spanColour = [];
            tilesApp.spanID = [];
            tilesApp.clickCount = 0;
        }, 200)
    }
}

tilesApp.matchComplete = () => {
    if (tilesApp.matchCount === (tilesApp.coloursArray.length / 2)) {
        $('.congrats').html(`
        <p>Congratulations!</p>
        <ol>
            <li>You have matched <span>Tiles</span> in ${tilesApp.totalClick / 2} attempts!</li>
            <li>Play <span>Tiles</span> in continuous mode @320px.</li>
        </ol>
        <button>Play Again?</button>
        `);

        $('html, body').animate({
            scrollTop: $("#congrats").offset().top
        }, 1000);

        $('button').on('click', function() {
            location.reload();
        })

        //Reload automatically on match in CONTINUOUS MODE
        if ($(document).width() === 320) {
            location.reload();
        }
    }
}

tilesApp.init = () => {
    tilesApp.shuffleColours();
    tilesApp.setColours();
}

$(document).ready(function() {
    tilesApp.init();
})