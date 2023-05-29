import React from 'react';

const flagData = [
  { abbreviation: 'AR', fileName: 'AR.gif' },
  { abbreviation: 'AN', fileName: 'AN.gif' },
  { abbreviation: 'O', fileName: 'O.gif' },
  { abbreviation: 'IB', fileName: 'IB.gif' },
  { abbreviation: 'CN', fileName: 'CN.png' },
  { abbreviation: 'S', fileName: 'S.gif' },
  { abbreviation: 'CL', fileName: 'CL.gif' },
  { abbreviation: 'CM', fileName: 'CM.gif' },
  { abbreviation: 'CT', fileName: 'CT.gif' },
  { abbreviation: 'VC', fileName: 'VC.gif' },
  { abbreviation: 'EX', fileName: 'EX.gif' },
  { abbreviation: 'GA', fileName: 'GA.gif' },
  { abbreviation: 'M', fileName: 'M.gif' },
  { abbreviation: 'MU', fileName: 'MU.gif' },
  { abbreviation: 'NA', fileName: 'NA.gif' },
  { abbreviation: 'PV', fileName: 'PV.gif' },
  { abbreviation: 'LO', fileName: 'LO.png' },
  { abbreviation: 'CE', fileName: 'CE.gif' },
  { abbreviation: 'ML', fileName: 'ML.gif' }
];

export function Card({ data }) {
  const stateAbbreviation = data.regionAbbreviation;
  const flagObject = flagData.find(flag => flag.abbreviation === stateAbbreviation);

  const flagFileName = flagObject ? flagObject.fileName : null;

  const flagImagePath = flagFileName
    ? require(`./flags/${flagFileName}`).default
    : null;

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
