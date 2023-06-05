import React from 'react'
import { Pagination } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'

function Paginate({ pages, page, keyword = '', isAdmin = false, bio }) {
    if (keyword) {
        keyword = keyword.split('?keyword=')[1].split('&')[0]
    }

    return (pages > 1 && (
        <Pagination className='justify-content-center my-4'>
        <Pagination.Item>
            <a  href="#" aria-label="Previous">
                <span aria-hidden="true">&laquo;</span>
            </a>                    
        </Pagination.Item>
            {[...Array(pages).keys()].map((x) => (
                <LinkContainer
                    key={x + 1}
                    to={bio ?
                        `/profilelist/?keyword=${keyword}&page=${x + 1}`
                        : `/?keyword=${keyword}&page=${x + 1}`
                    }
                    className='bg-success'>
                    <Pagination.Item active={x + 1 === page} className='bg-success'>{x + 1}</Pagination.Item>
                </LinkContainer>
            ))}
            <Pagination.Item>
                <a  href="#" aria-label="Next">
                <span aria-hidden="true">&raquo;</span>
                </a>                  
            </Pagination.Item>            
        </Pagination>
    )
    )
}

export default Paginate