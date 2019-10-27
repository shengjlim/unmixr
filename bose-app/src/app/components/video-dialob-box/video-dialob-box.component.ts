import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { Howl, Howler } from 'howler';


const audio = new Audio();

@Component({
  selector: 'app-video-dialob-box',
  templateUrl: './video-dialob-box.component.html',
  styleUrls: ['./video-dialob-box.component.css']
})
export class VideoDialobBoxComponent implements OnInit {
  url: SafeResourceUrl;
  public YT: any;
  public video: any;
  public player: any;
  public reframed: Boolean = false;

  constructor(
    private apiService: ApiService,
    private sanitizer: DomSanitizer
  ) { }

  isRestricted = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

  init() {
    // Return if Player is already created
    if (window['YT']) {
      this.startVideo();
      return;
    }

    var tag = document.createElement('script');
    tag.src = 'https://www.youtube.com/iframe_api';
    var firstScriptTag = document.getElementsByTagName('script')[0];
    firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

    /* 3. startVideo() will create an <iframe> (and YouTube player) after the API code downloads. */
    window['onYouTubeIframeAPIReady'] = () => this.startVideo();
  }

  ngOnInit() {
    this.video = this.apiService.linkUrl;
    this.init();
    (<HTMLAnchorElement>document.getElementById('downloadHere')).href = this.apiService.audioUrl;
    audio.src = this.apiService.audioUrl;
  }

  startVideo() {
    this.reframed = true;
    this.player = new window['YT'].Player('player', {
      videoId: this.video,
      playerVars: {
        modestbranding: 1,
        controls: 1,
        disablekb: 1,
        rel: 0,
        fs: 0,
        playsinline: 1,
      },
      events: {
        'onStateChange': this.onPlayerStateChange.bind(this),
        'onError': this.onPlayerError.bind(this),
        'onReady': this.onPlayerReady.bind(this),
      }
    });
  }

  onPlayerReady(event) {
    if (this.isRestricted) {
      event.target.playVideo();
    }
    event.target.mute();
  }

  onPlayerStateChange(event) {
    console.log(event)
    switch (event.data) {
      case window['YT'].PlayerState.PLAYING:
        if (this.cleanTime() == 0) {
          console.log('started ' + this.cleanTime());
        } else {
          console.log('playing ' + this.cleanTime())
        };
        audio.play();
        break;
      case window['YT'].PlayerState.PAUSED:
        if (this.player.getDuration() - this.player.getCurrentTime() != 0) {
          console.log('paused' + ' @ ' + this.cleanTime());
        };
        audio.pause();
        break;
      case window['YT'].PlayerState.ENDED:
        console.log('ended ');
        break;
    };
  };

  cleanTime() {
    return Math.round(this.player.getCurrentTime())
  };

  onPlayerError(event) {
    switch (event.data) {
      case 2:
        console.log('' + this.video)
        break;
      case 100:
        break;
      case 101 || 150:
        break;
    };
  };

}
