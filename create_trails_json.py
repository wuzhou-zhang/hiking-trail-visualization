import glob
import json
import os

trails = glob.glob('data/*.gpx')

numTrails = len(trails)
json_content = {'numTrails': numTrails}

print 'Found {} trails:'.format(numTrails)

for i in xrange(numTrails):
    trail = os.path.basename(trails[i])
    print "{}: {}".format(i, trail)
    json_content[i] = trail

json_file = 'trails.json'
print 'Writing {}...'.format(json_file)
with open(json_file, 'w') as f:
    json.dump(json_content, f, indent=4, separators=(',', ': '))

print 'Done.'
