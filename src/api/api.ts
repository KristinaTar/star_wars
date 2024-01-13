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