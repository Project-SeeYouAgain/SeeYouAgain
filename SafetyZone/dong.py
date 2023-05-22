import json
import os


def read_json_file(file_path):
    with open(file_path, 'r', encoding='utf-8') as f:
        data = json.load(f)
    return data


def save_json_file(file_path, data):
    with open(file_path, 'w', encoding='utf-8') as f:
        json.dump(data, f, ensure_ascii=False, indent=4)


def split_json_file(input_file, output_dir, output_prefix, lat_splits, lng_splits):
    data = read_json_file(input_file)

    lat_ranges = []
    lng_ranges = []

    min_lat, max_lat = 35.090000, 35.250000
    min_lng, max_lng = 126.660000, 126.990000

    lat_step = (max_lat - min_lat) / lat_splits
    lng_step = (max_lng - min_lng) / lng_splits

    for i in range(lat_splits + 1):
        lat_ranges.append(min_lat + i * lat_step)

    for i in range(lng_splits + 1):
        lng_ranges.append(min_lng + i * lng_step)

    total_parts = lat_splits * lng_splits
    current_part = 1

    # Create the output directory if it doesn't exist
    os.makedirs(output_dir, exist_ok=True)

    for i in range(lat_splits):
        for j in range(lng_splits):
            part_data = [grid for grid in data if
                         lat_ranges[i] <= grid['lat'] < lat_ranges[i + 1] and lng_ranges[j] <= grid['lng'] < lng_ranges[
                             j + 1]]
            output_file = os.path.join(output_dir, f"{output_prefix}_{i + 1}_{j + 1}.json")
            save_json_file(output_file, part_data)

            progress = (current_part / total_parts) * 100
            print(f"Progress: {progress:.2f}% ({current_part}/{total_parts})")
            current_part += 1


input_file = 'grid_scores_width.json'
output_dir = 'output'
output_prefix = 'grid_scores'
lat_splits = 72
lng_splits = 145

split_json_file(input_file, output_dir, output_prefix, lat_splits, lng_splits)
