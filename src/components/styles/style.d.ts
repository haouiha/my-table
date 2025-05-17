import { Theme } from './theme';

declare module 'styled-components' {
	export interface DefaultTheme extends Theme {
		colors: {
			primary: string;
			secondary: string;
			tertiary: string;
			white: string;
			light: string;
		};
	}
}
