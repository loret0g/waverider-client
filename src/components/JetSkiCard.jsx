import { Link } from "react-router-dom";

import Button from "react-bootstrap/Button";
import EditJetSkiModal from "./EditJetSkiModal";
import { useState } from "react";

function JetSkiCard({ jetSki, getData, isOwnerView }) {
  return (
    <>
      <div className="jetski-card">
        <Link to={`/jet-ski/${jetSki._id}`}>
          {jetSki.images.length > 0 && (
            <img src={jetSki.images[0]} alt={jetSki.name} />
          )}
          <h3>{jetSki.name}</h3>
          <p>{jetSki.price} €</p>
        </Link>
        {isOwnerView && <EditJetSkiModal jetSki={jetSki} getData={getData} />}
      </div>
    </>
  );
}

export default JetSkiCard;
