'use strict'

// dependencies

const Jimp = require('jimp');

// constants

const [,,rawInput, numberOfIterations, cornerPattern] = process.argv
const colorBlack = Jimp.rgbaToInt(  0,   0,   0, 255)
const colorWhite = Jimp.rgbaToInt(255, 255, 255, 255)
const imageType = 'png'

const map = {
    A: 1,
    B: 2,
    C: 3,
    D: 4,
    E: 1,
    F: 2,
    G: 3,
    H: 4,
    I: 1,
    J: 2,
    K: 3,
    L: 4,
    M: 1,
    N: 2,
    O: 3,
    P: 4,
    Q: 1,
    R: 2,
    S: 3,
    T: 4,
    U: 1,
    V: 2,
    W: 3,
    X: 4,
    Y: 1,
    Z: 2,
}

const tieDown = [
    [0,0,4,4],
    [0,3,3,0],
    [2,2,0,0],
    [1,0,0,1],
]


//functions

function isEven(value) {

    if (value%2 == 0)
        return true;
    else
        return false;
}

function processString(rawInput) {

    let word = rawInput.toUpperCase()
    let numbers = ''

    word.split('').forEach(letter => {
        if (map[letter]) {
            numbers += map[letter]
        } else {
            // console.log('"' + letter + '" does not exist in map')
        }
    })

    let result = ''
    let numLength = numbers.length

    for (i = 0; i < numLength; i++) {
        let a = numbers[i]
        let b = numbers[i + 1]
        if (b == undefined) {
            result += numbers[i]
            break
        }

        var rand = Math.floor(Math.random() * 2) * 2

        result += numbers[i]
        // add incidentals
        if (isEven(a) && isEven(b)) {
            let oddRand = rand + 1
            result += oddRand
        } else if (!isEven(a) && !isEven(b)) {
            let evenRand = rand + 2
            result += evenRand
        }
    }
    return result
}

function stitchPattern(result, currentLine, allLines, treadling) {

    for (i = 0; i < result.length; i++) {
        currentLine = []
        
        let dotPos = null
        let vals = []

        for (j = 0; j < 4; j++) {

            if (treadling[i][j] == 1) {
                dotPos = j
            }
        }

        for (j = 0; j < 4; j++) {
            if (tieDown[dotPos][j] != 0)
                vals.push(tieDown[j][dotPos])
        }

        for (j = 0; j < result.length; j++) {
            if (result[j] == vals[0] || result[j] == vals[1]) {
                currentLine[j] = 1
            } else {
                currentLine[j] = 0
            }
        }

        allLines.push(currentLine)
    }
}

function createTreadling(result) {

    let treadling = []
    for (i = result.length - 1; i >= 0; i--) {
        let array  = null

        if (cornerPattern === 'star') {
            switch(result[i]) {
                case '1':
                    array = [1,0,0,0]
                    break
                case '2':
                    array = [0,1,0,0]
                    break
                case '3':
                    array = [0,0,1,0]
                    break
                case '4':
                    array = [0,0,0,1]
                    break
                default:
                    console.log('error')
                    break
            }
        } else if (cornerPattern === 'rose') {
            switch(result[i]) {
                case '1':
                    array = [0,1,0,0]
                    break
                case '2':
                    array = [1,0,0,0]
                    break
                case '3':
                    array = [0,0,0,1]
                    break
                case '4':
                    array = [0,0,1,0]
                    break
                default:
                    console.log('error')
                    break
            }
        } else {
            console.log('Error: Choose star or rose pattern.')
        }
        treadling.push(array)
    }
    return treadling
}

function createImage(result, allLines, iteration = 0) {

    let imageName = 'pattern_' + result.length + 'x' + result.length + '_' + iteration + '.' + imageType

    let drawDown = new Jimp(result.length, result.length, function (err, drawDown) {
        if (err) throw err

        allLines.forEach((row, y) => {
            row.forEach((binary, x) => {
                if (binary) {
                    drawDown.setPixelColor(colorBlack, x, y)
                } else {
                    drawDown.setPixelColor(colorWhite, x, y)
                }
            })
        })

        drawDown.write(imageName, (err) => {
            if (err) throw err;
        })
    })
}



// main

let h = null
let i = null
let j = null

if (numberOfIterations) {
    for (h = numberOfIterations; h > 0; h--) {
        let currentLine = null
        let allLines = []
        
        let result = processString(rawInput)

        let treadling = createTreadling(result)

        stitchPattern(result, currentLine, allLines, treadling)

        createImage(result, allLines, h)
    }
} else {
    console.log('Enter number of variations')
}

