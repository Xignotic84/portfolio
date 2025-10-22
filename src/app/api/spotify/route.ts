import {NextResponse} from 'next/server';

const clientId = process.env.SPOTIFY_CLIENT_ID
const clientSecret = process.env.SPOTIFY_CLIENT_SECRET
let accessToken = '';
const authToken = Buffer.from(`${clientId}:${clientSecret}`,).toString("base64")

export async function fetchSpotifyArtistsAndTracks() {
  if (!process.env.SPOTIFY_REFRESH_TOKEN) throw new Error('SPOTIFY_REFRESH_TOKEN is undefined, please ensure to provide it')

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

  if (!res.ok) {
    console.error(body)
    return false
  }

  accessToken = body.access_token

  const tracks = await fetchWebApi('v1/me/top/tracks?time_range=short_term&limit=15', 'GET')
  const artists = await fetchWebApi('v1/me/top/artists?time_range=short_term&limit=15', 'GET')

  return {tracks, artists}
}

async function fetchWebApi(endpoint: string, method: string, body?: any) {
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

  if (!tracks) return NextResponse.json({
    code: 404,
    message: 'No tracks found'
  })

  return NextResponse.json(tracks);
}
