import { useQuery } from "react-query";

interface Props {
  searchByName?: string;
  currentPage?: number;
  id?: string | null;
}

const fetchTvShows = async ({ searchByName, currentPage, id }: Props) => {
  if (id !== undefined) {
    const response = await fetch(`https://api.tvmaze.com/shows/${id}`);
    return await response.json();
  }
  if (searchByName === "") {
    const response = await fetch(
      `http://api.tvmaze.com/shows?page=${currentPage}`,
    );
    return await response.json();
  } else {
    const response = await fetch(
      `http://api.tvmaze.com/search/shows?q=${searchByName}`,
    );
    return await response.json();
  }
};

const useTvShows = ({ searchByName, currentPage, id }: Props) => {
  return useQuery(
    ["tvShows", searchByName, currentPage],
    () =>
      fetchTvShows({
        searchByName,
        currentPage,
        id,
      }),
    { keepPreviousData: true },
  );
};

export default useTvShows;
