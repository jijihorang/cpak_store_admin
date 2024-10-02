import {IPageResponse} from "../../types/product.ts";
import {ReactElement} from "react";
import {useSearchParams} from "react-router-dom";

interface Props {
    pageResponse:IPageResponse
}

const makeArr = (from:number, to:number): number[] =>{
    const arr:number[] = []

    for(let i = from; i <= to; i++) {
        arr.push(i)
    }

    return arr
}

function PageComponent({pageResponse}: Props): ReactElement {

    const current: number = pageResponse.current + 1
    const tempLast: number = Math.ceil(current / 10.0) * 10
    const startPage: number = tempLast - 9
    const endPage: number = pageResponse.totalPage < tempLast ? pageResponse.totalPage : tempLast
    const prev:boolean = startPage !== 1
    const next:boolean = pageResponse.totalPage > endPage

    const pageNums:number[] = makeArr(startPage, endPage)

    const [query, setQuery] = useSearchParams()

    const changePage = (pageNum: number) => {

        query.set("page", String(pageNum))
        setQuery(query)

    }

    console.log("pagenums" ,pageNums)

    const lis = pageNums.map(num => <li
        className='px-4 py-2 text-white bg-blue-500 border border-blue-500 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300'
        key={num}
        onClick={() => changePage(num)}
    >
        {num}
    </li>)

    return (
        <div>
            <ul className='flex justify-center items-center space-x-2 mt-6'>

                {prev && <li
                    className='px-4 py-2 text-white bg-blue-500 border border-blue-500 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300'
                    key={startPage - 1}
                    onClick={() => changePage(startPage - 1)}
                >
                    Prev
                </li>}

                {lis}
                {next && <li
                    className='px-4 py-2 text-white bg-blue-500 border border-blue-500 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300'
                    key={endPage + 1}
                    onClick={() => changePage(endPage + 1)}
                >
                    Next
                </li>}

            </ul>
        </div>
    );
}

export default PageComponent;