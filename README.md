# pieRemote

A clunky app that turns a web page into a remote control for your computer.\

I'll flesh out the documentation / instructions for use at a later time.

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
