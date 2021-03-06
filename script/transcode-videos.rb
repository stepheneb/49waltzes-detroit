#!/usr/bin/env ruby
#
# Transcode uncompressed movement and interview videos for 49 Waltzes: Detroit
#
# Examples:
#
# - originals from: /Volumes/SEAGATE2TB
# - transcoded to: ./video
#
#   ./script/transcode-videos.rb -i /Volumes/SEAGATE2TB
#
# - originals from: /Volumes/SEAGATE2TB
# - transcoded to: /Volumes/SEAGATE2TB/video
#
#   ./script/transcode-videos.rb -i /Volumes/SEAGATE2TB -o /Volumes/SEAGATE2TB/video
#

require 'fileutils'
require 'optparse'

@input_directory = "/Volumes/GRAZ2TB"

THIS_DIR = File.expand_path('..', __FILE__)
@transcoded_output_directory = File.expand_path('../video',  THIS_DIR)

@dry_run = false

opts = OptionParser.new
opts.on("-i", "--input-directory=PATH")	{ |val| @input_directory = val }
opts.on("-o", "--output-directory=DIR")	{ |val| @transcoded_output_directory = val }
opts.on("-d", "dry-run")	{ |val| @dry_run = val }

opts.on_tail("-h", "--help", "Show this message") do
  puts opts
  exit
end

opts.parse(ARGV)

@original_movements_path  = File.join(@input_directory, 'OUTPUTS FOR STEVE')
@original_interviews_path  = File.join(@input_directory, 'DETROIT INTERVIEW SECTIONS')

raise "\n\n***: original videos dir not found: #{@input_directory}\n\n" unless File.exists? @input_directory
raise "\n\n***: original movements not found: #{@original_movements_path}\n\n" unless File.exists? @original_movements_path
raise "\n\n***: original interviews not found: #{@original_interviews_path}\n\n" unless File.exists? @original_interviews_path

OUTPUT_DESCRIPTIONS = [
  ["webm", "10M", "1920x1080"],
  ["webm", "2M", "960x540"],
  ["webm", "500k", "480x270"],
  ["mp4", "10M", "1920x1080"],
  ["mp4", "2M", "960x540"],
  ["mp4", "500k", "480x270"]
]

def run_cmd(cmd)
  puts cmd
  system(cmd) unless @dry_run
end

def movement_code(filename)
  File.basename(filename)[/^(.*?)-/, 1]
end

def generate_index(movement_code)
  movement_code[/^(\d*?)([ABCabc])/]
  waltz_number = $1.to_i
  movement_letter = $2.upcase
  movement_number = "ABC".index(movement_letter)
  (waltz_number-1)*3+movement_number+1
end

# libvpx webm examples:
#
# ffmpeg -i ../uncompressed-video/1A-10-BIT-UNCOMP-truncated.mov
#     -threads 8
#     -c:v libvpx
#     -pix_fmt yuv420p
#     -crf 10
#     -b:v 500k
#     -s 480x270
#     -movflags +faststart
#     -r 29.97
#     -c:a libvorbis
#     -aq 5
#     test/001-1A-truncated-960x540-2M.webm
#
# 960x540    -b:v 2M -s 960x540
# 1920x1080  -b:v 10M -s 1920x1080
#

def ffmpeg_libvpx_cmd(input_path, output_path, bitrate, output_size, force=false)
  replace = force ? "-y" : ""
  return [
    "ffmpeg -i '#{input_path}' -threads 8",
    "-c:v libvpx -pix_fmt yuv420p -crf 10 -b:v #{bitrate} -s #{output_size} -movflags +faststart -r 29.97 -c:a libvorbis -aq 5 #{replace} '#{output_path}'"
  ]
end

# x264 mp4 examples:
#
# ffmpeg -i ../uncompressed-video/1A-10-BIT-UNCOMP-truncated.mov
#     -threads 4
#     -c:v libx264
#     -profile:v baseline
#     -pix_fmt yuv420p
#     -tune film
#     -crf 21
#     -s 480x270
#     -movflags +faststart
#     -r 29.97
#     -c:a libfdk_aac -b:a 48k
#     test/001-1A-truncated-480x270-500k.mp4
#
# use -crf 20 for 960x540 and 1920x1080
#

def ffmpeg_libx264_cmd(input_path, output_path, bitrate, output_size, force=false)
  crf = case bitrate
  when "10M" then 20
  when "2M" then 20
  when "500k" then 21
  else 21
  end
  replace = force ? "-y" : ""
  return [
    "ffmpeg -i '#{input_path}' -threads 8",
    "-c:v libx264 -profile:v main -pix_fmt yuv420p -tune film -crf #{crf} -s #{output_size} -movflags +faststart -r 29.97 -c:a libfdk_aac -b:a 48k #{replace} '#{output_path}'"
  ]
end

def process_original_video_batch_outputs(input_path, movement_code, index_str, outputs, subfolder=false, force=false)
  cmd = "ffmpeg -i '#{input_path}' -threads 8 \\\n"
  output_needed = false
  output_paths = []
  outputs.each do |output|
    output_format, bitrate, output_size = output
    output_dir = "#{@transcoded_output_directory}/#{output_format}-#{output_size}-#{bitrate}"
    if subfolder
      output_dir = output_dir + '/' + subfolder
    end
    FileUtils.mkdir_p output_dir unless File.exists? output_dir
    output_path = "#{output_dir}/#{index_str}#{movement_code}-#{output_size}-#{bitrate}.#{output_format}"
    output_paths << output_path

    next if File.exists?(output_path)
    output_needed = true
    if output_format == "webm"
      cmd += "  " + ffmpeg_libvpx_cmd(input_path, output_path, bitrate, output_size)[1] + " \\\n"
    elsif output_format == "mp4"
      cmd += "  " + ffmpeg_libx264_cmd(input_path, output_path, bitrate, output_size)[1] + " \\\n"
    else
      raise "unknown output format error: #{output_format}"
    end
  end
  if output_needed
    cmd = cmd[0..-4]
    begin
      run_cmd(cmd)
    rescue Interrupt
      output_paths.each do |output_path|
        FileUtils.rm(output_path) if File.exists?(output_path)
      end
      raise Interrupt
    end
  else
    puts "transcoded video files already exist"
  end
end

# 1A-10-BIT-UNCOMP.mov ... 49C-10-BIT-UNCOMP.mov
originals = Dir[@original_movements_path + "/*.mov"]

originals.sort! {|a,b| generate_index(movement_code(a)) <=> generate_index(movement_code(b))}

originals.each do |original_path|
  movement_code = movement_code(original_path)
  index = generate_index(movement_code)
  puts "original: #{original_path}"
  puts "index: #{index}"
  index_str = format("%03d-", index)
  process_original_video_batch_outputs(original_path, movement_code, index_str, OUTPUT_DESCRIPTIONS)
  puts
end

puts "processing original interviews ..."
puts
original_interviews = Dir[@original_interviews_path + "/*.mov"]

original_interviews.each do |original_interview_path|
  movement_code = File.basename(original_interview_path)[/^(.*?) /,1] + "-interview"
  index = generate_index(movement_code)
  puts "original: #{original_interview_path}"
  puts "index: #{index}"
  index_str = format("%03d-", index)
  outputs = [
    ["webm", "10M", "1920x1080"],
    ["webm", "2M", "960x540"],
    ["webm", "500k", "480x270"],
    ["mp4", "10M", "1920x1080"],
    ["mp4", "2M", "960x540"],
    ["mp4", "500k", "480x270"]
  ]
  process_original_video_batch_outputs(original_interview_path, movement_code, index_str, OUTPUT_DESCRIPTIONS, "interviews")
  puts
end

