import { StatusBillingEntry, StatusBillingExit } from './types';
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
export const STATUS_BILLING_ENTRY = {
  CREATE: {
    LABEL: 'CREATE',
    VALUE: 0 as StatusBillingEntry,
  },
  DONE: {
    LABEL: 'DONE',
    VALUE: 1 as StatusBillingEntry,
  },
};

export const STATUS_BILLING_EXIT = {
  CREATE: {
    LABEL: 'CREATE',
    VALUE: 0 as StatusBillingExit,
  },
  PROCESSING: {
    LABEL: 'PROCESSING',
    VALUE: 1 as StatusBillingExit,
  },
  DONE: {
    LABEL: 'DONE',
    VALUE: 2 as StatusBillingExit,
  },
};
