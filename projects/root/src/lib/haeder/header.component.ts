import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild, ViewEncapsulation } from '@angular/core';
import { WindowInfo, WindowService } from '../../../../common/src/public-api';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'eth-header',
  templateUrl: './header.component.html',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeaderComponent implements OnInit {
  @Input() windowInfo = new WindowInfo();

  @ViewChild('header') headerEl: ElementRef | undefined;

  @Output() moveMenu = new EventEmitter<number>();
  private stop$ = new Subject<void>();

  constructor(
    private cdr: ChangeDetectorRef,
    private windowService: WindowService,
  ) { }


  ngOnInit(): void {
    this.windowService.getWindowInfo$().pipe(takeUntil(this.stop$)).subscribe((info: WindowInfo) => {
      this.windowInfo = info;
      this.cdr.detectChanges();
    });
  }

  moveMenuEvent(index: number) {
    this.moveMenu.emit(index);
  }
}
