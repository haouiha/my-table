import { Sort, Filter } from '../types';
import TableToolbar from './Table/TableToolbar';
import TableHead from './Table/TableHead';
import TableBody from './Table/TableBody';
import TablePagination from './Table/TablePagination';
import styled from 'styled-components';
import { FolderX } from 'lucide-react';

interface AppTableProps<T> {
	data: T[];
	columns: string[];
	nullValue?: string;
	isShowToolBar?: boolean;
	isShowIndex?: boolean;
	isLoading?: boolean;
	searchOptions?: string[];
	filterOptions?: {
		label: string;
		options: string[];
	}[];
	sortOptions?: string[];
	currentPage: number;
	totalPages: number;
	totalRows: number;
	onApplyFilter: (filter: Filter) => void;
	onClearFilter: () => void;
	onApplySort: (sort: Sort | null) => void;
	onClickRow: (row: T) => void;
	onChangePage: (page: number) => void;
	onSearch: (search: Filter) => void;
}

const AppTable = <T extends Record<string, any>>({
	data,
	columns,
	nullValue = '-',
	isShowToolBar = true,
	isShowIndex = false,
	isLoading = false,
	searchOptions = [],
	filterOptions = [],
	sortOptions = [],
	currentPage = 1,
	totalPages = 1,
	totalRows,
	onChangePage,
	onApplyFilter,
	onClearFilter,
	onApplySort,
	onClickRow,
	onSearch,
}: AppTableProps<T>) => {
	const handleApplySearch = (searchBy: string, searchValue: string) => {
		onSearch({ [searchBy]: searchValue });
	};

	const handleApplyFilter = (filters: Filter) => {
		onApplyFilter(filters);
	};

	const handleClearFilter = () => {
		onClearFilter();
	};

	const handleSort = (sort: Sort) => {
		onApplySort(sort);
	};

	return (
		<TableContainer>
			<TableToolbar
				isShowToolBar={isShowToolBar}
				searchOptions={searchOptions}
				onApplySearch={handleApplySearch}
				filterOptions={filterOptions}
				onApplyFilter={handleApplyFilter}
				onClearFilter={handleClearFilter}
			/>

			{isLoading ? (
				<div>Loading data...</div>
			) : (
				<>
					{data.length === 0 ? (
						<NoData>
							<NoDataIcon size={100} strokeWidth={1.5} />
							<NoDataText>No data</NoDataText>
						</NoData>
					) : (
						<Table>
							<TableHead isShowIndex={isShowIndex} columns={columns} sortOptions={sortOptions} onSortClick={handleSort} />
							<TableBody
								isShowIndex={isShowIndex}
								columns={columns}
								data={data}
								nullValue={nullValue}
								onClickRow={onClickRow}
							/>
						</Table>
					)}
				</>
			)}

			{data.length > 0 && (
				<TablePagination currentPage={currentPage} totalPages={totalPages} totalRows={totalRows} onChangePage={onChangePage} />
			)}
		</TableContainer>
	);
};

export default AppTable;

const TableContainer = styled.div`
	display: flex;
	flex-direction: column;
	gap: 12px;
	width: 100%;
	o
`;

const Table = styled.table`
	margin-top: 12px;
	width: 100%;
	border-collapse: collapse;
	border-radius: 12px;
	border-style: hidden;
	box-shadow: 0 0 0 2px ${({ theme }) => theme.colors.primary};
	overflow: hidden;
`;

const NoData = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	width: 100%;
	padding: 40px 0;
`;

const NoDataIcon = styled(FolderX)`
	width: 100px;
	height: 100px;
	color: ${({ theme }) => theme.colors.primary};
`;

const NoDataText = styled.div`
	font-size: 24px;
	font-weight: 600;
	color: ${({ theme }) => theme.colors.primary};
`;
