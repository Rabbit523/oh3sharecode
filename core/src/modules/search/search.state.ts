import { SearchDto } from "../../shared/models/webapi/search/searchdto";
import { ListPager } from "../listpager";

export class SearchState {
  page: ListPager;
  text: string;
  Items: Array<SearchDto>;
}