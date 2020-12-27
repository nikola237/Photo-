import React from 'react';

//components
import ImageCard from '../ImageCard/ImageCard';
import ErrorCard from '../ErrorCard/ErrorCard';

//styles
import { Grid } from '@material-ui/core';

const Image = ({ items, dispatch, tab, editMode }) => {
  return (
    <Grid container spacing={2} justify="center">
      {items ? (
        items.map((item) => {
          if (items[0]?.message) {
            return <ErrorCard key={1} {...item} />;
          } else {
            return (
              <ImageCard
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
        <div>Loading Iz imga</div>
      )}
    </Grid>
  );
};

export default Image;
