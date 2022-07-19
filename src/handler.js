const { nanoid } = require('nanoid');
const notes = require('./notes.js');

function addNoteHandler(req, h) {
	const noteToAdd = {
		...req.payload,
		id: nanoid(16),
		createdAt: new Date().toISOString()
	};

	if (!noteToAdd.updatedAt) {
		noteToAdd.updatedAt = noteToAdd.createdAt;
	}

	notes.push(noteToAdd);

	const isSuccess =
		notes.filter((element) => element.id === noteToAdd.id).length > 0;

	if (isSuccess) {
		const response = h.response({
			status: 'success',
			message: 'Note has been successfully added',
			data: {
				noteId: noteToAdd.id
			}
		});

		response.code(201);
		return response;
	}

	const response = h.response({
		status: 'failed',
		message: 'Note has failed to be added'
	});

	response.code(500);
	return response;
}

function getNotesHandler(req, h) {
	return {
		status: 'success',
		data: {
			notes
		}
	};
}

function getSingleNote(req, h) {
	const noteWithId = notes.filter((note) => note.id === req.params.id)[0];

	if (noteWithId !== undefined) {
		return {
			status: 'success',
			data: {
				note: noteWithId
			}
		};
	}

	const response = h.response({
		status: 'fail',
		message: 'Note was not found'
	});
	response.code(404);
	return response;
}

function editNoteById(req, h) {
	const { id } = req.params;
	const noteIdx = notes.findIndex((note) => note.id === id);

	if (noteIdx !== -1) {
		notes[noteIdx] = {
			...notes[noteIdx],
			...req.payload
		};
		notes.updatedAt = new Date().toISOString();

		const response = h.response({
			status: 'success',
			message: 'Note was updated successfully'
		});
		response.code(200);
		return response;
	}

	const response = h.response({
		status: 'fail',
		message: 'Failed to edit note, id not found'
	});
	response.code(404);
	return reseponse;
}

function deleteNoteById(req, h) {
	const { id } = req.params;
	const idx = notes.findIndex((note) => note.id === id);

	if (idx !== -1) {
		notes.splice(idx, 1);

		const response = h.response({
			status: 'success',
			message: 'Note has been successfully deleted'
		});

		response.code(200);
		return response;
	}

	const response = h.response({
		status: 'fail',
		message: 'Failed to delete note, id not found'
	});
	response.code(404);
	return response;
}

module.exports = {
	addNoteHandler,
	getNotesHandler,
	getSingleNote,
	editNoteById,
	deleteNoteById
};
