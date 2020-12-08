import React from 'react';
// import { useHistory } from 'react-router-dom';

//components
import ImageCard from '../ImageCard/ImageCard';
import ErrorCard from '../ErrorCard/ErrorCard';

//styles
import { Grid } from '@material-ui/core';
// import { useStyles } from './Image.styles';

const Image = ({ items, dispatch, tab }) => {
  // const classes = useStyles();

  return (
    <Grid item container>
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
