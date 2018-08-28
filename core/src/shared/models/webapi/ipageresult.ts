export class IPageResult<T>{
    Items: T[];
    NextPageLink: string;
    Count: number;
}