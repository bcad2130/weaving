'use strict'

const Jimp = require('jimp');

const [,,rawInput, numberOfIterations] = process.argv

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


const colorBlack = Jimp.rgbaToInt(  0,   0,   0, 255)
const colorWhite = Jimp.rgbaToInt(255, 255, 255, 255)
const imageType = 'png'

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

    // console.log('String translation is ' + numbers)
    let result = ''
    let numLength = numbers.length

    // console.log('String length is ' + numLength)
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
    for (i = result.length - 1; i >= 0; i--) {
        currentLine = []
        let val = result[i]
        let valPlus = result[i] + 1
        if (valPlus == 5) {
            valPlus = 1
        }

        for (j = result.length - 1; j >= 0; j--) {
            if (result[j] == val || result[j] == valPlus) {
                currentLine.push(1)
            } else {
                currentLine.push(0)
            }
        }
        allLines.push(currentLine)
    }
}

function createTreadling(result) {
    console.log(result[3])
    let treadling = []
    for (i = result.length - 1; i >= 0; i--) {
        let array  = null
        console.log(result[i])
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
        treadling.push(array)
    }
    return treadling
}

function createImage(allLines, iteration = 0) {

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

let h = null
let i = null
let j = null
// let currentLine = null
// let allLines = []

// let result = processString(rawInput)

// let resultLength = result.length

// process.stdout.write("\n")
// process.stdout.write("Your result is " + result)
// process.stdout.write("\n")
// process.stdout.write('Result length is ' + resultLength)
// process.stdout.write("\n")

if (numberOfIterations) {
    for (h = numberOfIterations; h > 0; h--) {
        let currentLine = null
        let allLines = []
        
        let result = processString(rawInput)

        let treadling = createTreadling(result)
        // console.table(treadling)

        stitchPattern(result, currentLine, allLines, treadling)

        // console.table(allLines)


        // createImage(allLines, h)
    }
} else {
    console.log('Enter number of variations')
}

