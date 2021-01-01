export function userReducer(state, action) {
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

    default: {
      throw new Error(`Unhandled action type: ${action.type} `);
    }
  }
}