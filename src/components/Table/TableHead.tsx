import { useState } from 'react';
import { Sort } from '../../types';
import styled from 'styled-components';
import { ArrowUpDown, ArrowDownNarrowWide, ArrowUpWideNarrow } from 'lucide-react';

interface TableHeadProps {
	isShowIndex: boolean;
	columns: string[];
	sortOptions: string[];
	onSortClick: (sort: Sort) => void;
}

const TableHead = ({ isShowIndex, columns, sortOptions, onSortClick }: TableHeadProps) => {
	const [sort, setSort] = useState<Sort | null>(null);

	const handleSortClick = (column: string) => {
		setSort((prev) => {
			let newSort: Sort;

			if (prev?.column === column) {
				newSort = { column: column, order: prev.order === 'asc' ? 'desc' : 'asc' };
			} else {
				newSort = { column: column, order: 'desc' };
			}

			onSortClick(newSort);

			return newSort;
		});
	};

	return (
		<TableHeadContainer>
			<TableHeadRow>
				{isShowIndex && <TableHeadCell>Index</TableHeadCell>}
				{columns.map((column) => {
					return (
						<TableHeadCell key={column}>
							<TableHeadCellWrapper>
								{column}
								{sortOptions?.includes(column) && (
									<SortButton onClick={() => handleSortClick(column)}>
										{column && sort?.column === column ? (
											sort.order === 'asc' ? (
												<ArrowDownNarrowWide size={18} />
											) : (
												<ArrowUpWideNarrow size={18} />
											)
										) : (
											<ArrowUpDown size={18} />
										)}
									</SortButton>
								)}
							</TableHeadCellWrapper>
						</TableHeadCell>
					);
				})}
			</TableHeadRow>
		</TableHeadContainer>
	);
};

export default TableHead;

const TableHeadContainer = styled.thead``;

const TableHeadRow = styled.tr``;

const TableHeadCell = styled.th`
	padding: 10px;
	border: 2px solid ${({ theme }) => theme.colors.primary};
	background-color: ${({ theme }) => theme.colors.secondary};
	color: ${({ theme }) => theme.colors.white};
	font-weight: 400;
`;

const TableHeadCellWrapper = styled.div`
	display: flex;
	flex-direction: row;
	align-items: center;
	justify-content: center;
	width: 100%;
	flex: 1;
	gap: 12px;
`;

const SortButton = styled.div`
	display: flex;
	flex-direction: row;
	align-items: center;
	justify-content: center;
	align-self: flex-end;
	font-size: 16px;
	cursor: pointer;
	color: ${({ theme }) => theme.colors.white};
`;
