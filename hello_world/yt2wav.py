import youtube_dl


def getWav(url, name):
    ydl_opts = {
        'format': 'bestaudio/best',
        'postprocessors': [{
            'key': 'FFmpegExtractAudio',
            'preferredcodec': 'wav',
            'preferredquality': '44100',
        }],
        'no-check-certificate': True,
        'outtmpl': f"tmp/{name}.%(ext)s"
    }

    with youtube_dl.YoutubeDL(ydl_opts) as ydl:
        ydl.download([url])
        print('done')
