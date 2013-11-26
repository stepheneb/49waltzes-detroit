#!/usr/bin/env ruby
require 'open-uri'
require 'nokogiri'
require 'json'

@doc = Nokogiri::XML(open('detroit-waltzes-real-final-fixes-5.kml'))

@locations = []

@movements = []

def indexOfLocation(lat, lon)
  @locations.find_index { |loc| loc[:latitude] == lat && loc[:longitude] == lon}
end

@doc.css('Folder').each do |folder|
  folder.css('> Placemark').each do |placemark|
    waltz_number = folder.css('> name').text.to_i
    index = waltz_number*3-2
    movement_letter = "A"
    puts "#{index}: #{waltz_number}#{movement_letter}"
    address = placemark.css('> name').text
    puts address
    longitude, latitude = placemark.css('> Point > coordinates').text.split(',').collect {|c| c.to_f }
    puts longitude
    puts latitude
    location = {
      :address => address,
      :latitude => latitude,
      :longitude => longitude,
      :movements => []
    }
    @locations << location
    puts
  end
  @locations.uniq! { |loc| [loc[:latitude], loc[:longitude]] }
  puts "unique locations: #{@locations.length}"
  puts
end

@doc.css('Folder').each do |folder|
  waltz_number = folder.css('> name').text.to_i
  index = waltz_number*3-2
  movement_letter = "A"
  folder.css('> Placemark').each do |placemark|
    puts "#{index}: #{waltz_number}#{movement_letter}"
    address = placemark.css('> name').text
    puts address
    longitude, latitude = placemark.css('> Point > coordinates').text.split(',').collect {|c| c.to_f }
    location_index = indexOfLocation(latitude, longitude)
    puts longitude
    puts latitude
    puts location_index
    movement = {
      :index => index,
      :waltz => waltz_number,
      :movement => movement_letter,
      :location => location_index
    }
    @movements << movement
    @locations[location_index][:movements] << index
    puts
    index += 1
    movement_letter = movement_letter.next
  end
  puts "--------"
  puts
end
puts

@waltzes = {
  :locations => @locations,
  :movements => @movements
}

waltzes_json = (JSON.pretty_generate(@waltzes))

File.open("detroit-waltzes.json", 'w') do |f|
  f.write(waltzes_json)
end
puts waltzes_json
puts