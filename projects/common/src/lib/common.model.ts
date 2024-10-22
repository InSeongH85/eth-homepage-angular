
export class WindowInfo {
  isMobile: boolean = false;
  isTablet: boolean = false;
  isSmallScreen: boolean = false;
  isMediumScreen: boolean = false;
  isLargeScreen: boolean = false;
  isVeryLargeScreen: boolean = false;
  isSolarsBrowser: boolean = false;
  verticalOffset: number = 0;
  clientWidth: number = 0;
  clientHeight: number = 0;
  scrollHeight: number = 0;
}


export interface Position {
  start: number;
  end: number;
}
