import React, { useReducer, createContext, useContext } from 'react';

const ProjectsStateContext = createContext();
const ProjectsDispatchContext = createContext();

function projectsReducer(state, action) {
  switch (action.type) {
    case 'PROJECTS':
      return {
        ...state,
        projects: action.payload,
      };
    case 'ITEM_INFO':
      return {
        ...state,
        itemInfo: {
          ...state.itemInfo,
          id: action.payload.id,
          pathShort: action.payload.pathShort,
          filename: action.payload.filename,
        },
      };
    case 'PROJECT_ID':
      return {
        ...state,
        projectId: action.payload,
      };
    case 'KWORDS':
      return {
        ...state,
        kwords: action.payload,
      };
    case 'RADIO_BUTTONS':
      return {
        ...state,
        type: action.payload,
      };
    case 'EDIT_ITEM_ID':
      return {
        ...state,
        editItemId: action.payload,
      };
    case 'EDIT_ITEM':
      return {
        ...state,
        editItem: {
          ...state.editItem,
          tags: action.payload.tags,
          originalname: action.payload.originalname,
          pathShort: action.payload.pathShort,
          type: action.payload.type,
        },
      };
    case 'UPDATE_FIELD_VALUE':
      return {
        ...state,
        editItem: {
          ...state.editItem,
          [action.payload.field]: action.payload.value,
        },
      };
    default: {
      throw new Error(`Unhandled action type: ${action.type}`);
    }
  }
}

const ProjectsProvider = ({ children }) => {
  const [state, dispatch] = useReducer(projectsReducer, {
    projects: null,
    itemInfo: {
      id: null,
      pathShort: null,
      filename: null,
    },
    kwords: '',
    type: 1,
    projectId: null,
    editItemId: null,
    editItem: {
      tags: '',
      originalname: '',
      pathShort: null,
    },
  });

  return (
    <ProjectsStateContext.Provider value={state}>
      <ProjectsDispatchContext.Provider value={dispatch}>
        {children}
      </ProjectsDispatchContext.Provider>
    </ProjectsStateContext.Provider>
  );
};

function useProjectsState() {
  const context = useContext(ProjectsStateContext);
  if (context === undefined) {
    throw new Error('useCountState must be used within a CountProvider');
  }
  return context;
}
function useProjectsDispatch() {
  const context = useContext(ProjectsDispatchContext);
  if (context === undefined) {
    throw new Error('useCountDispatch must be used within a CountProvider');
  }
  return context;
}
export { ProjectsProvider, useProjectsState, useProjectsDispatch };
