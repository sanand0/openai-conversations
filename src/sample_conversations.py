import json
import random
import argparse
from pathlib import Path

def main() -> None:
    """Sample random conversations from JSON file and print as compact JSON."""
    parser = argparse.ArgumentParser()
    parser.add_argument('file', type=Path, help='JSON file with conversations array')
    parser.add_argument('n', type=int, help='Number of conversations to sample')
    args = parser.parse_args()

    convos = json.load(args.file.open())
    samples = random.sample(convos, args.n)
    # Convert mapping to list of messages
    for sample in samples:
        sample["mapping"] = list(sample["mapping"].values())
    print(json.dumps(samples, separators=(',', ':')))

if __name__ == "__main__":
    main()
