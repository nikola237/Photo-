import React from 'react';

//components
import AudioCard from '../AudioCard/AudioCard';
import ErrorCard from '../ErrorCard/ErrorCard';

//styles
import { useStyles } from './Audio.styles';
import { Grid } from '@material-ui/core';

const Audio = ({ items, dispatch, tab, editMode }) => {
  return (
    <Grid item container spacing={2} justify="center">
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
                editMode={editMode}
                items={items}
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
