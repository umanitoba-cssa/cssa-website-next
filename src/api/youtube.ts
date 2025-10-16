export interface IVideoData {
    title: string
    description: string
    thumbnail: string
    videoId: string
    date: string
    href: string
} 

export async function GetPlaylistData(playlist: string): Promise<IVideoData[]> {
    const apiKey = process.env.YOUTUBE_API_KEY

    const url = `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&playlistId=${playlist}&key=${apiKey}&maxResults=50`
    return fetch(url)
        .then(response => response.json())
        .then(data => {
            return data?.items?.map((item: GoogleApiYouTubePlaylistItemResource) => {
                return {
                    title: item.snippet.title,
                    description: item.snippet.description,
                    thumbnail: item.snippet.thumbnails.maxres?.url ?? item.snippet.thumbnails.high.url,
                    videoId: item.snippet.resourceId.videoId,
                    date: item.snippet.publishedAt,
                    href: `https://www.youtube.com/watch?v=${item.snippet.resourceId.videoId}`
                }
            })
        })
}
