import React from "react"
import { Pagination } from "react-bootstrap"
import { LinkContainer } from "react-router-bootstrap"

function Paginate({ pages, page, keyword = "", isAdmin = false }) {
   if (keyword) {
      keyword = keyword.split("?keyword=")[1].split("&")[0]
   }
   //passing the keyword argument along with page no. from <HomeScreen /> Paginated result based on
   //searched keyword. Or else keyword would reset to '' when pagination button is clicked
   //and it would render Paginated result out of total no. of book pages.

   return (
      pages > 1 && (
         <Pagination bg="primary" variant="dark" expand="lg" collapseOnSelect>
            {[...Array(pages).keys()].map((x) => (
               <LinkContainer to={`/?keyword=${keyword}&page=${x + 1}`} key={x + 1}>
                  <Pagination.Item active={x + 1 === page}>{x + 1}</Pagination.Item>
               </LinkContainer>
            ))}
         </Pagination>
      )
   )
}

export default Paginate
