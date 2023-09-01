const titlesContainer = document.querySelector('.tiles');

const colors = ["Red", "Blue", "Green", "Orange", "Purple", "Pink", "Brown", "Cyan"];
//This is an array that has a a single instance of each color

const colorPicklist = [...colors, ...colors];

const tileCount = colorPicklist.length;
//shortcut to use the length


//Game Setup Variables
let revealedCount = 0;
let activeTile = null;
let awaitingEndOfMove = false;


//Create the tiles for our game 
function buildTile(color) {
    const element = document.createElement('div');
    //creating our div that contains our tiles 

    element.classList.add('tile');
    //this adds the tile 

    element.setAttribute('data-color', color);
    //this makes it so that the data it holds will be a color

    element.setAttribute('data-revealed', 'false')

    element.addEventListener('click', () => {
        const revealed = element.getAttribute('data-revealed');

        if (awaitingEndOfMove || revealed === 'true' || element === activeTile) {
            //So you cant tamper with tile after selection 
            return;
        }

        element.style.backgroundColor = color;
        //sets the color to the tiles 

        if (!activeTile) {
            activeTile = element;

            return;
        }

        const colorToMatch = activeTile.getAttribute('data-color')

        if (colorToMatch === color) {
            activeTile.setAttribute('data-revealed', 'true')
            element.setAttribute('data-revealed', 'true')

            awaitingEndOfMove = false;
            activeTile = null;
            revealedCount +=2

            if (revealedCount === tileCount){
                alert('You beat level 1 move on to level 2!')
                window.location.assign('../level 2/level2.html')
            }

            return;
        }

        awaitingEndOfMove = true;

        //cooldown after selection 
        setTimeout(() => {
            element.style.backgroundColor = null;
            activeTile.style.backgroundColor = null;

            awaitingEndOfMove = false;
            activeTile = null;
        }, 650)
    });

    return element;

}



//------------------Making our tiles generate random colors
for (let i = 0; i < tileCount; i++){
    const randomIndex = Math.floor(Math.random() * colorPicklist.length);
    //this will generate a random color from the array 
    const color = colorPicklist[randomIndex];
    //this will select it 
    const tile = buildTile(color);

    colorPicklist.splice(randomIndex, 1)

    titlesContainer.appendChild(tile)
    //The append child adds the tile to the tilesContainer in our html 

}