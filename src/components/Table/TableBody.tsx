import styled from 'styled-components';

interface TableBodyProps {
	data: any[];
	columns: string[];
	nullValue: string;
	onClickRow: (row: any) => void;
	isShowIndex: boolean;
}

const TableBody = ({ data, columns, nullValue, onClickRow, isShowIndex }: TableBodyProps) => {
	return (
		<TableBodyContainer>
			{data.map((row, index) => {
				const rowData = columns.map((column) => {
					const value = row[column];

					if (typeof value === 'boolean') {
						return <TableCell key={column}>{value ? 'Yes' : 'No'}</TableCell>;
					}

					if (typeof value === 'object') {
						return <TableCell key={column}>{JSON.stringify(value)}</TableCell>;
					}

					return <TableCell key={column}>{value || nullValue}</TableCell>;
				});

				return (
					<TableRow key={row.id || index} onClick={() => onClickRow(row)} index={index}>
						{isShowIndex && <TableIndexCell>{index + 1}</TableIndexCell>}
						{rowData}
					</TableRow>
				);
			})}
		</TableBodyContainer>
	);
};

export default TableBody;

const TableBodyContainer = styled.tbody``;

const TableRow = styled.tr<{ index: number }>`
	cursor: pointer;
	background-color: ${({ theme, index }) => (index % 2 === 0 ? theme.colors.white : theme.colors.light)};
	color: ${({ theme }) => theme.colors.primary};

	&:hover {
		opacity: 0.7;
	}
`;

const TableCell = styled.td`
	padding: 8px 10px;
	border: 2px solid ${({ theme }) => theme.colors.light};
`;

const TableIndexCell = styled(TableCell)`
	text-align: center;
`;
