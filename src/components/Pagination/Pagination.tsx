import React from "react";
import { Pagination as LibraryPagination } from "antd";
import PaginationStyles from "./Pagination.styles";
import useWindowSize from "../../hooks/useWindowSize";

type Props = {
  pageSize: number;
  total: number;
  current: number;
  onChange: (page: number) => void;
};
/**
 * @param pageSize Number of elements on the page
 * @param total Total number of elements in the list
 * @param current Current page, starting from 1
 * @param onChange Change handler for page change
 */
const Pagination: React.FC<Props> = ({
  pageSize,
  total,
  current,
  onChange,
}) => {
  const { width } = useWindowSize();

  return (
    <PaginationStyles>
      <LibraryPagination
        pageSize={pageSize}
        total={total}
        current={current}
        onChange={onChange}
        showSizeChanger={false}
        showLessItems={width < 400}
      />
    </PaginationStyles>
  );
};
export default Pagination;
