import { ActionCreatorWithPayload, ThunkDispatch } from "@reduxjs/toolkit";
import { ApiResponse } from "../api/api";

export async function cycleFetch<Type>(
  apiGetter: (next: string | null) => Promise<Response>,
  actionCreator: ActionCreatorWithPayload<Type[]>,
  dispatch: ThunkDispatch<any, any, any>,
  reject: () => void
) {
  let elementsList: Type[] = [];
  let next = null;

  // do { //todo uncomment
    const res = await apiGetter(next);
    if (res.status === 200) {
      const data = (await res.json()) as ApiResponse<Type>;
      elementsList = [...elementsList, ...data.results];
      console.log(elementsList)
      next = data.next;

      dispatch(actionCreator(elementsList));
    } else {
      return reject();
    }
  // } while (next); //todo uncomment
}