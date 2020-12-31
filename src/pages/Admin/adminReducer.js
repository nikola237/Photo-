export function adminReducer(state, action) {
  switch (action.type) {
    case 'RADIO_BUTTONS':
      return {
        ...state,
        type: action.payload,
      };
    case 'SEARCH':
      return {
        ...state,
        kwords: action.payload,
      };
    case 'PROBA':
      return {
        ...state,
        proba: action.payload,
      };
    case 'ITEMS':
      return {
        ...state,
        items: action.payload,
      };

    case 'PAGE':
      return {
        ...state,
        page: action.payload,
      };
    case 'TOTAL_PAGES':
      return {
        ...state,
        totalPages: action.payload,
      };
    case 'REMOVE_ITEM':
      return {
        ...state,
        items: state.items.filter((item) => item.id !== action.payload),
      };

    case 'TAB':
      return {
        ...state,
        tab: action.payload,
      };
    case 'IS_LOADING':
      return {
        ...state,
        isLoading: action.payload,
      };
    case 'EDIT_ITEM':
      return {
        ...state,
        editItem: state.items.filter((item) => item.id === action.payload),
      };

    case 'ADD_SUGGESTION':
      return {
        ...state,
        autoSuggestion: action.payload,
      };
    case 'ADD_KWORD_SUGGESTION':
      return {
        ...state,
        tagsKwords: action.payload,
      };
    case 'PAGINATION':
      return {
        ...state,
        totalPages: action.payload,
      };
    case 'PAGINATION_PAGE':
      return {
        ...state,
        page: action.payload,
      };
    case 'FILTER_EXT':
      return {
        ...state,
        extensionFilter: action.payload,
      };

    case 'EDIT_MODE':
      return {
        ...state,
        editMode: {
          status: action.payload.status,
          tags: action.payload.tags,
          itemId: action.payload.itemId,
        },
      };

    case 'EDIT_MODE_TEXT':
      return {
        ...state,
        editMode: {
          ...state.editMode,
          tags: action.payload,
        },
      };

    case 'ERROR':
      return { ...state, error: 'Nista nije pronadjeno' };
    default: {
      throw new Error(`Unhandled action type: ${action.type} `);
    }
  }
}
