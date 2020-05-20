'use strict'

const Jimp = require('jimp');

const [,,rawInput] = process.argv

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

const colorWhite = 0xFFFFFFFF
const colorBlack = 0x00000000
const imageType = 'jpg'

function isEven(value) {
    if (value%2 == 0)
        return true;
    else
        return false;
}

let word = rawInput.toUpperCase()
let numbers = ''

word.split('').forEach(letter => {
    if (map[letter]) {
        numbers += map[letter]
    } else {
        // console.log('"' + letter + '" does not exist in map')
    }
})

console.log('string translation is ' + numbers)
let i = null
let result = ''
let numLength = numbers.length

console.log('string length is ' + numLength)
for (i = 0; i < numLength; i++) {
    let a = numbers[i]
    let b = numbers[i + 1]
    if (b == undefined) {
        result += numbers[i]
        break
    }

    var rand = Math.floor(Math.random() * 2) * 2

    result += numbers[i]
    if (isEven(a) && isEven(b)) {
        let oddRand = rand + 1
        result += oddRand
    } else if (!isEven(a) && !isEven(b)) {
        let evenRand = rand + 2
        result += evenRand
    }
}

let resultLength = result.length
console.log('result length is ' + resultLength)


process.stdout.write("\n")
process.stdout.write("Your result is " + result)
process.stdout.write("\n")


let j = null
let currentLine = null
let allLines = []

for (i = resultLength - 1; i >= 0; i--) {
    currentLine = []
    let val = result[i]
    let valPlus = result[i] + 1
    if (valPlus == 5) {
        valPlus = 1
    }

    for (j = resultLength - 1; j >= 0; j--) {
        if (result[j] == val || result[j] == valPlus) {
            currentLine.push(1)
        } else {
            currentLine.push(0)
        }
    }
    allLines.push(currentLine)
}

console.table(allLines)

let imageName = 'pattern_' + resultLength + 'x' + resultLength + '.' + imageType

let image = new Jimp(resultLength, resultLength, function (err, image) {
  if (err) throw err;

  allLines.forEach((row, y) => {
    row.forEach((binary, x) => {
        if (binary) {
            image.setPixelColor(colorBlack, x, y);
        } else {
            image.setPixelColor(colorWhite, x, y);

        }
    });
  });

  image.write(imageName, (err) => {
    if (err) throw err;
  })
})