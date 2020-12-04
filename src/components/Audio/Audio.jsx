import React from 'react';
// import { useHistory } from 'react-router-dom';

//components
import AudioCard from '../AudioCard/AudioCard';
import ErrorCard from '../ErrorCard/ErrorCard';

// utils
// import { handleDownloadItem, removeItem } from '../utils';

//styles
// import { useStyles } from './Audio.styles';
import { Grid } from '@material-ui/core';

const Audio = ({ items, dispatch, tab }) => {
  // const history = useHistory();

  // const classes = useStyles();

  // const handleItem = () => {
  //   dispatch({ type: 'EDIT_ITEM', payload: id });
  //   history.push(`/edit/${id}`);
  // };

  return (
    <Grid item container>
      {items ? (
        items.map((item) => {
          if (items[0]?.message) {
            return <ErrorCard key={1} {...item} />;
          } else {
            return (
              <AudioCard
                key={item.id}
                {...item}
                dispatch={dispatch}
                tab={tab}
              />
            );
          }
        })
      ) : (
        <div>IMAGE JEBEM TI</div>
      )}
    </Grid>
  );
};
export default Audio;
