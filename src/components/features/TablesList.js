import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Row, Col, Button, Spinner } from 'react-bootstrap';

import { getTables, deleteTableRequest } from '../../redux/tablesRedux';

const TablesList = () => {
	const tables = useSelector((state) => getTables(state));
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const deleteTableHandler = (e) => {
		dispatch(deleteTableRequest(e.target.dataset.id));
	};
	return tables.length === 0 ? (
		<div className='text-center'>
			<Spinner animation='border' />
		</div>
	) : (
		tables.map((table) => (
			<Row
				key={table.id}
				className='border-bottom py-3'>
				<Col xs={2}>
					<h2>Table {table.id}</h2>
				</Col>
				<Col
					xs={8}
					className='my-2'>
					<p className='fs-6 fw-bold'>
						Status: <span className='fw-normal'>{table.status}</span>
					</p>
				</Col>
				<Col
					xs={2}
					className='text-end'>
					<Button
						variant='danger'
						className='mx-3 fw-bold'
						data-id={table.id}
						onClick={deleteTableHandler}>
						X
					</Button>
					<Button
						variant='primary'
						onClick={() => navigate(`/table/${table.id}`)}>
						Show more
					</Button>
				</Col>
			</Row>
		))
	);
};

export default TablesList;
