import PropTypes from 'prop-types'
import Color from './Color'
import '../../stylesheets/ColorList.scss'

/* color array passed to ColorList as a property.
*
* Display a message instead of a list of Color's
* if colors array is empty.
*/
const ColorList = ({ colors=[], onRate=f=>f, onRemove=f=>f }) =>
	<div className="color-list">
		{(colors.length === 0)?
			<p>No Colors Listed. (Add a Color)</p> :
			colors.map( color => 
				<Color key={color.id}
					{...color}
					onRate={(rating) => onRate(color.id, rating)}
					onRemove={ () => onRemove(color.id)} />
			)}
	</div>

ColorList.propTypes = {
	color: PropTypes.array,
	onRate: PropTypes.func,
	onRemove: PropTypes.func	
}
