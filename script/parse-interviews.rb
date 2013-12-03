#!/usr/bin/env ruby

THIS_DIR = File.expand_path('..', __FILE__)
VIDEO_PATH = File.expand_path('../video',  THIS_DIR)

require 'json'

def extract_interview_data(path)
  path[/interviews\/(\d+?)-(\w+?)-/]
  {
    :index => $1,
    :waltz => $2,
    :movement => $3
  }
end

def video_type(path)
  path[/^(\w*?)-/, 1]
end

def video_size(path)
  path[/^.*?-(\w*?)-/, 1]
end

def video_rate(path)
  path[/^.*-(\w*?)$/, 1]
end

@interviews = {}

Dir.chdir(VIDEO_PATH) do
  @interview_directories =  Dir["*/interviews"].collect { |p| File.dirname(p) }
  interview_directory = @interview_directories[0]
  interview_paths = Dir["#{interview_directory}/interviews/*.#{video_type(interview_directory)}"]
  interview_paths.sort! { |a,b|
    extract_interview_data(a)[:index] <=> extract_interview_data(b)[:index]
  }

  @video_types = @interview_directories.collect { |p| video_type(p) }.uniq
  @video_sizes = @interview_directories.collect { |p| video_size(p) }.uniq
  @video_rates = @interview_directories.collect { |p| video_rate(p) }.uniq

  interview_paths.each do |interview_path|
    interview = extract_interview_data(interview_path)
    @interviews["#{interview[:waltz]}#{interview[:movement]}"] = interview
  end

  interviews_json = JSON.pretty_generate(@interviews)

  File.open("interviews.json", 'w') do |f|
    f.write(interviews_json)
  end

  puts interviews_json
end
