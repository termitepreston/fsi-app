from pathlib import Path
import json
import argparse

entries = {}

parser = argparse.ArgumentParser(
    description="Parse a directory of audio files.")
parser.add_argument('directory', metavar='D',
                    nargs=1, help="The directory to be parsed.")
args = parser.parse_args()
root_dir = Path(args.directory.pop())

for volume_dir in root_dir.iterdir():
    if volume_dir.is_file():
        continue
    last_part = volume_dir.name.split(' ').pop()

    try:
        volume_number = int(last_part)
    except ValueError:
        continue

    entries[volume_number] = {}
    entries[volume_number]["units"] = {}
    for file in volume_dir.iterdir():
        if not file.is_file:
            continue
        if file.suffix == ".pdf":
            book_path = Path("/") / volume_dir.name / file.name
            entries[volume_number]["book"] = book_path.name
        elif file.suffix == ".mp3":
            final_parts = file.name.split(' ').pop().split('.')
            unit = int(final_parts[0])
            lesson = int(final_parts[1])
            audio_path = Path("/") / volume_dir.name / file.name
            if not unit in entries[volume_number]["units"]:
                entries[volume_number]["units"][unit] = {}
            entries[volume_number]["units"][unit][lesson] = audio_path.name

print(json.dumps(entries, sort_keys=True, indent=2))
