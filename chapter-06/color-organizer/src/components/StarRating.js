import PropTypes from 'prop-types'
import Start from './Star'

/** Presentational / Stateless Component: 
*  1. data sent in via props
*  2. data sent out via callbacks
*
* props (with default props) assigned 
* to local args via ES6 destructuring
* assignment...
*
* Spread operator used with Array() constructor
* to create an array containing `totalStars`
* undefined elements...expanded, this would look
* like joe = Array(totalStars);
* moe = [joe[0], joe[1], joe[2], ... joe[totalStars-1]]
*/
const StarRating = ({numStarsSelected=0, totalStars=5, onRate=f=>f}) => 
	<div className="star-rating">
		{[...Array(totalStars)].map((n, i)=>
			<Star key={i}
					selected={i < numStarsSelected}
					onClick={ () => onRate(i+1) } />
		)}
	</div>

StarRating.propTypes = {
	numStarsSelected: PropTypes.number,
	totalStars: PropTypes.number,	
	onRate: PropTypes.func
}

export default StarRating


