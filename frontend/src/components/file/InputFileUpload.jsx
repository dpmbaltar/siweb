import * as React from 'react';
import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUpload } from '@fortawesome/free-solid-svg-icons';

const VisuallyHiddenInput = styled('input')({
  clip: 'rect(0 0 0 0)',
  clipPath: 'inset(50%)',
  height: 1,
  overflow: 'hidden',
  position: 'absolute',
  bottom: 0,
  left: 0,
  whiteSpace: 'nowrap',
  width: 1,
});

export default function InputFileUpload({ onFileSelect }) {

  const handleChange = (event) => {
    const file = event.target.files[0];
    onFileSelect(file);
  };

  return (
    <Button
      component="label"
      role={undefined}
      variant="contained"
      tabIndex={-1}
      startIcon={<FontAwesomeIcon icon={faUpload} />}
    >
      Subir archivos
      <VisuallyHiddenInput
        type="file"
        onChange={handleChange}
        multiple
      />
    </Button>
  );
}
