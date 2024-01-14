import { ActionCreatorWithPayload, ThunkDispatch } from "@reduxjs/toolkit";
import { ApiResponse } from "../api/api";

const PAGE_SIZE = 10;
const START_PAGE = 2;

export async function cycleFetch<Type>(
  apiGetter: (page?: number) => Promise<ApiResponse<Type> | null>,
  actionCreator: ActionCreatorWithPayload<Type[]>,
  dispatch: ThunkDispatch<any, any, any>,
  reject: () => void
) {

  const data = await apiGetter();
  // if first page failed to fetch - reject
  if (!data) return reject();
  dispatch(actionCreator(data.results));

  let elementsList: Type[] = [...data.results];

  if (data.count > PAGE_SIZE) {
    const remainingPages = Math.ceil((data.count - PAGE_SIZE) / PAGE_SIZE);
    const pagesNumbers = new Array(remainingPages).fill(null)
      .map((_, index) => index + START_PAGE);

    const responsesList = (await Promise.all(
      pagesNumbers.map(index => apiGetter(index))
    ));

    const remainingPagesList = responsesList
      .filter(response => response !== null)
      .map(response => response!.results);

    remainingPagesList.forEach(list => {
      elementsList = elementsList.concat(list);
    });

    dispatch(actionCreator(elementsList));
  }
}