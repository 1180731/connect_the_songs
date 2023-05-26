import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Container, InputGroup, FormControl, Button, Row, Cards, Form, Card} from 'react-bootstrap';
import {useState, useEffect} from 'react';

const SPOTIFY_CLIENT_ID = "1f5640f9b7444ac9bfc621f6b1e01d2a";
const SPOTIFY_CLIENT_SECRET = "77e180d69dac4948bc9cca57685e6b87";
const SPOTIFY_TOKEN_URL = "https://accounts.spotify.com/api/token";
const SPOTIFY_BASE_URL = "https://api.spotify.com/v1/";
const SPOTIFY_SEARCH_URL = SPOTIFY_BASE_URL+"search?q=";
const SPOTIFY_TYPE_SONG = "&type=track";

function App() {

  const [spotifyToken, setSpotifyToken] = useState("");
  const [songInput, setSong] = useState("");
  const [songName, setSongName] = useState("Start Song");
  const [songImg, setSongImg] = useState("");

  //Run once when App is started
  useEffect(() =>{
    //Get Spotify token
    var authentication = {
      method: "Post",
      headers: {
        "Content-Type":"application/x-www-form-urlencoded"
      },
      body: "grant_type=client_credentials"+
              "&client_id="+SPOTIFY_CLIENT_ID +
              "&client_secret="+SPOTIFY_CLIENT_SECRET

    }
    fetch(SPOTIFY_TOKEN_URL, authentication)
      .then(result => result.json())
      .then(data => setSpotifyToken(data.access_token));
    
    //Get Top 50 tracks on spotify

  })

  //Search Song
  async function getSongByName(name){
    console.log("song: "+name);

    var searchParams = {
      method: "Get",
      headers: {
        "Content-Type":"application/json",
        "Authorization": "Bearer " + spotifyToken
      }
    }
    
    var resultId = await fetch(SPOTIFY_SEARCH_URL+songInput+SPOTIFY_TYPE_SONG, searchParams)
    .then(response => response.json())
      .then(data => {
        console.log(data)
        var track = data.tracks.items[0]
        console.log(track)
        setSongName(track.name)
        setSongImg(track.album.images[0].url)

      });
  }

  //Get random song from top 50 

  return (
    <div className="App">
      <Container>
        <InputGroup className='mb-3' size="large">
          <FormControl
            placeholder = "Search for a song!"
            type="input"
            onKeyPress={ event => {
              if(event.key === "Enter"){
                getSongByName(songInput)
              }
            }
            }
            onChange={event=> setSong(event.target.value)}
          />
          <Button onClick={()=> {getSongByName(songInput)}}>
            Search
          </Button>
          <Button onClick={()=> {getSongByName(songInput)}}>
            Random
          </Button>
        </InputGroup>
      </Container>
      <Container>
        <Card>
          <Card.Img src={songImg}/>
          <Card.Body>
            <Card.Title>{songName}</Card.Title>
          </Card.Body>
        </Card>
      </Container>
    </div>
  );
}

export default App;
