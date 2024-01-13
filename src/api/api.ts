export type ApiResponse<Type> = {
  count: number,
  next: string | null,
  previous: string | null,
  results: Type[],
}
export const getPeopleAPI = (url: string | null): Promise<Response> => {
  return fetch(url || "https://swapi.dev/api/people");
};
export const getPersonAPI = (id: string | number): Promise<Response> => {
  return fetch(`https://swapi.dev/api/people/${id}/`);
};

/**
 * Fetches data from server. If element is not found, returns null
 * @param url Fetch url
 */
export async function fetchData<T>(url: string)  {
  const res = await fetch(url);

  if (res.status === 200) {
    const data = (await res.json()) as T & {detail?: string};
    if (data.detail === "Not found") {
      return null;
    }

    return data as T;
  } else {
    return null;
  }
}

/**
 * Fetches list of requests based on list of URIs
 * @param list List of URIs
 */
export async function fetchList<T>(list: string[])  {
  return (await Promise.all(
    list.map(item => fetchData<T>(item))
  )).filter(el => el !== null) as T[];
}