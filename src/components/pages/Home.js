import { Row, Col } from 'react-bootstrap';

import TableAdd from '../features/TableAdd';
import TablesList from '../features/TablesList';

const Home = () => {
	return (
		<>
			<Row>
				<Col xs={10}>
					<h2>All Tables</h2>
				</Col>
				<Col
					xs={2}
					className='text-end'>
					<TableAdd />
				</Col>
			</Row>
			<TablesList />
		</>
	);
};
export default Home;
