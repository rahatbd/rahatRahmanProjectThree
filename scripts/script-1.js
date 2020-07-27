const tilesApp = {};

tilesApp.colours = ['gold', 'magenta', 'deeppink', 'darkorange', 'crimson', 'darkgreen', 'darkturquoise', 'cornflowerblue',
                    'gold', 'magenta', 'deeppink', 'darkorange', 'crimson', 'darkgreen', 'darkturquoise', 'cornflowerblue'];
tilesApp.spanColour = [];
tilesApp.spanID = [];
tilesApp.clickCount = 0;
tilesApp.matchCount = 0;

tilesApp.totalClick = 0;

tilesApp.getColours = function () {
    for (let i = 0; i < tilesApp.colours.length; i++) {
        const randomNumber = Math.floor(Math.random() * tilesApp.colours.length);
        const randomColour = tilesApp.colours.splice(randomNumber, 1);
        // console.log(randomNumber);
        // console.log(randomColour[0]);
        tilesApp.colours.push(randomColour[0]);
    }
    // console.log(tilesApp.colours);
}

tilesApp.setColours = function () {
    for (let i = 0; i < tilesApp.colours.length; i++) {
        $(`#${i}`).addClass(tilesApp.colours[i]);
        $(`#${i}`).on('click', function () {
            const thisID = $(this).attr('id');
            if (thisID !== tilesApp.spanID[0] && thisID !== tilesApp.spanID[1]) {
                $(this).removeClass('black');
                // $(this).addClass(tilesApp.colours[i]);
                tilesApp.spanColour.push(tilesApp.colours[i]);
                tilesApp.spanID.push(thisID);
                tilesApp.clickCount++;

                tilesApp.totalClick++;
                console.log(tilesApp.totalClick);
                // $(this).addClass('flip-horizontal-bottom');
                // console.log(tilesApp.colours[i]);
                // console.log(tilesApp.spanColour);
                // console.log(tilesApp.spanID);
                // console.log(tilesApp.clickCount);
                tilesApp.matchCheck();
            }
        })
    }
}

tilesApp.matchCheck = () => {
    if (tilesApp.clickCount === 2) {
        setTimeout(function () {
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
            // console.log('Check', tilesApp.clickCount);
            // console.log('Check', tilesApp.spanColour);
            // console.log('Check', tilesApp.spanID);
        }, 500) //check time
    }
}

tilesApp.matchComplete = () => {
    // check length
    if (tilesApp.matchCount === 8) {
        $('.congrats').html(`
        <p>Congratulations!</p>
        <ol>
            <li>You have matched <span>Tiles</span> in ${tilesApp.totalClick / 2} attempts!</li>
            <li>Reload <span>Tiles</span> to play again.</li>
        </ol>
        <button>Play Again?</button>
        `);

        $('html, body').animate({
            scrollTop: $("#congrats").offset().top
        }, 1000);
        
        $('button').on('click', function() {
            location.reload();
        })
        if ($(document).width() === 320) {
            location.reload();
        }
    }
}

tilesApp.init = () => {
    tilesApp.getColours();
    tilesApp.setColours();
}

$(document).ready(function() {
    tilesApp.init();
})