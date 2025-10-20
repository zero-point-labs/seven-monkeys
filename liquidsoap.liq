# Liquidsoap Configuration for Seven Monkeys DJ Platform
# This script handles audio processing and streaming to Icecast

# Enable logging
log.level := 3
log.file := true
log.file.path := "liquidsoap.log"

# Audio settings
audio.samplerate := 44100
audio.channels := 2

# Input sources for each DJ
def dj_source(name, mount_point) =
  # Create a fallback source with silence
  fallback([
    # Try to connect to DJ's input (microphone/audio interface)
    input.alsa(device="hw:" ^ name ^ ",0"),
    # Fallback to file playlist
    playlist(mode="randomize", "/audio/" ^ name ^ "/"),
    # Ultimate fallback to silence
    silence()
  ])
end

# Create DJ sources
dj1_source = dj_source("dj1", "/dj1")
dj2_source = dj_source("dj2", "/dj2") 
dj3_source = dj_source("dj3", "/dj3")
dj4_source = dj_source("dj4", "/dj4")

# Audio processing pipeline
def process_audio(source) =
  source
  # Normalize audio levels
  |> normalize()
  # Apply compression
  |> compress()
  # Add subtle reverb for radio feel
  |> add(normalize=false, [source, reverb(delay=0.1, feedback=0.2)])
  # Convert to MP3 for streaming
  |> encode(%mp3(bitrate=128, samplerate=44100))
end

# Stream to Icecast for each DJ
output.icecast(
  %mp3(bitrate=128, samplerate=44100),
  host="localhost",
  port=8000,
  password="sevenmonkeys2024",
  mount="/dj1",
  name="Seven Monkeys DJ 1",
  description="Live DJ stream from Seven Monkeys The Bar",
  genre="Electronic",
  url="http://localhost:3000/music",
  process_audio(dj1_source)
)

output.icecast(
  %mp3(bitrate=128, samplerate=44100),
  host="localhost",
  port=8000,
  password="sevenmonkeys2024",
  mount="/dj2",
  name="Seven Monkeys DJ 2", 
  description="Live DJ stream from Seven Monkeys The Bar",
  genre="House",
  url="http://localhost:3000/music",
  process_audio(dj2_source)
)

output.icecast(
  %mp3(bitrate=128, samplerate=44100),
  host="localhost",
  port=8000,
  password="sevenmonkeys2024",
  mount="/dj3",
  name="Seven Monkeys DJ 3",
  description="Live DJ stream from Seven Monkeys The Bar", 
  genre="Deep House",
  url="http://localhost:3000/music",
  process_audio(dj3_source)
)

output.icecast(
  %mp3(bitrate=128, samplerate=44100),
  host="localhost",
  port=8000,
  password="sevenmonkeys2024",
  mount="/dj4",
  name="Seven Monkeys DJ 4",
  description="Live DJ stream from Seven Monkeys The Bar",
  genre="Techno", 
  url="http://localhost:3000/music",
  process_audio(dj4_source)
)

# Log startup
log("Seven Monkeys DJ Platform Liquidsoap started successfully!")
