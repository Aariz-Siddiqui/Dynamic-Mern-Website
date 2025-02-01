import { useAuth } from "../store/auth";
const Service =()=>{
  const {cardData} = useAuth();
  console.log(cardData[0]);
  return(
    <section className="section-services">
      <div className="container">
          <h1 className="main-heading">Services</h1>
      </div>
      <div className="container grid grid-three-cols">
      {cardData.map((curElem,index)=>{
          const {price,provider,description,service}= curElem;
        return(
          <div className="card" key={index}>
          <div className="card-img">
            <img
              src="/images/design.png"
              alt="our services info"
              width="200"
            />
          </div>

          <div className="card-details">
            <div className="grid grid-two-cols">
              <p>{provider}</p>
              <p>{price}</p>
            </div>
            <h2>{service}</h2>
            <p>{description}</p>
          </div>
        </div>
      );
    })}
  </div>
</section>
        )
}

export default Service;

