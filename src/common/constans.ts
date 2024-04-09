export enum Status {
    PENDING = 0,
    WAITING = 1,
    CONFIRMED = 2,
    CANCELED = 3,
  }
  
  export const DOCUMENT_IDENTIFIERS = {
    DNI_LENGTH: 8,
    RUC_LENGTH: 11,
    DNI_TYPE: 'dni',
    RUC_TYPE: 'ruc',
  };
  
  export const MODALITY = {
    PRESENCIAL: 0,
    VIRTUAL: 1,
  };
  
  export enum PaymentStatus {
    PENDING = '0',
    PAYED = '1',
  }
  
  export enum ApiResponseStatus {
    SUCCESS = '1',
    ERROR = '2',
  }