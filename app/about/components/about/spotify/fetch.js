import querystring from "querystring";

const TOKEN_ENDPOINT = `https://accounts.spotify.com/api/token`;
const NOW_PLAYING_ENDPOINT = `https://api.spotify.com/v1/me/player/currently-playing`;
const client_id = process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_ID;
const client_secret = process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_SECRET;
const refresh_token = process.env.NEXT_PUBLIC_SPOTIFY_REFRESH_TOKEN;

export default async function getNowPlayingItem() {
	// If credentials are not present, return immediately without network calls
	if (!client_id || !client_secret || !refresh_token) {
		return false;
	}

	try {
		const basic = Buffer.from(`${client_id}:${client_secret}`).toString("base64");
		const controller = new AbortController();
		const timeoutId = setTimeout(() => controller.abort(), 1500);

		const response = await fetch(TOKEN_ENDPOINT, {
			method: "POST",
			headers: {
				Authorization: `Basic ${basic}`,
				"Content-Type": "application/x-www-form-urlencoded",
			},
			body: querystring.stringify({
				grant_type: "refresh_token",
				refresh_token,
			}),
			signal: controller.signal,
		});

		if (!response.ok) {
			clearTimeout(timeoutId);
			return false;
		}

		const { access_token } = await response.json();
		if (!access_token) {
			clearTimeout(timeoutId);
			return false;
		}

		const songResponse = await fetch(NOW_PLAYING_ENDPOINT, {
			headers: {
				Authorization: `Bearer ${access_token}`,
			},
			signal: controller.signal,
		});

		clearTimeout(timeoutId);

		if (songResponse.status === 204 || songResponse.status > 400) {
			return false;
		}

		const song = await songResponse.json();
		if (!song || !song.item) return false;

		return {
			albumImageUrl: song.item?.album?.images?.[0]?.url || "",
			artist: song.item?.artists?.map((_artist) => _artist.name).join(", ") || "",
			isPlaying: Boolean(song.is_playing),
			songUrl: song.item?.external_urls?.spotify || "",
			title: song.item?.name || "",
		};
	} catch {
		return false;
	}
}