export interface CardholderDto {
  id: number;             
  firstName: string;
  lastName: string;
  address: string;
  phoneNumber: string;
  transactionCount: number;
}

export interface AddCardholderDto {
  firstName: string;
  lastName: string;
  address: string;
  phoneNumber: string;
  transactionCount: number;
}

export interface EditCardholderDto {
  firstName: string;
  lastName: string;
  address: string;
  phoneNumber: string;
  transactionCount: number;
}


export interface PagedResponse<T> {
  items: T[];
  page: number;
  pageSize: number;
  totalCount: number;
  totalPages: number;
  hasNext: boolean;
  hasPrevious: boolean;
}