import { useEffect, useState } from 'react';
import { Character } from '../types';
import { getCharacter } from '../servies';
import { useSearchParams } from 'react-router';

const useGetCharacter = (queryParams: Record<string, string>) => {
	const [searchParams, setSearchParams] = useSearchParams();
	const [data, setData] = useState<Character[]>([]);
	const [loading, setLoading] = useState(true);
	const [totalPages, setTotalPages] = useState(1);
	const [totalRows, setTotalRows] = useState(0);

	const filteredParams = Object.fromEntries(Object.entries(queryParams).filter(([_, value]) => value !== ''));

	const fetchData = async () => {
		try {
			const response = await getCharacter(filteredParams);

			// sort data client side due to api not support sort
			const sortBy = queryParams['sortBy'] as keyof Character;
			const order = queryParams['order'];

			if (sortBy && order) {
				response.results.sort((a, b) => {
					if (typeof a[sortBy] === 'number') {
						const aVal = a[sortBy] as number;
						const bVal = b[sortBy] as number;
						return (order === 'asc' ? 1 : -1) * (aVal - bVal);
					}

					const aStr = String(a[sortBy]);
					const bStr = String(b[sortBy]);
					return (order === 'asc' ? 1 : -1) * aStr.localeCompare(bStr);
				});
			}

			setData(response.results);
			setTotalRows(response.info.count);
			setTotalPages(response.info.pages);
		} catch (e: any) {
			setData([]);
			setTotalRows(0);
			setTotalPages(1);
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => {
		fetchData();
	}, [searchParams]);

	useEffect(() => {
		setSearchParams(filteredParams);
	}, [queryParams, searchParams]);

	return { data, loading, totalPages, totalRows };
};

export default useGetCharacter;
