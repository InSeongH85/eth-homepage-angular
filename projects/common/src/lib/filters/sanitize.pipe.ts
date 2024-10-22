import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

/**
 * SanitizePipe
 * html 태그 전체 표출
 * 신뢰할 수 있는 html일 경우에 사용
 */
@Pipe({
  name: 'sanitize'
})
export class SanitizePipe implements PipeTransform {
  constructor(private domSanitizer: DomSanitizer) { }

  private unescape(html: string, tabToSpace: boolean): string {
    const sanitizedString = html.replace(/&lt;/g, '<').replace(/&gt;/g, '>');
    if (tabToSpace)
      return sanitizedString.replace(/\t/gi, '&nbsp;&nbsp;&nbsp;&nbsp;');
    return sanitizedString;
  }

  transform(html: string, option: 'none' | 'tabToSpace' = 'none'): SafeHtml {
    if (!html) return '';
    html = this.unescape(html, option === 'tabToSpace');
    return this.domSanitizer.bypassSecurityTrustHtml(html);
  }
}
