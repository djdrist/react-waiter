import { useParams, Navigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { getTableById } from '../../redux/tablesRedux';
import { Form, Row, Col, Button, Spinner } from 'react-bootstrap';
import { useState } from 'react';
import { editTableRequest } from '../../redux/tablesRedux';

const TableInfo = () => {
	const { id } = useParams();
	const table = useSelector((state) => getTableById(state, id));
	const dispatch = useDispatch();
	const [tableStatus, setTableStatus] = useState(table?.status);
	const [tablePeopleAmount, setTablePoepleAmount] = useState(table?.peopleAmount);
	const [tableMaxPeopleAmount, setTableMaxPoepleAmount] = useState(table?.maxPeopleAmount);
	const [tableBill, setTableBill] = useState(table?.bill);
	const [isLoading, setIsLoading] = useState(false);

	const tableStatusSelectChangeHandler = (e) => {
		setTableStatus(e.target.value);
		setTableBill(0);
		switch (e.target.value) {
			case 'Free':
			case 'Cleaning':
				setTablePoepleAmount(0);
				break;
			default:
				break;
		}
	};

	const tablePeopleAmountInputChangeHandler = (e) => {
		let value = Number(e.target.value);
		if (value > 0 && value <= 10 && value <= tableMaxPeopleAmount) {
			setTablePoepleAmount(value);
		}
	};

	const tableMaxPeopleAmountInputChangeHandler = (e) => {
		let value = Number(e.target.value);
		if (value > 0 && value <= 10) {
			setTableMaxPoepleAmount(value);
			if (value < tablePeopleAmount) {
				setTablePoepleAmount(value);
			}
		}
	};
	const tableBillInputChangeHandler = (e) => {
		let value = Number(e.target.value);
		if (value >= 0) {
			setTableBill(value);
		}
	};

	const submitHandler = (e) => {
		e.preventDefault();
		setIsLoading(true);
		const payload = {
			id: id,
			status: tableStatus,
			peopleAmount: tablePeopleAmount,
			maxPeopleAmount: tableMaxPeopleAmount,
			bill: tableBill,
		};
		dispatch(editTableRequest(payload));
	};

	if (!table) return <Navigate to='/' />;
	else
		return (
			<>
				<div className='d-flex my-3'>
					<h2>Table {table.id}</h2>
				</div>
				<Form>
					<Form.Group
						as={Row}
						className='my-3'>
						<Form.Label
							column
							xs='1'
							className='fw-bold'>
							Status:
						</Form.Label>
						<Col xs='3'>
							<Form.Select
								name='status'
								onChange={tableStatusSelectChangeHandler}
								aria-label=''
								value={tableStatus}>
								<option value='Free'>Free</option>
								<option value='Reserved'>Reserved</option>
								<option value='Busy'>Busy</option>
								<option value='Cleaning'>Cleaning</option>
							</Form.Select>
						</Col>
					</Form.Group>
					<Form.Group
						as={Row}
						className='my-3'>
						<Form.Label
							column
							xs='1'
							className='fw-bold'>
							People:
						</Form.Label>
						<Col xs='2'>
							<Row>
								<Col xs='5'>
									<Form.Control
										name='peopleAmount'
										onChange={tablePeopleAmountInputChangeHandler}
										min='1'
										max='10'
										className='text-center'
										type='number'
										value={tablePeopleAmount}
									/>
								</Col>
								<Col xs='1'>
									<p className='my-1'>/</p>
								</Col>
								<Col xs='5'>
									<Form.Control
										name='maxPeopleAmount'
										onChange={tableMaxPeopleAmountInputChangeHandler}
										min='1'
										max='10'
										className='text-center'
										type='number'
										value={tableMaxPeopleAmount}
									/>
								</Col>
							</Row>
						</Col>
					</Form.Group>
					{tableStatus === 'Busy' && (
						<Form.Group
							as={Row}
							className='my-3'>
							<Form.Label
								column
								xs='1'
								className='fw-bold'>
								Bill:
							</Form.Label>
							<Col xs='2'>
								<Row>
									<Col xs='1'>
										<p className='my-1'>$</p>
									</Col>
									<Col xs='6'>
										<Form.Control
											name='bill'
											onChange={tableBillInputChangeHandler}
											className='text-center'
											type='number'
											min='0'
											value={tableBill}
										/>
									</Col>
								</Row>
							</Col>
						</Form.Group>
					)}
					<Button onClick={submitHandler}>Update</Button>
					{isLoading && (
						<div className='text-center'>
							<Spinner animation='border' />
						</div>
					)}
				</Form>
			</>
		);
};

export default TableInfo;
