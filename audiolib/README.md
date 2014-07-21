This app uses the web audio API to synthesize sounds.  The code includes synthesized sounds for the following instruments:

1. Organ
2. Piano
3. EDM
4. Acoustics

Thank you to http://keithwhor.com/music/ for providing the calculations and theory on developing this code.  

The web audio API can easily handle the processing power to deal with synthesizing and playing multiple sounds.  Since it is native to the browser, it is quick, and many of the processes run asynchronously.  For this reason, the web audio API was a good choice for this app. It is also a fascinating API.  It gives the browser the ability to create, edit, and play sounds.  In the past, developers would have to use an outside library or the audio element, which was slow in comparison to the native audio API.  

Here are a few good intros to the web audio API.  These can be quickly read, and are easy to skim through:

1. http://middleearmedia.com/web-audio-api-basics/ - provides a great analogy to understand the philosophy of the API

2. http://middleearmedia.com/web-audio-api-audio-buffer/ - a great explanation of the audio buffer ( used in the code multiple times )

3. http://middleearmedia.com/web-audio-api-bufferloader/ - more info on buffers

4. http://middleearmedia.com/web-audio-api-oscillators/ - an introduction to oscillators.  Unfortunately, the code does not use oscillators.  I would like to convert the synthesized sounds to ONLY use the oscillators.  It is entirely possible since the oscillators have a Fourier function associated with them (custom oscillator).

5. http://keithwhor.com/music/ Synthesized sounds come from here

6. http://www.willvillanueva.com/the-web-audio-api-from-nodeexpress-to-your-browser/ - Check my blog post on how to use a server to efficiently server sounds to the web audio API

7. http://sendoushi.com/blog/web-audio-api-soundjs-d3/ - a superb example of how you can use the ANALYZER nodes to visualize the web audio sounds.  I would definitely like to include this feature in the future.

8. http://chimera.labs.oreilly.com/books/1234000001552 - an advanced resource on the web audio API.  IT is the best resource available anywhere.  IT is extremely thorough, and an entertaining read.

9. http://labs.dinahmoe.com/ToneCraft/ - In my opinion, the most interesting app developed through the web audio API.  This was an inspiration for our app.


# Setting up a Sound Board
In the audio library, you can create a soundBoard by doing the following: 

`new SoundBoard(gridInformation)`

If you are bringing in sounds from a previous SoundBoard, you will pass the gridInformation in.  Otherwise, you can create the SoundBoard without passing any parameters in.

To add a grid to the SoundBoard, you will want to create a grid first:

`new Grid(instrument, BPM, frequency, noteScheduler)`

Our code is set to build 6 different frequencies for the grid centered around the frequency you pass in.  We have built it on the pentatonic scale.  Please do experiment with this, and try different scales!  Feel free to change this function around to take different notes.  In fact, I encourage it :)

To play an individual grids interval, you can just call the playInterval function.  To stop the scheduled sounds, just call the stop interval.

To play any sound, just call the playSounds function:

`playSounds( frequencyOrSound, volume, start)`

You may enter in ANY frequency.  This function is capable of playing any note - since the sounds are synthesized.  However, the note must exist in the Grid hash. To add it, just make sure the Grid includes the scale value.

Next, you'll want to add the grid to the soundBoard:

`SoundBoard.addGrid(Grid)`

The soundBoard has a playCurrentSound function.  It will play any sound from the current grid.  The current grid is the grid that the user is playing with/adjusting.  It will always be the last Grid in the SoundBoard's grid array.

Each individual grid has a noteScheduler object.  This object gives instructions on what sound should be played for each column.  Since the user can only adjust the currentBoard, the toggle function exists on the SoundBoard prototype.  It will only toggle (turn on and off scheduled sounds) the current board.

Once you have grids within the soundBoard, you can use the playInterval function.  This function will schedule and play all the sounds at the correct time for the loops.  This function takes a callback, but does not require a callback.  The callback simply gives information on what column is the current, activated column in the grid.  We use this callback to light up the columns in the grid view.

The stopInterval function stops the looping sounds.

The exportGrids function extracts the necessary information to create an IDENTICAL soundboard.  Once you have exported the Grids, you can pass it into a new instance of the SoundBoard to recreate it:
new SoundBoard(gridInformation).

