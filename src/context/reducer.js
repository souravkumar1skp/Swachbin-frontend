const reducer = (state, action) => {
    switch (action.type) {
        case 'UPDATE_LOCATION':
            return { ...state, location: action.payload };
        case 'UPDATE_LOGIN':
            return { ...state, login: action.payload };
        default:
            throw new Error('pagal');
    }
}

export default reducer;