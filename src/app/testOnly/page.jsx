import React from 'react';
import { ViewReportsComponent } from '@/components/admin-components/viewReports';
import { getAllConfirmedTrades, getAllRejectedTrades } from '../../../actions/tradeActions';
import { getTradesCatamaranAuto, getTradesCatamaranCamioneta, getTradesCatamaranMoto, getTradesCruceroAuto, getTradesCruceroCamioneta, getTradesCruceroMoto, getTradesLanchaAuto, getTradesVeleroAuto,getTradesVeleroCamioneta,getTradesVeleroMoto,getTradesLanchaCamioneta,getTradesLanchaMoto } from '../../../actions/dashboardActions';

const pieData = [
  { name: 'Group A', value: 400 },
  { name: 'Group B', value: 300 },
  { name: 'Group C', value: 300 },
  { name: 'Group D', value: 200 },
  { name: 'Group E', value: 278 },
  { name: 'Group F', value: 189 },
];

const barData = [
  {
    name: 'Page A',
    uv: 4000,
    pv: 2400,
    amt: 2400,
  },
  {
    name: 'Page B',
    uv: 3000,
    pv: 1398,
    amt: 2210,
  },
  {
    name: 'Page C',
    uv: 2000,
    pv: 9800,
    amt: 2290,
  },
  {
    name: 'Page D',
    uv: 2780,
    pv: 3908,
    amt: 2000,
  },
  {
    name: 'Page E',
    uv: 1890,
    pv: 4800,
    amt: 2181,
  },
  {
    name: 'Page F',
    uv: 2390,
    pv: 3800,
    amt: 2500,
  },
  {
    name: 'Page G',
    uv: 3490,
    pv: 4300,
    amt: 2100,
  },
];

async function App () {
  const truequesRealizados = await getAllConfirmedTrades();
  const truequesNoRealizados = await getAllRejectedTrades();

  const valueCatamaranAuto = await getTradesCatamaranAuto();
  const valueCatamaranCamioneta = await getTradesCatamaranCamioneta();
  const valueCatamaranMotocicleta = await getTradesCatamaranMoto();

  const valueCruceroAuto = await getTradesCruceroAuto();
  const valueCruceroCamioneta = await getTradesCruceroCamioneta();
  const valueCruceroMotocicleta = await getTradesCruceroMoto();

  const valueVeleroAuto = await getTradesVeleroAuto();
  const valueVeleroCamioneta = await getTradesVeleroCamioneta();
  const valueVeleroMotocicleta = await getTradesVeleroMoto();

  const valueLanchaAuto = await getTradesLanchaAuto();
  const valueLanchaCamioneta = await getTradesLanchaCamioneta();
  const valueLanchaMotocicleta = await getTradesLanchaMoto();


  console.log(truequesRealizados, truequesNoRealizados);

  const data = [{
    name: "Trueques realizados",
    value: 2,
    fill: '#38C712',
  },
  {name : "Trueques no realizados",
  value: 5,
  fill: '#DF190C',
  }]
  console.log(data)

  const Data2 = [{
    name: "Catamarán - Automóvil",
    value: 2,
    fill: '#2C82FF',
  },
  {name : "Catamarán - Camioneta",
  value: 5,
  fill: '#337DE8',
  },
  {name :"Catamarán - Motocicleta",
  value: 5,
  fill: '#2D6FCD',
  },
  {name :"Crucero - Automóvil",
  value: 5,
  fill: '#36D4FA',
  },
  {name :"Crucero - Camioneta",
  value: 5,
  fill: '#35C0E1',
  },
  {name :"Crucero - Motocicleta",
  value: 5,
  fill: '#2EA3BF',
  },
  {name :"Velero - Automóvil",
  value: 5,
  fill: '#EE8639',
  },
  {name :"Velero - Camioneta",
  value: 5,
  fill: '#DE7E37',
  },
  {name :"Velero - Motocicleta",
  value: 5,
  fill: '#B8682E',
  },
  {name : "Lancha - Automóvil",
  value: 15 ,
  fill: '#B148FA',
  },
  {name : "Lancha - Camioneta",
  value: 5,
  fill: '#903BCB',
  },
  {name : "Lancha - Motocicleta",
  value: 5,
  fill: '#712DA0',
  }]

  return (
    <div>
      <ViewReportsComponent pieDataUno={data} pieDataDos={Data2} />
    </div>
  );
};

export default App;