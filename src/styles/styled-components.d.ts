import "styled-components/Native";

declare module "styled-components" {
  export interface DefaultTheme {
    mainBgColor: string;
    textColor: string;
    accentColor: string;
  }
}
