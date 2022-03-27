from string import whitespace
import pyautogui
import time

places = [
    "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z", "!", "@", "#", "$", "%", "^"
]

print("ETA:", 30*16*(3*60+1)/60/60, "hours")

time.sleep(3)
for place in places:
    # for number in range(1,17):
    #     text = f"r!pl {place}{number} white"
    #     pyautogui.typewrite(text) 
    #     pyautogui.press("enter")
    #     time.sleep(3*60+1)
    for number in range(17,33):
        text = f"r!pl {place}{number} red"
        pyautogui.typewrite(text)
        pyautogui.press("enter")
        time.sleep(3*60+1)