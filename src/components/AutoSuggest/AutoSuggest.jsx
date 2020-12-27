import React, { useCallback, useEffect } from 'react';

//api
import api from '../../api/api';

const AutoSuggest = ({
  kwords,
  autoSuggestion,
  dispatch,
  display,
  tagsKwords,
}) => {
  // console.log(tagsKwords, 'ovo su tagovi');
  const getData = useCallback(() => {
    async function getTags() {
      try {
        const response = await api.post(`/tags/search?size=10`, {
          kword: tagsKwords,
        });

        dispatch({ type: 'ADD_SUGGESTION', payload: response.data.rows });
        // console.log(response.data.rows, 'auto');
      } catch (error) {
        console.log(error);
      }
    }
    getTags();
  }, [dispatch, tagsKwords]);

  useEffect(() => {
    const timeout = setTimeout(() => {
      getData();
    }, 500);

    return () => {
      clearTimeout(timeout);
    };
  }, [getData]);

  const handleAutoSuggest = (tagname) => {
    let final;
    if (kwords.includes(',')) {
      const lastIndexKwords = kwords.lastIndexOf(',');
      const jebem = kwords.slice(0, lastIndexKwords);
      final = jebem.concat(',', tagname);
    } else {
      final = tagname;
    }

    dispatch({ type: 'ADD_KWORD_SUGGESTION', payload: final });
  };

  return (
    <div>
      {display &&
        autoSuggestion.map((el) => {
          if (autoSuggestion[0]?.message) {
            return null;
          } else {
            return (
              <div key={el.id} onClick={() => handleAutoSuggest(el.tagname)}>
                {el.tagname.toLowerCase().slice(0, 60)}...
              </div>
            );
          }
        })}
    </div>
  );
};

export default AutoSuggest;
