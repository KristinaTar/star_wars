import { Film, Person } from "../types/types";

export type ApiResponse<Type> = {
  count: number;
  next: string | null;
  previous: string | null;
  results: Type[];
};
export const getPeopleAPI = async (page?: number) => {
  return fetchData<ApiResponse<Person>>(
    page
      ? `https://swapi.dev/api/people/?page=${page}`
      : "https://swapi.dev/api/people",
  );
};

export const getFilmsAPI = (page?: number) => {
  return fetchData<ApiResponse<Film>>(
    page
      ? `https://swapi.dev/api/films/?page=${page}`
      : "https://swapi.dev/api/films",
  );
};

export const getPersonAPI = (id: string | number): Promise<Response> => {
  return fetch(`https://swapi.dev/api/people/${id}/`);
};

export async function fetchData<T>(url: string) {
  const res = await fetch(url);

  if (res.status === 200) {
    return (await res.json()) as T;
  } else {
    return null;
  }
}

/**
 * Fetches list of requests based on list of URIs
 * @type T Return type of each request
 * @param urlList List of URIs
 * @returns List of responses
 */
export async function fetchList<T>(urlList: string[]) {
  return (await Promise.all(urlList.map((url) => fetchData<T>(url)))).filter(
    (el) => el !== null,
  ) as T[];
}
