export const getAllCommentsService = async () => {
	const response = await fetch(`${process.env.REACT_APP_BACKEND}`);
	const json = await response.json();

	if (!response.ok) {
		throw new Error(json.message);
	}

	return json.data;
};

export const getSingleCommentService = async (id) => {
	const response = await fetch(`${process.env.REACT_APP_BACKEND}/comment/${id}`);
	const json = await response.json();

	if (!response.ok) {
		throw new Error(json.message);
	}

	return json.data;
};

export const registerUserService = async ({ email, name, password }) => {
	const response = await fetch(`${process.env.REACT_APP_BACKEND}/user`, {
		method: 'POST',
		body: JSON.stringify({ email, name, password }),
		headers: {
			'Content-Type': 'application/json',
		},
	});
	const json = await response.json();

	if (!response.ok) {
		throw new Error(json.message);
	}
};

export const userDetailsEditService = async ({ token, name, password }) => {
	const response = await fetch(`${process.env.REACT_APP_BACKEND}/userdetailsedit`, {
		method: 'PUT',
		body: JSON.stringify({ name, password }),
		headers: {
			'Content-Type': 'application/json',
			Authorization: token
		},
	});
	const json = await response.json();

	if (!response.ok) {
		throw new Error(json.message);
	}
};




export const loginUserService = async ({ email, password }) => {
	const response = await fetch(`${process.env.REACT_APP_BACKEND}/user/login`, {
		method: 'POST',
		body: JSON.stringify({ email, password }),
		headers: {
			'Content-Type': 'application/json',
		},
	});

	const json = await response.json();

	if (!response.ok) {
		throw new Error(json.message);
	}
	return json.data;
};

export const getMyUserDataService = async ({token}) => {
	
	const response = await fetch(`${process.env.REACT_APP_BACKEND}/user`, {
		headers: {
			Authorization: token,
		},
	});

	const json = await response.json();
	if(!response.ok) {
		throw new Error(json.message);
	}
	return json.data;

};

export const getUserDetailsService = async (id) => {
	const response = await fetch(`${process.env.REACT_APP_BACKEND}/user/${id}`, {
		
	});
	const json = await response.json();
	if(!response.ok) {
		throw new Error(json.message);
	}
	return json.data;

};

export const getUserEditService = async (token) => {
	const response = await fetch(`${process.env.REACT_APP_BACKEND}/userdetailsedit`, {
		method: 'PUT',
		headers: {
			"Authorization": token,
		},
	});
	const json = await response.json();
	if(!response.ok) {
		throw new Error(json.message);
	}
	return json.data;

};

export const getUserEditGetService = async (token) => {
	const response = await fetch(`${process.env.REACT_APP_BACKEND}/user`, {
		method: 'GET',
		headers: {
			"Authorization": token,
		},
	});
	const json = await response.json();
	if(!response.ok) {
		throw new Error(json.message);
	}
	return json.data;

};

export const getCountCommentVotesService = async (id) => {
	const response = await fetch(`${process.env.REACT_APP_BACKEND}/comment/votescounter/${id}`, {
		method: 'GET'
	});
	const json = await response.json();
	if(!response.ok) {
		throw new Error(json.data);
	}
	return json.data;

};

export const likeCommentService = async ({ token, id, vote }) => {
	const response = await fetch(`${process.env.REACT_APP_BACKEND}/comment/vote`, {
		method: 'POST',
		body: JSON.stringify({ id, vote }),
		headers: {
			'Content-Type': 'application/json',
			Authorization: token
		},
	});
	const json = await response.json();

	if (!response.ok) {
		throw new Error(json.message);
	}
};

export const  sendCommentService = async ({  title, text , token}) => {
	const response = await fetch(`${process.env.REACT_APP_BACKEND}/comment`, {
		method: 'POST',
		body: JSON.stringify({ title,text  }),
		headers: {
			'Content-Type': 'application/json',
			"Authorization": token,
		},
	});

	const json = await response.json();

	if (!response.ok) {
		throw new Error(json.message);
	}
	return json.data;
};

export const deleteCommentService = async ({id, token}) => {
	const response = await fetch(`${process.env.REACT_APP_BACKEND}/comment/${id}`, {
		method: 'DELETE',
				headers: {
			"Authorization": token,
		},
	});

	const json = await response.json();

	if(!response.ok) {
		throw new Error(json.message);
	}
};
