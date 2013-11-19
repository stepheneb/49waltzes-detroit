#!/usr/bin/env ruby
require 'open-uri'
require 'nokogiri'
require 'json'

@doc = Nokogiri::XML(open('detroit-waltzes-real-final-13.kml'))

@locations = []

@doc.css('Folder').each do |folder|
  waltz_number = folder.css('> name').text.to_i
  index = waltz_number*3-2
  movement = "A"
  folder.css('> Placemark').each do |placemark|
    puts "#{index}: #{waltz_number}#{movement}"
    address = placemark.css('> name').text
    puts address
    longitude, latitude = placemark.css('> Point > coordinates').text.split(',').collect {|c| c.to_f }
    puts longitude
    puts latitude
    location = {
      :index => index,
      :waltz => waltz_number,
      :movement => movement,
      :latitude => latitude,
      :longitude => longitude,
      :address => address
    }
    @locations << location
    puts
    index += 1
    movement = movement.next
  end
  puts "--------"
  puts
end
puts
locations_json = (JSON.pretty_generate(@locations))
File.open("detroit-waltzes.json", 'w') do |f|
  f.write(locations_json)
end
puts locations_json
puts