import { useState } from 'react';
import AppTable from './components/AppTable';
import useGetCharacter from './hooks/useGetCharacter';
import { Filter, Sort, Character } from './types';

const App = () => {
	const [queryParams, setQueryParams] = useState<Record<string, string>>({ page: '1' });

	const { data, loading, totalPages, totalRows } = useGetCharacter(queryParams);

	const handleApplyFilter = (filters: Filter) => {
		setQueryParams((prev) => ({ ...prev, ...filters }));
	};

	const handleSearch = (search: Filter) => {
		setQueryParams((prev) => ({ ...prev, ...search }));
	};

	const handleClearFilter = () => {
		setQueryParams({ page: '1' });
	};

	const handleApplySort = (sort: Sort | null) => {
		setQueryParams((prev) => ({ ...prev, sortBy: sort?.column || '', order: sort?.order || '' }));
	};

	const handleClickRow = (row: Character) => {
		alert(`You clicked on ${row.name}`);
	};

	const handleChangePage = (page: number) => {
		setQueryParams((prev) => ({ ...prev, page: page.toString() }));
	};

	return (
		<AppTable<Character>
			data={data}
			columns={['id', 'name', 'status', 'species', 'gender', 'type']}
			nullValue="-"
			isShowToolBar
			isShowIndex
			isLoading={loading}
			searchOptions={['name', 'type']}
			filterOptions={[
				{
					label: 'status',
					options: ['Alive', 'Dead', 'unknown'],
				},
				{
					label: 'species',
					options: ['Human', 'Alien'],
				},
				{
					label: 'gender',
					options: ['Male', 'Female', 'unknown'],
				},
			]}
			sortOptions={['id', 'name']}
			currentPage={Number(queryParams.page)}
			totalPages={totalPages}
			totalRows={totalRows}
			onChangePage={handleChangePage}
			onApplyFilter={handleApplyFilter}
			onApplySort={handleApplySort}
			onClickRow={handleClickRow}
			onSearch={handleSearch}
			onClearFilter={handleClearFilter}
		/>
	);
};

export default App;
