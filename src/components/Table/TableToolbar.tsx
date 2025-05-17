import { ChangeEvent, useMemo, useState } from 'react';
import { Filter } from '../../types';
import styled from 'styled-components';
import { Search, ListFilter } from 'lucide-react';
import { useSearchParams } from 'react-router';

interface TableToolbarProps {
	isShowToolBar: boolean;
	searchOptions: string[];
	filterOptions: {
		label: string;
		options: string[];
	}[];
	onApplySearch: (searchBy: string, searchValue: string) => void;
	onApplyFilter: (filters: Filter) => void;
	onClearFilter: () => void;
}

const TableToolbar = ({ isShowToolBar, searchOptions, filterOptions, onApplySearch, onApplyFilter, onClearFilter }: TableToolbarProps) => {
	const [filters, setFilters] = useState<Filter>({});
	const [isShowFilter, setIsShowFilter] = useState(false);
	const [searchBy, setSearchBy] = useState<string>('');
	const [searchValue, setSearchValue] = useState<string>('');

	const [searchParams] = useSearchParams();

	const countFilter = useMemo(() => {
		const filterLabels = filterOptions.map((option) => option.label);
		return filterLabels.filter((label) => searchParams.get(label)).length;
	}, [searchParams]);

	const handleToggleFilter = () => {
		setIsShowFilter((prev) => !prev);
	};

	const handleSelectFilter = (label: string, value: string) => {
		setFilters((prev) => ({ ...prev, [label]: value }));
	};

	const handleApplyFilter = () => {
		onApplyFilter(filters);
		setIsShowFilter(false);
	};

	const handleSelectSearch = (e: ChangeEvent<HTMLSelectElement>) => {
		setSearchBy(e.target.value);
	};

	const handleApplySearch = () => {
		onApplySearch(searchBy, searchValue);
	};

	const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
		if (e.key === 'Enter') {
			handleApplySearch();
		}
	};

	const handleChangeSearchValue = (e: ChangeEvent<HTMLInputElement>) => {
		setSearchValue(e.target.value);
	};

	const handleClear = () => {
		setSearchValue('');
		onClearFilter();
		setIsShowFilter(false);
	};

	if (searchOptions.length === 0 || !isShowToolBar) return null;

	return (
		<>
			<TableToolbarContainer>
				<SearchContainer>
					<SearchBySelect onChange={handleSelectSearch}>
						<option value="" disabled selected>
							Search by
						</option>
						{searchOptions?.length &&
							searchOptions.map((option) => (
								<option key={option} value={option}>
									{option}
								</option>
							))}
					</SearchBySelect>

					<SearchInput
						type="text"
						placeholder="Search"
						value={searchValue}
						onChange={handleChangeSearchValue}
						onKeyDown={handleKeyDown}
						disabled={!searchBy}
					/>
					<SearchIcon onClick={handleApplySearch} />
				</SearchContainer>

				<FilterButton onClick={handleToggleFilter}>
					<ListFilter size={16} />
					Filter
					{countFilter > 0 && <FilterCount>{countFilter}</FilterCount>}
				</FilterButton>

				{isShowFilter ? (
					<ApplyFilterButton onClick={handleApplyFilter}>Apply</ApplyFilterButton>
				) : (
					<ClearButton onClick={handleClear}>Clear</ClearButton>
				)}
			</TableToolbarContainer>

			<FilterContainer isShowFilter={isShowFilter}>
				{filterOptions?.map((option) => {
					return (
						<FilterItem key={option.label}>
							<FilterLabel>{`${option.label}:`}</FilterLabel>
							<FilterSelectContainer>
								<FilterSelect
									onChange={(e) => handleSelectFilter(option.label, e.target.value)}
									value={filters[option.label]}
								>
									<option value="">All</option>
									{option.options.map((op) => (
										<option key={op} value={op} selected={filters[option.label] === op}>
											{op}
										</option>
									))}
								</FilterSelect>
							</FilterSelectContainer>
						</FilterItem>
					);
				})}
			</FilterContainer>
		</>
	);
};

export default TableToolbar;

const TableToolbarContainer = styled.div`
	display: flex;
	justify-content: flex-end;
	align-items: center;
	gap: 12px;
`;

const SearchContainer = styled.div`
	border: 2px solid ${({ theme }) => theme.colors.secondary};
	border-radius: 10px;
	overflow: hidden;
	display: flex;
	align-items: stretch;
	height: 40px;

	&:focus-within {
		border: 2px solid ${({ theme }) => theme.colors.primary};
	}
`;

const SearchBySelect = styled.select`
	border: 0px solid transparent;
	padding: 0 0 0 4px;
	font-size: 14px;
	background-color: ${({ theme }) => theme.colors.secondary};
	color: ${({ theme }) => theme.colors.white};
	text-align: center;
	border-right: 8px solid transparent;

	&:focus,
	&:active,
	&:hover {
		outline: none;
	}
`;

const SearchInput = styled.input`
	width: 200px;
	font-size: 16px;
	border: 0px solid transparent;
	padding: 0px 10px;
	font-size: 14px;
	color: ${({ theme }) => theme.colors.secondary};

	&:focus,
	&:active,
	&:hover {
		outline: none;
	}

	&::placeholder {
		color: ${({ theme }) => theme.colors.secondary};
	}

	&:disabled {
		opacity: 0.3;
	}
`;

const SearchIcon = styled(Search)`
	width: 24px;
	height: 24px;
	color: ${({ theme }) => theme.colors.tertiary};
	justify-content: center;
	align-items: center;
	padding: 0 10px 0 0;
	cursor: pointer;
	margin: auto;

	&:hover {
		color: ${({ theme }) => theme.colors.primary};
	}
`;

const FilterButton = styled.button`
	background-color: ${({ theme }) => theme.colors.secondary};
	color: ${({ theme }) => theme.colors.white};
	height: 40px;
	border-radius: 10px;
	padding: 0 10px;
	min-width: 70px;
	cursor: pointer;
	display: flex;
	align-items: center;
	justify-content: center;
	gap: 5px;
	position: relative;

	&:hover {
		background-color: ${({ theme }) => theme.colors.primary};
		color: ${({ theme }) => theme.colors.white};
	}
`;

const ClearButton = styled.button`
	background-color: ${({ theme }) => theme.colors.white};
	color: ${({ theme }) => theme.colors.secondary};
	height: 40px;
	min-width: 70px;
	border-radius: 10px;
	padding: 0 10px;
	border: 2px solid ${({ theme }) => theme.colors.secondary};
	color: ${({ theme }) => theme.colors.secondary};
	cursor: pointer;

	&:hover {
		border: 2px solid ${({ theme }) => theme.colors.tertiary};
		color: ${({ theme }) => theme.colors.tertiary};
	}
`;

const FilterCount = styled.span`
	font-size: 13px;
	color: ${({ theme }) => theme.colors.white};
	width: 20px;
	height: 20px;
	border-radius: 50%;
	background-color: ${({ theme }) => theme.colors.tertiary};
	display: flex;
	align-items: center;
	justify-content: center;
	position: absolute;
	right: -10px;
	top: -10px;
`;

const FilterContainer = styled.div<{ isShowFilter: boolean }>`
	display: ${({ isShowFilter }) => (isShowFilter ? 'flex' : 'none')};
	gap: 12px;
	flex-direction: row;
	justify-content: flex-end;
`;

const ApplyFilterButton = styled(FilterButton)`
	background-color: ${({ theme }) => theme.colors.tertiary};
	color: ${({ theme }) => theme.colors.white};
	border: 2px solid ${({ theme }) => theme.colors.light};

	&:hover {
		background-color: ${({ theme }) => theme.colors.tertiary};
		color: ${({ theme }) => theme.colors.white};
		opacity: 0.8;
	}
`;

const FilterItem = styled.div`
	display: flex;
	align-items: center;
	gap: 8px;
`;

const FilterLabel = styled.label`
	font-size: 16px;
	color: ${({ theme }) => theme.colors.primary};
`;

const FilterSelectContainer = styled.div`
	display: flex;
	align-items: center;
	border: 2px solid ${({ theme }) => theme.colors.secondary};
	border-radius: 10px;
	overflow: hidden;

	&:hover {
		border: 2px solid ${({ theme }) => theme.colors.primary};
	}
`;

const FilterSelect = styled.select`
	border: 0px solid transparent;
	padding: 0 0 0 4px;
	font-size: 14px;
	background-color: ${({ theme }) => theme.colors.white};
	color: ${({ theme }) => theme.colors.secondary};
	border-right: 10px solid transparent;
	height: 40px;

	&:focus,
	&:active,
	&:hover {
		outline: none;
	}
`;
