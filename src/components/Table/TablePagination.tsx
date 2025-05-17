import styled from 'styled-components';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface TablePaginationProps {
	currentPage: number;
	totalPages: number;
	totalRows: number;
	onChangePage: (page: number) => void;
}

const TablePagination = ({ currentPage, totalPages, totalRows, onChangePage }: TablePaginationProps) => {
	return (
		<PaginationWrapper>
			<PaginationContainer>
				<PaginationButton onClick={() => onChangePage(currentPage - 1)} disabled={currentPage === 1}>
					<ChevronLeft size={24} />
				</PaginationButton>
				<PaginationText>
					{currentPage} of {totalPages} pages
				</PaginationText>
				<PaginationButton onClick={() => onChangePage(currentPage + 1)} disabled={currentPage === totalPages}>
					<ChevronRight size={24} />
				</PaginationButton>
			</PaginationContainer>
			<PaginationTotalText>Total: {totalRows} records</PaginationTotalText>
		</PaginationWrapper>
	);
};

export default TablePagination;

const PaginationWrapper = styled.div`
	position: relative;
	height: 40px;
	justify-content: center;
	display: flex;
`;

const PaginationContainer = styled.div`
	display: flex;
	flex-direction: row;
	align-items: center;
	justify-content: center;
	gap: 12px;
`;

const PaginationButton = styled.button`
	width: 40px;
	display: flex;
	flex-direction: row;
	align-items: center;
	justify-content: center;
	cursor: pointer;
	background-color: ${({ theme }) => theme.colors.secondary};
	color: ${({ theme }) => theme.colors.white};
	border: none;
	border-radius: 8px;
	padding: 4px 8px;

	&:hover {
		background-color: ${({ theme }) => theme.colors.primary};
	}

	&:disabled {
		background-color: ${({ theme }) => theme.colors.light};
		cursor: not-allowed;
	}
`;

const PaginationText = styled.span`
	font-size: 16px;
	font-weight: 400;
	color: ${({ theme }) => theme.colors.primary};
`;

const PaginationTotalText = styled(PaginationText)`
	position: absolute;
	right: 0;
	line-height: 40px;
	margin-right: 12px;
`;
