import { Link } from "react-router-dom"

function JetSkiCard({jetSki}) {
  return (
    <Link to={`/jet-ski/${jetSki._id}`}>
      <div className="jetski-card">
        
        {jetSki.images.length > 0 && (
          <img src={jetSki.images[0]} alt={jetSki.name} />
        )}
        <h3>{jetSki.name}</h3>
        {/* <p>{jetSki.description}</p> */}
        <p>{jetSki.price} €</p>

      </div>
    </Link>
    
  )
}

export default JetSkiCard