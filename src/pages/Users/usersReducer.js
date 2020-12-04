export function usersReducer(state, action) {
  switch (action.type) {
    case 'UPDATE_FIELD_VALUE':
      return { ...state, [action.payload.field]: action.payload.value };
    // case 'RESET':
    //   return INITIAL_STATE;
    case 'TAB':
      return {
        ...state,
        tab: action.payload,
      };
    case 'USER_ID':
      return {
        ...state,
        userId: action.payload,
      };
    case 'EDIT_USER':
      return {
        firstname: action.payload.firstname,
        lastname: action.payload.lastname,
        username: action.payload.username,
        email: action.payload.email,
        role: action.payload.role,
      };
    default: {
      throw new Error(`Unhandled action type: ${action.type} `);
    }
  }
}
