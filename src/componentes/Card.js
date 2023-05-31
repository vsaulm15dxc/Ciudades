import React from 'react';

import ARFlag from './flags/AR.gif';
import ANFlag from './flags/AN.gif';
import OFlag from './flags/O.gif';
import IBFlag from './flags/IB.gif';
import CNFlag from './flags/CN.png';
import SFlag from './flags/S.gif';
import CLFlag from './flags/CL.gif';
import CMFlag from './flags/CM.gif';
import CTFlag from './flags/CT.gif';
import VCFlag from './flags/VC.gif';
import EXFlag from './flags/EX.gif';
import GAFlag from './flags/GA.gif';
import MFlag from './flags/M.gif';
import MUFlag from './flags/MU.gif';
import NAFlag from './flags/NA.gif';
import PVFlag from './flags/PV.gif';
import LOFlag from './flags/LO.png';
import CEFlag from './flags/CE.gif';
import MLFlag from './flags/ML.gif';

const flagData = [
  { abbreviation: 'AR', fileName: ARFlag },
  { abbreviation: 'AN', fileName: ANFlag },
  { abbreviation: 'O', fileName: OFlag },
  { abbreviation: 'IB', fileName: IBFlag },
  { abbreviation: 'CN', fileName: CNFlag },
  { abbreviation: 'S', fileName: SFlag },
  { abbreviation: 'CL', fileName: CLFlag },
  { abbreviation: 'CM', fileName: CMFlag },
  { abbreviation: 'CT', fileName: CTFlag },
  { abbreviation: 'VC', fileName: VCFlag },
  { abbreviation: 'EX', fileName: EXFlag },
  { abbreviation: 'GA', fileName: GAFlag },
  { abbreviation: 'M', fileName: MFlag },
  { abbreviation: 'MU', fileName: MUFlag },
  { abbreviation: 'NA', fileName: NAFlag },
  { abbreviation: 'PV', fileName: PVFlag },
  { abbreviation: 'LO', fileName: LOFlag },
  { abbreviation: 'CE', fileName: CEFlag },
  { abbreviation: 'ML', fileName: MLFlag },
];



function Card({ data }) {
  const stateAbbreviation = data.regionAbbreviation;
  const flagObject = flagData.find((flag) => flag.abbreviation === stateAbbreviation);
  const flagFileName = flagObject ? flagObject.fileName : null;

  const flagImagePath = flagFileName ? flagFileName : null;

  console.log('flagImagePath:', flagImagePath);

  return (
    <div className="card">
      <div className="card-content">
        {flagImagePath && (
          <div className="flag-image">
            <img src={flagImagePath} alt="Bandera" />
          </div>
        )}
        <div className="card-details">
          <h4>Ciudad: {data.city}</h4>
          <h4>Comunidad: {data.region}</h4>
        </div>
      </div>
    </div>
  );
}

export default Card;