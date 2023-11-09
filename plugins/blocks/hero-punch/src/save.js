import { useBlockProps, InnerBlocks } from '@wordpress/block-editor'
import {
	Clouds,
	DesertFills,
	DesertFurniture,
	DesertSand,
	Fist,
	GrabhandLeft,
	GrabhandRight,
	MeToon,
	Sun,
	Star
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

    const blockProps = useBlockProps.save( {
        className: 'heroPunch',
    } )

	return (
		<section { ...blockProps }>
			<div className='scrollTriggerParent'>
				<div className='scrollTriggerChild'>
					<div className='sectionGrid'>
						<div className='landing_content'>
							<div className='sign '>
								<div className='sign_pinSignTop'>
									<GrabhandLeft />
									<GrabhandRight />
									<div className='star star-2'>
										<Star />
									</div>
								</div>
								<div className='copy'>
									<InnerBlocks.Content />
								</div>
							</div>
							<div className='svgMe_container'>
								<MeToon />
								<div className='star star-1'>
									<Star />
								</div>
							</div>
						</div>
						<div className='landing_backdrop'>
							<DesertFills />
							<Sun />
							<Clouds />
							<div className='desert_terrain'>
								<DesertSand />
								<DesertFurniture />
							</div>
						</div>
					</div>
				</div>
			</div>
			<div className='fist_container'>
				<Fist />
			</div>
		</section>
	)
}
