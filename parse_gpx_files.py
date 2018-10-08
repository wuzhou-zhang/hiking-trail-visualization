import glob
import gpxpy
import json
import os

script_dir = os.path.dirname(os.path.realpath(__file__))
data_dir = os.path.join(script_dir, 'data')
gpx_files = glob.glob(os.path.join(data_dir, '*.gpx'))

# gpx_files = gpx_files[:1]

num_trails = len(gpx_files)
json_content = {'numTrails': num_trails}

json_data_dir = os.path.join(script_dir, 'json_data')
if not os.path.exists(json_data_dir):
    print 'creating dir {} as it does not exist'.format(json_data_dir)
    os.makedirs(json_data_dir)

for idx, gpx_file in enumerate(gpx_files):
    print gpx_file
    trail = os.path.basename(gpx_file)[:-4]
    print "{}: {}".format(idx, trail)
    json_content[idx] = trail

    with open(gpx_file, 'r') as f:
        gpx = gpxpy.parse(f)
        data_points = gpx.tracks[0].segments[0].points
        hike_name = gpx.tracks[0].name
        # start_time = start_point.time
        print hike_name
        # print start_time
        json_data = {
            'hikeName': hike_name,
            #'startTime': start_time,
            'trace': [[point.latitude, point.longitude] for point in data_points]
        }
        with open(os.path.join(json_data_dir, trail + '.json'), 'w') as f:
            json.dump(json_data, f)

json_file = 'trails_index.json'
print 'Writing {}...'.format(json_file)
with open(json_file, 'w') as f:
    json.dump(json_content, f, indent=4, separators=(',', ': '))

print 'Done.'

