# pieRemote

A clunky app that turns a web page into a remote control for your computer.

## Background
This was kind of an accidental learning project. I hurt my back a few years ago and was resting at my parents' house. They didn't have any kind of Roku/remote situation going, but I was able to connect my laptop by HDMI and watch whatever I wanted over the weekend while I was recovering. However every time I wanted to pause or navigate the menu in Netflix, I found myself having to physically stand up and walk over to the computer and - and trust me, this was excrutiating - lift my foot a little and tap the space bar. I thought to myself... if I had a remote on my phone that did things on my computer, I could just hit a few keys from there. Obviously I didn't make this on _that_ weekend, but it did give me an idea for a learning project, since I was starting to learn some Python anyway. So I developed a simple little app that just pinged a stack of instructions on a server that were left by a separate web app that I could visit in my phone using a shared code. It allowed me to easily click arrow keys, the space bar, tap to move the mouse to areas of the screen, left and right click, and even type some custom keys.

_DISCLAIMER_ In trying this on newer versions of windows - or under certain security restrictions - I have found that this program either does not install or throws all kinds of security warnings. At this point, it's probably not the best tool for the job, but it was an interesting learning project nonetheless.


## Web Installation

1. Install the /web/ folder in a directory on a server running PHP.
1. Configure config.php to use your DB credentials.
1. Visit setup.php once to build the database tables.

## Python script installation

1. Install python, pip and pyinstaller.
1. Compile and run:
  ```
  pyinstaller pieRemote.py --onefile
  python pieRemote.py
  ```
