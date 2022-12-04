const createActionName = (actionName) => `app/tables/${actionName}`;

const UPDATE_TABLES = createActionName('UPDATE_TABLES');
const EDIT_TABLE = createActionName('EDIT_TABLE');
const DELETE_TABLE = createActionName('DELETE_TABLE');
const ADD_TABLE = createActionName('ADD_TABLE');

// selectors

export const getTables = (state) => state.tables;
export const getTableById = ({ tables }, tableId) => tables.find((table) => table.id === tableId);

// actions

export const updateTables = (payload) => ({ type: UPDATE_TABLES, payload });
export const editTable = (payload) => ({ type: EDIT_TABLE, payload });
export const deleteTable = (payload) => ({ type: DELETE_TABLE, payload });
export const addTable = (payload) => ({ type: ADD_TABLE, payload });

// action creators

export const fetchTables = () => {
	return (dispatch) => {
		fetch('http://localhost:3131/api/tables')
			.then((res) => res.json())
			.then((tables) => dispatch(updateTables(tables)));
	};
};

export const editTableRequest = (tableInfo) => {
	return (dispatch) => {
		const options = {
			method: 'PUT',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(tableInfo),
		};
		fetch(`http://localhost:3131/api/tables/${tableInfo.id}`, options).then(() => dispatch(editTable(tableInfo)));
	};
};

export const deleteTableRequest = (id) => {
	return (dispatch) => {
		const options = {
			method: 'DELETE',
			headers: {
				'Content-Type': 'application/json',
			},
		};
		fetch(`http://localhost:3131/api/tables/${id}`, options).then(() => dispatch(deleteTable(id)));
	};
};

export const addTableRequest = (newTable) => {
	return (dispatch) => {
		const options = {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(newTable),
		};
		fetch(`http://localhost:3131/api/tables`, options).then(() => dispatch(addTable(newTable)));
	};
};

const tablesReducer = (statePart = [], action) => {
	switch (action.type) {
		case UPDATE_TABLES:
			return [...action.payload];
		case DELETE_TABLE:
			return statePart.filter((table) => table.id !== action.payload);
		case ADD_TABLE:
			return [...statePart, action.payload];
		case EDIT_TABLE:
			return statePart.map((table) => (table.id === action.payload.id ? { ...table, ...action.payload } : table));
		default:
			return statePart;
	}
};

export default tablesReducer;
