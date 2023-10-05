import { ConnectButton } from '@rainbow-me/rainbowkit';
import {styles} from './style/style';
import { 
	useTimeDividendEthTotalSupply
} from './generated';

import { useNetwork } from "wagmi";
import { useState, useEffect } from "react";

export default function ContractCall() {

	const { chain: selectedChain } = useNetwork()

	const [totalSupplyFormatedData, setTotalSupplyFormatedData] = useState('0');
	const { data: totalSupplyReturnedData } = useTimeDividendEthTotalSupply({
	});	  
	useEffect(() => {
		if (totalSupplyReturnedData) {
			let temp = totalSupplyReturnedData;
			let calcTotalSupply = parseInt(formatBigNumber(temp, 18));
			setTotalSupplyFormatedData(calcTotalSupply.toString());
		}
	},[totalSupplyReturnedData]);

	function formatBigNumber(bigNumber: bigint, precision: number ) {
		let bigNumber_wip = bigNumber.toString();
		const bigNoLen = bigNumber_wip.length;  
			if (bigNoLen <= precision) {
				let addZeros = '0.' 
				for(let i = 0; i < (precision - bigNoLen); i++) {addZeros = addZeros + '0';};
				bigNumber_wip = addZeros + bigNumber_wip;	
			} else {
				bigNumber_wip = bigNumber_wip.substring(0,(bigNoLen - precision)) + '.' 
				+ bigNumber_wip.substring((bigNoLen - precision), (bigNoLen)); 
			}
			 
			return bigNumber_wip;
	}
	 


  return (
  	<styles.Container>

		<ConnectButton />
	  	<styles.BannerTitle>Contract Call</styles.BannerTitle>
    	<styles.TimeFeeRow>
			<styles.TimeFeeRowEnds>
			
				<styles.TimeFeeRowTitle>Total Burned</styles.TimeFeeRowTitle>
			</styles.TimeFeeRowEnds>
			<styles.TimeFeeRowEnds>
				<styles.TimeFeeRowValue value={totalSupplyFormatedData?.toString()} />

			</styles.TimeFeeRowEnds>
		</styles.TimeFeeRow>
 	</styles.Container>
  )
}