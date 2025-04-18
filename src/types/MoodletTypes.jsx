import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export const MOODLET_TYPES = {
  F: {
    letter: 'F',
    word: 'Fuelling',
    options: ['F1', 'F2', 'F3', 'F4'],
    icon: <FontAwesomeIcon icon="gas-pump" />,
    ellipsis: false
  },
  S: {
    letter: 'S',
    word: 'Servicing',
    options: ['S1', 'S2', 'S3', 'S4'],
    icon: <FontAwesomeIcon icon="wrench" />,
    ellipsis: false,
  },
  C: {
    letter: 'C',
    word: 'Cleaning',
    options: ['C1', 'C2', 'C3', 'C4'],
    icon: <FontAwesomeIcon icon="broom" />,
    ellipsis: false
  },
  D1: {
    letter: 'D',
    word: 'Draining',
    options: ['D1'],
    icon: <FontAwesomeIcon icon="shower" />,
    ellipsis: false
  },
  D2: {
    letter: 'W',
    word: 'Washing',
    options: ['W1', 'W2'],
    icon: <FontAwesomeIcon icon="water" />,
    ellipsis: false,
    disabled: true
  },
  I: {
    letter: 'I',
    word: 'Inspection',
    options: ['I1', 'I2'],
    icon: <FontAwesomeIcon icon="magnifying-glass" />,
    ellipsis: true,
    readOnly: true
  },
};