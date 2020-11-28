import React, {
  createContext,
  useContext,
  useReducer,
  useCallback,
  useEffect,
} from 'react';

import api from '../../../api/api';
const AdminStateContext = createContext();
const AdminDispatchContext = createContext();

function adminReducer(state, action) {
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
    case 'EDIT_ITEM':
      return {
        ...state,
        edit: state.items.filter((el) => el.id === action.payload),
      };
    default: {
      throw new Error(`Unhandled action type: ${action.type} `);
    }
  }
}

function AdminProvider({ children }) {
  const [state, dispatch] = useReducer(adminReducer, {
    items: [],
    type: JSON.parse(window.localStorage.getItem('radioBtnValue')) || 0,
    kwords: window.localStorage.getItem('kwordValue') || '',
    status: null,
    edit: null,
    data: null,
    page: 1,
    totalPages: undefined,
  });

  const getData = useCallback(() => {
    async function getItems() {
      const response = await api.post(
        `/items/search?size=10&page=${state.page}`,
        {
          type: state.type,
          kwords: state.kwords,
        }
      );

      dispatch({ type: 'ITEMS', payload: response.data.rows });
      dispatch({ type: 'TOTAL_PAGES', payload: response.data.totalPages });
    }
    getItems();
  }, [state.kwords, state.page, state.type]);

  useEffect(() => {
    const timeout = setTimeout(() => {
      getData();
    }, 1000);

    return () => {
      clearTimeout(timeout);
    };
  }, [getData]);

  return (
    <AdminStateContext.Provider value={state}>
      <AdminDispatchContext.Provider value={dispatch}>
        {children}
      </AdminDispatchContext.Provider>
    </AdminStateContext.Provider>
  );
}

function useAdminState() {
  const context = useContext(AdminStateContext);
  if (context === undefined) {
    throw new Error('useCountState must be used within a CountProvider');
  }
  return context;
}

function useAdminDispatch() {
  const context = useContext(AdminDispatchContext);
  if (context === undefined) {
    throw new Error('useCountState must be used within a CountProvider');
  }
  return context;
}

export { AdminProvider, useAdminState, useAdminDispatch };
