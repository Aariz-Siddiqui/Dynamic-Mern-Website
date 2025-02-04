import { useState } from "react";
import { useAuth } from "../store/auth";

const Service = () => {
  const { cardData } = useAuth();

  // Pagination State
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5; // Adjust the number of services per page

  // Calculate total pages
  const totalPages = Math.ceil(cardData.length / itemsPerPage);

  // Get current items for the page
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentItems = cardData.slice(startIndex, startIndex + itemsPerPage);

  // Handle Next Page
  const nextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  // Handle Previous Page
  const prevPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  return (
    <section className="section-services">
      <div className="container">
        <h1 className="main-heading">Services</h1>
      </div>

      {/* Services Grid */}
      <div className="container grid grid-three-cols">
        {currentItems.map((curElem, index) => {
          const { price, provider, description, service } = curElem;
          return (
            <div className="card" key={index}>
              <div className="card-img">
                <img src="/images/design.png" alt="our services info" width="200" />
              </div>

              <div className="card-details">
                <div className="grid grid-two-cols">
                  <p>{provider}</p>
                  <p>${price}</p>
                </div>
                <h2>{service}</h2>
                <p>{description}</p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Pagination Controls */}
      <div className="pagination">
        <button onClick={prevPage} disabled={currentPage === 1}>
          Previous
        </button>
        <span> Page {currentPage} of {totalPages} </span>
        <button onClick={nextPage} disabled={currentPage === totalPages}>
          Next
        </button>
      </div>
    </section>
  );
};

export default Service;
