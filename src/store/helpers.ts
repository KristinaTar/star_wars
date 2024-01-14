import { ActionCreatorWithPayload, ThunkDispatch } from "@reduxjs/toolkit";
import { ApiResponse } from "../api/api";

const PAGE_SIZE = 10;
const START_PAGE = 2;

/**
 * Gets first page of data list. If there are more items - fetch the rest of them
 * @param apiGetter Function that fetches data list (first on nth page)
 * @param actionCreator Changes Redux state
 * @param dispatch Redux dispatch function
 * @param reject Reject handler function
 */
export async function cycleFetch<Type>(
  apiGetter: (page?: number) => Promise<ApiResponse<Type> | null>,
  actionCreator: ActionCreatorWithPayload<Type[]>,
  dispatch: ThunkDispatch<any, any, any>,
  reject: () => void,
) {
  const data = await apiGetter();
  // if first page failed to fetch - reject
  if (!data) return reject();
  dispatch(actionCreator(data.results));

  // Storing first page
  let elementsList: Type[] = [...data.results];

  // Collecting rest of pages
  if (data.count > PAGE_SIZE) {
    const remainingPages = Math.ceil((data.count - PAGE_SIZE) / PAGE_SIZE);
    const pagesNumbers = new Array(remainingPages)
      .fill(null)
      .map((_, index) => index + START_PAGE);

    // fetching data from all pages at the same time
    const responsesList = await Promise.all(
      pagesNumbers.map((pageNumber) => apiGetter(pageNumber)),
    );

    const remainingPagesList = responsesList
      // ignoring failed requests
      .filter((response) => response !== null)
      // gathering the data we need
      .map((response) => response!.results);

    // Storing rest of pages
    remainingPagesList.forEach((list) => {
      elementsList = elementsList.concat(list);
    });

    // Setting ALL pages data to Redux state
    dispatch(actionCreator(elementsList));
  }
}
