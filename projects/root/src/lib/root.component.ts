import { Component, OnInit } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';

@Component({
  selector: 'eth-root',
  template: '<router-outlet></router-outlet>'
})
export class RootComponent implements OnInit {
  constructor(
    private meta: Meta,
    private title: Title
  ) {}

  ngOnInit() {
    // 기본 메타 태그 설정
    this.title.setTitle('Guri Token - First memecoin to make DAO a reality');

    // 필수 메타 태그
    this.meta.addTags([
      { charset: 'UTF-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { name: 'description', content: 'Guri Token is the first memecoin to make DAO a reality, building a transparent and reliable ecosystem through decentralized governance.' },

      // 검색엔진 최적화
      { name: 'robots', content: 'index, follow' },
      { name: 'keywords', content: 'Guri Token, DAO, blockchain, cryptocurrency, memecoin, decentralized' },
      { name: 'author', content: 'Guri Token Team' },

      // Open Graph 태그
      { property: 'og:title', content: 'Guri Token - First memecoin to make DAO a reality' },
      { property: 'og:description', content: 'Building a transparent and reliable ecosystem through decentralized governance' },
      { property: 'og:image', content: '/assets/images/guri_logo.png' },
      { property: 'og:url', content: 'https://guritoken.com' },
      { property: 'og:type', content: 'website' },

      // Twitter 카드
      { name: 'twitter:card', content: 'summary_large_image' },
      { name: 'twitter:site', content: '@Albam_The_Guri' },
      { name: 'twitter:title', content: 'Guri Token - First memecoin to make DAO a reality' },
      { name: 'twitter:description', content: 'Building a transparent and reliable ecosystem through decentralized governance' },
      { name: 'twitter:image', content: '/assets/images/guri_logo.png' }
    ]);
  }
}
