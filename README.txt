// READ ME

To set up your local environment:

$ git clone <address for this repo>

(If you tap copy on the green button on the top right above the repo contents, that will grab the address)

If you already have the repo cloned, then pull in the latest changes:

$ git pull

(If it complains because you have local changes to the code, you can "get rid" of those by stashing them with: $ git stash )

You will need to have Node and NPM installed: https://nodejs.org/en/download/

In the repo, run $ npm install to grab the necessary dependencies (currently just Jimp, to create the image)


To run the program:

$ node index.js <text> <iterations>

Node is the dev framework.

The program lives in the index.js.

<text> is the string of characters that will be translated into the knitting pattern. (Note that only letters are allowed, no numbers or special characters like spaces or punctuation are currently supported.)

<iterations> is the number of images that will be created. If you are creating a pattern with a lot of incidentals, then its nice to create multiples, so you can find the best ones.

This will result in images being created with the name "pattern" and the height and width of the patttern appended (as well as the iteration number). Note that running the program again will overwrite any existing images with the same width/height. It is strongly suggested to move any images you wish to keep to a different directory immediately after you create them.

Have fun!