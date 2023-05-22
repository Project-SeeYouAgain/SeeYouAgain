import csv
import json
from haversine import haversine
from rtree import index

def read_text_file(file_path):
    locations = []
    with open(file_path, newline='', encoding='utf-8') as textfile:
        reader = csv.reader(textfile, delimiter='\t')
        next(reader, None)  # Skip the header row
        for row in reader:
            try:
                lat = float(row[0])
                lng = float(row[1])
                locations.append({'lat': lat, 'lng': lng})
            except ValueError:
                print(f"Skipping row with invalid data: {row}")
    return locations

def create_rtree(locations):
    idx = index.Index()
    for i, loc in enumerate(locations):
        idx.insert(i, (loc['lat'], loc['lng'], loc['lat'], loc['lng']), obj=loc)
    return idx

# 수정된 calculate_score 함수
def calculate_score(grid_center, safety_zones, max_distance):
    score = 0
    for zone in safety_zones:
        near_locations = list(zone['rtree'].intersection((grid_center['lat'] - max_distance[zone['type']],
                                                           grid_center['lng'] - max_distance[zone['type']],
                                                           grid_center['lat'] + max_distance[zone['type']],
                                                           grid_center['lng'] + max_distance[zone['type']]), objects=True))
        for location in near_locations:
            loc = location.object
            distance = haversine((grid_center['lat'], grid_center['lng']),
                                 (loc['lat'], loc['lng']))

            if zone['type'] == 'police' and distance <= 0.1:
                score += 3
            elif zone['type'] == 'cctv' and distance <= 0.05:
                score += 2
            elif zone['type'] == 'light' and distance <= 0.01:
                if any(z['type'] == 'cctv' and haversine((grid_center['lat'], grid_center['lng']),
                                                         (z_location.object['lat'], z_location.object['lng'])) <= 0.05
                       for z in safety_zones for z_location in z['rtree'].intersection((grid_center['lat'] - 0.05,
                                                                                         grid_center['lng'] - 0.05,
                                                                                         grid_center['lat'] + 0.05,
                                                                                         grid_center['lng'] + 0.05), objects=True)):
                    score += 1
    return score

police_locations = read_text_file('police.txt')
cctv_locations = read_text_file('cctv.txt')
light_locations = read_text_file('light.txt')

police_rtree = create_rtree(police_locations)
cctv_rtree = create_rtree(cctv_locations)
light_rtree = create_rtree(light_locations)

safety_zones = [{'type': 'police', 'rtree': police_rtree},
                {'type': 'cctv', 'rtree': cctv_rtree},
                {'type': 'light', 'rtree': light_rtree}]

min_lat, max_lat = 35.102758, 35.240556
min_lng, max_lng = 126.679394, 126.976253
grid_interval = 0.0005

max_distance = {'police': 0.1, 'cctv': 0.05, 'light': 0.01}
print('the last')
grid_scores = []
for lat in range(int((max_lat - min_lat) / grid_interval)):

    print(lat,"/",int((max_lat - min_lat) / grid_interval))
    for lng in range(int((max_lng - min_lng) / grid_interval)):
        grid_center = {'lat': min_lat + lat * grid_interval, 'lng': min_lng + lng * grid_interval}
        score = calculate_score(grid_center, safety_zones, max_distance)
        grid_scores.append({'lat': grid_center['lat'], 'lng': grid_center['lng'], 'score': score})
print('the end')
with open('grid_scores.json', 'w') as outfile:
    json.dump(grid_scores, outfile, ensure_ascii=False, indent=4)
