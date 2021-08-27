from pathlib import Path
import json

root_dir = Path("C:\\Users\\semha\\Downloads\\Basic")

entries = {}

for volume_dir in root_dir.iterdir():
    print(volume_dir)
    volume_number = volume_dir.name.split(' ').pop()

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
