import React from 'react';
import "./pagination.css"

const Pagination = ({ postsPerPage, totalPosts, paginate, prevPage, nextPage, active }) => {
    const pageNumbers = [];
    for(let i=1; i<=Math.ceil(totalPosts/postsPerPage); i++){
        pageNumbers.push(i);
    }
    return (
      <nav style={{display:"inline-block"}}>
        <ul className="pagination">
            <li className="page-item">
                <a onClick={() => prevPage()} className="page-link" href="#"><span className="fa fa-chevron-left"></span></a>
            </li>
            {pageNumbers.map(number => {
                if(active == number)
                    return (
                        <li key={number} className="page-item">
                            <a onClick={() => paginate(number)} href="#list" className="page-link active">
                                {number}
                            </a>
                        </li>
                    );
                return (
                    <li key={number} className="page-item" className="page-item">
                        <a onClick={() => paginate(number)} href="#" className="page-link">
                            {number}
                        </a>
                    </li>
                );
            })}
            <li className="page-item">
                <a onClick={() => nextPage(pageNumbers.length)} className="page-link" href="#"><span className="fa fa-chevron-right"></span></a>
            </li>
        </ul>
      </nav>
    );
};

export default Pagination;