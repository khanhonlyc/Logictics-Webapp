import React, { useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLocationDot } from '@fortawesome/free-solid-svg-icons';
import { END_POINT } from '../../../../utils/constant';
export default function Location({data,search,location}) {
	
	return (
		<div className="px-[22px] md:px-[40px] py-[44px]">
			<div x-show="service1 =='mn'">
				<div className="grid   grid-cols-2  lg:grid-cols-4  lg:gap-y-[30px]">
					{
					
				
				data.map((p) => (
						<div className="flex items-center justify-center py-[16px]  lg:py-0 " key={p._id}>
							<a
								className="text-lg font-normal text-[#232323]"
							/* 	href={`${/api/p.file}`} */
							 	href={`/${p.file}`} 
								target="_blank"
								rel="noreferrer"
							>
								<FontAwesomeIcon
									icon={faLocationDot}
									className="text-[#ffbb0f]"
								/>
								<span className="ml-2">{p.province}</span>
							</a>
						</div>
					))}
				</div>
			</div>
			<div x-show="service1 =='mb'" style={{ display: 'none' }}>
				<div className="grid grid-cols-1  lg:grid-cols-4  lg:gap-y-[30px]"></div>
			</div>
		</div>
	);
}
