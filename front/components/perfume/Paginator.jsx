import React, { useState } from "react";
import { useSelector } from "react-redux";
import Pagination from "react-js-pagination";
import { useRouter } from 'next/router';

const Paginator = () => {
    const router = useRouter();
    const path = router.pathname;
    const perfumeList = useSelector((state) => state.perfume.list);

    const { query } = router;
    const page = query.page;

    const [pageState, setPageState] = useState(page);

    if(page != pageState) setPageState(page);

    const pageHandler = (page) => {
        console.log('Paginator.pageHandler');
        setPageState(page);
        query.page = page;
        router.push({
			pathname: path,
			query,
		});
	};

    return (
        <div style={{ display: "flex", width: "100%", justifyContent: "center" }}>
            <Pagination
                activePage={Number(page)}
                itemsCountPerPage={12}
                totalItemsCount={perfumeList.count}
                pageRangeDisplayed={5}
                prevPageText={"‹"}
                nextPageText={"›"}
                onChange={pageHandler}
            />
        </div>
    )
}

export default Paginator
