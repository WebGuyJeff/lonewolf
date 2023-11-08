import {
	Motorhome
} from './svg'

/**
 * The save function defines the way in which the different attributes should
 * be combined into the final markup, which is then serialized by the block
 * editor into `post_content`.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-edit-save/#save
 *
 * @return {WPElement} Element to render.
 */
export default function save() {
	return (
		<div id="camperAnimationWrapper">
			<div id="camperAnimation">
				<div id="camperAnimation_stars"></div>
				<div id="camperAnimation_hillRear"></div>
				<div id="camperAnimation_hillFront"></div>
				<div id="camperAnimation_floraRear"></div>
				<div id="camperAnimation_floraMid"></div>
				<div id="camperAnimation_road"></div>
				<div id="camperAnimation_floraFront"></div>
				<div id="camperAnimation_camperSVG">
					<Motorhome />
				</div>
			</div>
		</div>
	)
}
