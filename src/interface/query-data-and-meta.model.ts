export class QueryDataAndMeta<T> {
  public data: T[];
  public metaData: MetaDataInterface;

  constructor(paginationResults: IDataAndQueryParams<T>) {
    this.data = paginationResults.data;
    this.metaData = {
      ...paginationResults.queryParams,
      total: paginationResults.total,
    };
  }
}
export interface MetaDataInterface {
  limit: number;
  page: number;
  total: number;
}

interface IDataAndQueryParams<T> {
  data: T[];
  queryParams: any;
  total: number;
}
