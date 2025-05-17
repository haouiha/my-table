import 'styled-components';

const appTheme = {
	colors: {
		primary: '#183b4e',
		secondary: '#27548A',
		tertiary: '#dda853',
		light: '#F3F3E0',
		white: '#ffffff',
	},
} as const;

export type Theme = typeof appTheme;

export default appTheme;
