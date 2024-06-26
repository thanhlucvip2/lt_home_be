import { StatusEntry, StatusExit } from './types';
import { Role } from './types';

export const ROLE = {
  USER: {
    LABEL: 'USER',
    VALUE: 0 as Role,
  },
  ADMIN: {
    LABEL: 'ADMIN',
    VALUE: 1 as Role,
  },
};
export const STATUS_ENTRY = {
  CREATE: {
    LABEL: 'CREATE',
    VALUE: 0 as StatusEntry,
  },
  DONE: {
    LABEL: 'DONE',
    VALUE: 1 as StatusEntry,
  },
};

export const STATUS_EXIT = {
  CREATE: {
    LABEL: 'CREATE',
    VALUE: 0 as StatusExit,
  },
  PROCESSING: {
    LABEL: 'PROCESSING',
    VALUE: 1 as StatusExit,
  },
  DONE: {
    LABEL: 'DONE',
    VALUE: 2 as StatusExit,
  },
};
