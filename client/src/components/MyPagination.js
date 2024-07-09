import { Pagination } from "react-bootstrap";

export default function MyPagination({ page, onChangePage, noPages }) {
    const padding = 4;

    const renderPanigationItems = () => {
        let left = Math.max(page - padding, 1);
        let right = Math.min(page + padding, noPages);

        if (left == 1) {
            while (right - left + 1 < 2 * padding + 1 && right < noPages) {
                ++right;
            }
        } else if (right == noPages) {
            while (right - left + 1 < 2 * padding + 1 && left > 1) {
                --left;
            }
        }

        const items = [];
        for (let pageId = left; pageId <= right; pageId++)
            items.push(
                <Pagination.Item
                    key={pageId}
                    active={pageId === page}
                    onClick={() => onChangePage(pageId)}
                >
                    {pageId}
                </Pagination.Item>
            );

        return items;
    };

    return (
        <Pagination>
            <Pagination.First
                onClick={() => onChangePage(1)}
            ></Pagination.First>
            {page > 1 && (
                <Pagination.Prev
                    onClick={() => onChangePage(page - 1)}
                ></Pagination.Prev>
            )}
            {page - padding > 1 && <Pagination.Ellipsis></Pagination.Ellipsis>}
            {renderPanigationItems()}
            {page + padding < noPages && (
                <Pagination.Ellipsis></Pagination.Ellipsis>
            )}
            {page < noPages && (
                <Pagination.Next
                    onClick={() => onChangePage(page + 1)}
                ></Pagination.Next>
            )}
            <Pagination.Last
                onClick={() => onChangePage(noPages)}
            ></Pagination.Last>
        </Pagination>
    );
}
