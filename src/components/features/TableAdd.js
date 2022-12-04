import { Button, Spinner } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { getTables, addTableRequest } from '../../redux/tablesRedux';
import { useState } from 'react';

const TableAdd = () => {
	const dispatch = useDispatch();
	const tables = useSelector((state) => getTables(state));
	const [isLoading, setIsLoading] = useState(false);
	let tableId = 1;
	if (tables.length > 0) {
		for (let i = 1; i <= tables.length + 1; i++) {
			if (!tables.find((table) => table.id === i.toString())) {
				tableId = i;
			}
		}
	}
	const tableAddHandler = () => {
		setIsLoading(true);
		const newTable = {
			id: tableId.toString(),
			status: 'Free',
			peopleAmount: 0,
			maxPeopleAmount: 0,
			bill: 0,
		};
		dispatch(addTableRequest(newTable));
	};
	return (
		<>
			<Button
				variant='success'
				onClick={tableAddHandler}>
				Add table
			</Button>
			{isLoading && (
				<div className='text-center'>
					<Spinner animation='border' />
				</div>
			)}
		</>
	);
};

export default TableAdd;
