import React, { createContext, useContext, useReducer } from 'react';

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
    type: 0,
    kwords: '',
    status: null,
    edit: null,
  });

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
