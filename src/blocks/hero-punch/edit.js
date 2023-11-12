import { __ } from '@wordpress/i18n'
import { useBlockProps, InnerBlocks, InspectorControls } from '@wordpress/block-editor'
import { ToggleControl, PanelBody } from '@wordpress/components'
import { useState } from '@wordpress/element'
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
import './hero-punch-editor.scss'

/**
 * The edit function describes the structure of your block in the context of the
 * editor. This represents what the editor will render when the block is used.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-edit-save/#edit
 *
 * @return {WPElement} Element to render.
 */
export default function Edit() {
	const [ animate, setAnimate ] = useState( true )

	const blockProps = useBlockProps( {
        className: 'heroPunch',
    } )
	
	return (
		<>
			<section {...blockProps}>
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
										<InnerBlocks />
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

			<InspectorControls>
				<PanelBody title={ __( 'Hero Punch Settings' ) }>
					<ToggleControl
						label='Enable Animation'
						help={animate ? 'Yes' : 'No'}
						checked={animate}
						onChange={ ( newAnimate ) => setAnimate( newAnimate ) }
					/>
					{ animate === true && (
						<span>
							{ 'Here are more animation settings' }
						</span>
					) }
				</PanelBody>
			</InspectorControls>
		</>
	)
}
