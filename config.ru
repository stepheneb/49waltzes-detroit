PUBLIC_PATH = Dir.getwd
use Rack::ConditionalGet
use Rack::ContentLength
use Rack::Static, :urls => [""], :root => PUBLIC_PATH, :index =>'index.html'

Rack::Mime::MIME_TYPES.merge!({
  ".ttf" => "font/ttf",
  ".mml" => "application/xml",
  ".cml" => "application/xml",
  ".e2d" => "application/xml"
})

app = Rack::Directory.new PUBLIC_PATH

run app
