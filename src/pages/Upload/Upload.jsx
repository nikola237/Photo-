import React, { useReducer, useState } from 'react';
import uploadApi from '../../api/uploadApi';
import FileUploaded from '../../components/FileUploaded/FileUploaded';

function itemReducer(state, action) {
  switch (action.type) {
    case 'UPDATE_FIELD_TITLE':
      return {
        ...state,
        [action.index]: {
          ...state[action.index],
          title: action.payload,
        },
      };

    case 'UPDATE_FIELD_TAGS':
      return {
        ...state,
        [action.index]: {
          ...state[action.index],
          tags: action.payload,
        },
      };

    default: {
      throw new Error(`Unhandled action type: ${action.type} `);
    }
  }
}

const Upload = () => {
  const [selectedFile, setSelectedFile] = useState('');
  const [state, dispatch] = useReducer(itemReducer, {});

  console.log(state, 'ovo je STEJT');

  console.log(selectedFile, 'ovo je SELECTED');

  const fileChangeHandler = (event) => {
    setSelectedFile(Object.values(event.target.files));
  };
  const formValue = Object.values(state);

  const fileUploadHandler = (event) => {
    event.preventDefault();
    if (selectedFile !== '' && state !== {}) {
      const data = selectedFile.map((item, index) =>
        Object.assign({ item }, formValue[index])
      );
      console.log(data);
      let arr = [];
      console.log(arr, 'ovo je arr');
      for (const [, newData] of Object.entries(data)) {
        let fd = new FormData();
        console.log(newData.tags, 'ovo je key newData');
        fd.append('item', newData.item);
        fd.append('title', newData.title);
        fd.append('tags', newData.tags);

        arr.push(fd);
      }

      console.log(arr, 'ovo je fd');
      try {
        arr.forEach(async (el) => {
          const response = await uploadApi.post('/item/add', el);
          console.log(response, 'ovo je response!!!');
        });
      } catch (error) {
        console.log(error.message);
      }
    }
  };

  return (
    <div>
      <input
        type="file"
        onChange={fileChangeHandler}
        id="file-selector"
        name="items"
        // accept=".jpg, .jpeg, .png"
        multiple
      />
      {selectedFile &&
        selectedFile.map((file, index) => (
          <FileUploaded
            key={index}
            file={file}
            dispatch={dispatch}
            index={index}
            name={file.name}
          />
        ))}
      <button onClick={fileUploadHandler}>Upload</button>
    </div>
  );
};

export default Upload;
