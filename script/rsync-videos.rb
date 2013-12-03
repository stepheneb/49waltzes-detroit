#!/usr/bin/env ruby

THIS_DIR = File.expand_path('..', __FILE__)
VIDEO_PATH = File.expand_path('../video',  THIS_DIR)


Dir.chdir(VIDEO_PATH) do
  system("rsync -avz --exclude='.DS_Store' #{VIDEO_PATH} /Volumes/Users/stephen/Documents/GitHub/49waltzes-detroit")
end