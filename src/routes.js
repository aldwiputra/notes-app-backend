const {
	addNoteHandler,
	getNotesHandler,
	getSingleNote,
	editNoteById,
	deleteNoteById
} = require('./handler');

const routes = [
	{
		method: 'GET',
		path: '/notes',
		handler: getNotesHandler
	},
	{
		method: 'POST',
		path: '/notes',
		handler: addNoteHandler,
		options: {
			cors: {
				origin: ['*']
			}
		}
	},
	{
		method: 'GET',
		path: '/notes/{id}',
		handler: getSingleNote
	},
	{
		method: 'PUT',
		path: '/notes/{id}',
		handler: editNoteById
	},
	{
		method: 'DELETE',
		path: '/notes/{id}',
		handler: deleteNoteById
	}
];

module.exports = routes;
