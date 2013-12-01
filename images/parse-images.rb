#!/usr/bin/env ruby

require 'json'

def extract_image_number(path)
  path[/\/(\d+)\.jpg/, 1].to_i
end

image_paths = Dir["stills-1920x1080-jpg/*.jpg"]
image_paths.sort! { |a,b| extract_image_number(a) <=> extract_image_number(b) }

@images = {}

image_paths.each do |image_path|
  image = {}
  waltz = extract_image_number(image_path)
  image[:path] = {
    "1920x1080" => "images/" + image_path,
    "846x486" => "images/stills-846x486-jpg/" + waltz.to_s + ".jpg"
  }
  image[:waltz] = waltz
  image[:movement] = nil
  @images[waltz] = image
end

images_json = JSON.pretty_generate(@images)

File.open("still-images.json", 'w') do |f|
  f.write(images_json)
end

puts images_json
