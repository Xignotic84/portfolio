import {NextResponse} from 'next/server';

const clientId = process.env.SPOTIFY_CLIENT_ID
const clientSecret = process.env.SPOTIFY_CLIENT_SECRET
let accessToken = '';
const authToken = Buffer.from(`${clientId}:${clientSecret}`,).toString("base64")

export async function fetchSpotifyArtistsAndTracks() {
  const params = new URLSearchParams({
    grant_type: "refresh_token",
    scope: "user-top-read",
    redirect_uri: "https://spotify-refresh-token-generator.netlify.app",
    refresh_token: process.env.SPOTIFY_REFRESH_TOKEN,
  })

  const res = await fetch("https://accounts.spotify.com/api/token", {
    method: "POST",
    headers: {
      "content-type": "application/x-www-form-urlencoded",
      authorization: `Basic ${authToken}`,
    },
    body: params.toString(),
  });

  const body = await res.json();

  if (!res.ok || !res.body) {
    console.log('Something went wrong fetching from spotify', res.status)
    return
  }

  const token = body.access_token;
  accessToken = token

  const tracks = await fetchWebApi('v1/me/top/tracks?time_range=short_term&limit=10', 'GET')
  const artists = await fetchWebApi('v1/me/top/artists?time_range=short_term&limit=10', 'GET')

  return {tracks, artists}
}

async function fetchWebApi(endpoint, method, body) {
  const res = await fetch(`https://api.spotify.com/${endpoint}`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
    method,
    body: JSON.stringify(body)
  })
  if (res.ok) {
    return res.json()
  } else {
    console.log(res.status, res)
  }
}

export async function GET() {
  const tracks = await fetchSpotifyArtistsAndTracks()

  return NextResponse.json(tracks);
}
