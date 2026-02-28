import os
import time
from watchdog.observers import Observer
from watchdog.events import FileSystemEventHandler

class Handler(FileSystemEventHandler):

    def on_modified(self, event):
        if ".git" in event.src_path:
            return

        # wait a bit so file save completes
        time.sleep(1)

        # check if there are actual changes
        status = os.popen("git status --porcelain").read().strip()

        if status:
            print("📝 Changes detected → committing...")
            os.system("git add .")
            os.system('git commit -m "auto update"')
            print("🚀 Pushing to GitHub...")
            os.system("git push")
        else:
            print("✔️ File touched but nothing changed")

observer = Observer()
observer.schedule(Handler(), ".", recursive=True)
observer.start()

print("👀 Watching project... Press CTRL+C to stop")

try:
    while True:
        time.sleep(2)
except KeyboardInterrupt:
    observer.stop()

observer.join()