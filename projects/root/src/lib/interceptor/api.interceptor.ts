import { DOCUMENT } from '@angular/common';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { inject, Inject, Injectable, InjectionToken } from '@angular/core';
import { filter, fromEvent, map, merge, Observable, shareReplay } from 'rxjs';

// input에서 key enter를 눌렀을 때 그 Element를 return한다.
// (for 현재까지는 대출반납화면에서 등록번호나 딸림등록번호를 스캔했을 때 오류메세지를 확인하고 원래 포커스를 찾아주기 위함, 물론 다른 메뉴에서 비슷한 경우에도 적용가능)
const ACTIVE_ELEMENT = new InjectionToken<Observable<any>>('ACTIVE_ELEMENT', {
  providedIn: 'root',
  factory() {
    const doc = inject(DOCUMENT);
    return merge(fromEvent(doc, 'keydown').pipe(filter((e: any) => e.key === 'Enter'))).pipe(
      map((e) => e.target),
      shareReplay({ refCount: true, bufferSize: 1 })
    );
  },
});

/**
 * HTTP 호출시 intercept하는 서비스
 */
@Injectable()
export class ApiInterceptor implements HttpInterceptor {

  private activeElement: any;

  constructor(
    @Inject(ACTIVE_ELEMENT) private readonly activeElement$: Observable<any>,
  ) {

  }
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    throw new Error('Method not implemented.');
  }

}
