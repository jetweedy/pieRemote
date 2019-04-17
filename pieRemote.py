import pyautogui 

import ctypes
import os
import time
import sys
import urllib
import urllib.request
import urllib.parse
import json

import sys
import subprocess

if (os.name=='nt'):
	import win32gui
	import win32con

global passcode

def usePasscode(passcode):

	# Some config for no-idling
	MOUSEEVENTF_MOVE = 0x0001
	right = 0;
	down = 0;
	# If mac, set to noidle
	#if (os.name=="posix"):
	#	try:
	#	  os.system("pmset noidle")
	#	except: 
	#	  pass
	#else:
	#	mouse_event = ctypes.windll.user32.mouse_event


	#x_dim, y_dim = m.screen_size()
	#m.click(x_dim/2, y_dim/2, 1)

	# If on a mac, run caffeinate to prevent sleeping
	if (os.name=="posix"):
		if 'darwin' in sys.platform:
			print('Running \'caffeinate\' on MacOSX to prevent the system from sleeping')
			subprocess.Popen('caffeinate')		

	#dt = datetime.datetime.now().strftime('%Y%m%d')
	min = 0
	#passkey = dt + passcode

	while 1>0:
		time.sleep(1)
		try:
			# If windows, jiggle the mouse 0 to the right, 0 down
			if (os.name=="nt"):
				mouse_event(MOUSEEVENTF_MOVE, right, down, 0, 0)
		except: 
		  pass
		try:
			params = urllib.parse.urlencode({ 'action' : 'get' , 'passcode' : passcode, 'min' : min });
			url = "http://trianglewebtech.com/tools/pieRemote/actions.php?"+params
#			print(url)
			with urllib.request.urlopen(url) as response:
				data = json.loads( response.read().decode("utf-8") );
				for ks in data:
					time.sleep(.1);
					min = max(int(ks['id']),min)
					if (ks['keystroke']=="LEFT"):
						pyautogui.press('left')
					elif (ks['keystroke']=="RIGHT"):
						pyautogui.press('right')
					elif ('TOUCH' in ks['keystroke']):
#						print("TOUCH", ks['keystroke']['TOUCH'])
						touch = json.loads( ks['keystroke'] )
#						print(touch['TOUCH'])
						screenWidth, screenHeight = pyautogui.size() 
						screenX = screenWidth * touch['TOUCH']['x']
						screenY = screenHeight * touch['TOUCH']['y']
						pyautogui.moveTo(screenX, screenY)
#						print(screenX, screenY)
						# get screenH, screenW
						# calculate touchX, touchY based on x/y %'s
						# use pyautogui to move mouse to touchX, touchY
					elif (ks['keystroke']=="LEFTCLICK"):
						pyautogui.click()
					elif (ks['keystroke']=="LEFTDOUBLECLICK"):
						pyautogui.doubleClick() 
					elif (ks['keystroke']=="RIGHTCLICK"):
						pyautogui.rightClick()
					else:
#						print("typewrite: ", ks['keystroke'])
						pyautogui.typewrite(ks['keystroke'], interval=0.25)
		except Exception as e: 
			exc_type, exc_obj, exc_tb = sys.exc_info()
			fname = os.path.split(exc_tb.tb_frame.f_code.co_filename)[1]
			print(e, exc_type, fname, exc_tb.tb_lineno)






# ---------------------------------------------------------
#passcode = input('Enter Passcode (from pieRemote): ')
# ---------------------------------------------------------
#	I want to gather some input here and then close it
# ---------------------------------------------------------
import tkinter
from tkinter import messagebox
top = tkinter.Tk()
top.geometry("400x50+300+300")	#width x height + x + y

## Code to add widgets will go here...
#messagebox.showinfo("Say Hello", "Hello World")

def send():
	global username
	passcode = tkinter.myEntryBox.get()
	top.destroy()
	usePasscode(passcode)

tkinter.myLabel = tkinter.Label(top, text="Enter Code: ")
tkinter.myLabel.pack()
tkinter.myLabel.place(height=20, width=100, x=10, y=10)

tkinter.myEntryBox = tkinter.Entry(top)
tkinter.myEntryBox.pack()
tkinter.myEntryBox.focus()
tkinter.myEntryBox.place(height=20, width=100, x=110, y=10)

tkinter.mySubmitButton = tkinter.Button(top, text='Go!', command=send)
tkinter.mySubmitButton.pack()
tkinter.mySubmitButton.place(height=20, width=50, x=240, y=10)

top.mainloop()

# ---------------------------------------------------------

