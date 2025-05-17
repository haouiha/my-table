export interface Character {
	id: number;
	name: string;
	status: string;
	species: string;
	type: string;
	gender: string;
	origin: {
		name: string;
		url: string;
	};
	location: {
		name: string;
		url: string;
	};
	image: string;
	episode: string[];
	url: string;
	created: string;
}

export interface CharacterResponse {
	results: Character[];
	info: {
		count: number;
		pages: number;
	};
}

export type Filter = Record<string, string>;
export type Sort = { column: string; order: 'asc' | 'desc' };
