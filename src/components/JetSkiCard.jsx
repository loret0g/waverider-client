import { Link } from "react-router-dom";
import StarRatings from 'react-star-ratings';
import EditJetSkiModal from "./modals/EditJetSkiModal";


function JetSkiCard({ jetSki, getData, isOwnerView }) {
  return (
    <>
      <div className="jetski-card">
        <Link to={`/jet-ski/${jetSki._id}`}>
          <div className="jetski-image-container">
            {jetSki.images.length > 0 && (
              <img src={jetSki.images[0]} alt={jetSki.name} />
            )}
            <div className="star-rating">
              <StarRatings
                rating={jetSki.averageRating}
                starRatedColor="gold"
                numberOfStars={5}
                starDimension="15px"
                starSpacing="3px"
              />
            </div>
          </div>
          <p>{jetSki.name} <span>{jetSki.price} €</span></p>
        </Link>
        {isOwnerView && <EditJetSkiModal jetSki={jetSki} getData={getData} />}
      </div>
    </>
  );
}

export default JetSkiCard;
