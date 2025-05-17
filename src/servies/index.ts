import axios from 'axios';
import { CharacterResponse } from '../types';

const baseUrl = `https://rickandmortyapi.com/api/character`;

export const getCharacter = async (searchParams: Record<string, string>) => {
	try {
		const response = await axios.get<CharacterResponse>(baseUrl, {
			params: searchParams,
		});

		return response.data;
	} catch (e: any) {
		throw new Error('getCharacter : ' + e.message);
	}
};
