import { useTimeDividendEthTotalSupply } from './generated';

export function App() {
  const { data } = useTimeDividendEthTotalSupply();
  console.log({ data });

  if (!data) return;

  return <>total supply: {data.toString()}</>;
}