
export class WindowInfo {
  isMobile: boolean = false;
  isTablet: boolean = false;
  isSmallScreen: boolean = false;
  isMediumScreen: boolean = false;
  isLargeScreen: boolean = false;
  isVeryLargeScreen: boolean = false;
  verticalOffset: number = 0;
  clientWidth: number = 0;
  clientHeight: number = 0;
  scrollHeight: number = 0;
}


export interface Position {
  start: number;
  end: number;
}

export interface Tab {
  code: string;
  label: string;
}

export declare enum DIALOG_WIDTH {
  MINIMUM = "400px",
  SMALL = "670px",
  MEDIUM = "940px",
  LARGE = "1200px",
  VERYLARGE = "90vw"
}

export declare enum RESPONSIVE_WIDTH {
  MINIMUM = 500,
  SMALL = 750,
  MEDIUM = 1000,
  LARGE = 1440
}
