import {
  createContext,
  Dispatch,
  FC,
  ReactNode,
  SetStateAction,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

interface ISearchContext {
  data: {
    searchByName: string;
    currentPage: number;
    id: number | undefined;
  };
  operations: {
    setSearchByName: Dispatch<SetStateAction<string>>;
    setCurrentPage: Dispatch<SetStateAction<number>>;
    setId: Dispatch<SetStateAction<undefined>>;
  };
}

const UseSearchContext = createContext<ISearchContext | null>(null);
export const SearchContextWrapper: FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [searchByName, setSearchByName] = useState("");
  const [currentPage, setCurrentPage] = useState(0);
  const [id, setId] = useState(undefined);

  useEffect(() => {
    setCurrentPage(0);
  }, [searchByName]);

  const context: ISearchContext = useMemo(
    () => ({
      data: {
        searchByName,
        currentPage,
        id,
      },
      operations: {
        setSearchByName,
        setCurrentPage,
        setId,
      },
    }),
    [searchByName, currentPage, id, setSearchByName, setCurrentPage, setId],
  );

  return (
    <UseSearchContext.Provider value={context}>
      {children}
    </UseSearchContext.Provider>
  );
};

export const useSearchContext = (): ISearchContext => {
  const value = useContext(UseSearchContext);
  if (value === null) {
    throw new Error("empty UseSearchContext");
  }

  return value;
};
