export type PeopleResponse<Type> = {
  count: number,
  next: string | null,
  previous: string | null,
  results: Type[],
}
export const getPeopleAPI = (url: string | null): Promise<Response> => {
  return fetch(url || "https://swapi.dev/api/people");
};