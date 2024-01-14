import React from "react";
import { Pagination as LibraryPagination } from "antd";
import PaginationStyles from "./Pagination.styles";

type Props = {
  pageSize: number;
  total: number;
  current: number;
  onChange: (page: number) => void;
};

const Pagination: React.FC<Props> = ({
  pageSize,
  total,
  current,
  onChange,
}) => {
  return (
    <PaginationStyles>
      <LibraryPagination
        pageSize={pageSize}
        total={total}
        current={current}
        onChange={onChange}
        showSizeChanger={false}
        showLessItems={window.innerWidth < 400}
      />
    </PaginationStyles>
  );
};
export default Pagination;
