#!/usr/bin/env python

import sys
import datetime
from create_new_post_config import config

def main():
    if len(sys.argv) != 2:
        print "Usage: python create_new_post.py 'title'"
        return
    title = sys.argv[1]
    now = datetime.datetime.now().strftime("%Y-%m-%d")
    now_s = datetime.datetime.now().strftime("%Y-%m-%d %H:%M:%S")
    front_matter = '---\nlayout: post\ntitle: \ndate: %s\ncategory: \ntags:\n---\n\n' % (now_s)

    post_path = ''
    if config["post_path"] is not None:
        post_path = config["post_path"]
        if not post_path.endswith('/'):
            post_path += '/'
    filename = post_path + now + '-' + title.replace(' ', '_') + '.md'
    with open(filename, 'w') as f:
        f.write(front_matter)

if __name__ == '__main__':
    main()
