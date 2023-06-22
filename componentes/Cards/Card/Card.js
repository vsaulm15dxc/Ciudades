import React from 'react';

import AR from '../../flags/AR.gif';
import AN from '../../flags/AN.gif';
import CE from '../../flags/CE.gif';
import CL from '../../flags/CL.gif';
import CN from '../../flags/CN.png';
import CM from '../../flags/CM.gif';
import CT from '../../flags/CT.gif';
import EX from '../../flags/EX.gif';
import GA from '../../flags/GA.gif';
import IB from '../../flags/IB.gif';
import LO from '../../flags/LO.png';
import M from '../../flags/M.gif';
import ML from '../../flags/ML.gif';
import MU from '../../flags/MU.gif';
import NA from '../../flags/NA.gif';
import O from '../../flags/O.gif';
import PV from '../../flags/PV.gif';
import S from '../../flags/S.gif';
import VC from '../../flags/VC.gif';

const flagData = {
  "AR": {
    "src": AR,
    "alt": "Bandera de Aragón"
  },
  "AN": {
    "src": AN,
    "alt": "Bandera de Andalucía"
  },
  "O": {
    "src": O,
    "alt": "Bandera de Asturias"
  },
  "IB": {
    "src": IB,
    "alt": "Bandera de Baleares"
  },
  "CN": {
    "src": CN,
    "alt": "Bandera de Canarias"
  },
  "S": {
    "src": S,
    "alt": "Bandera de Cantabria"
  },
  "CL": {
    "src": CL,
    "alt": "Bandera de Castilla y León"
  },
  "CM": {
    "src": CM,
    "alt": "Bandera de Castilla la Mancha"
  },
  "CT": {
    "src": CT,
    "alt": "Bandera de Cataluña"
  },
  "VC": {
    "src": VC,
    "alt": "Bandera de Comunitat Valenciana"
  },
  "EX": {
    "src": EX,
    "alt": "Bandera de Extremadura"
  },
  "GA": {
    "src": GA,
    "alt": "Bandera de Galicia"
  },
  "M": {
    "src": M,
    "alt": "Bandera de Madrid"
  },
  "MU": {
    "src": MU,
    "alt": "Bandera de Murcia"
  },
  "NA": {
    "src": NA,
    "alt": "Bandera de Navarra"
  },
  "PV": {
    "src": PV,
    "alt": "Bandera de País Vasco"
  },
  "LO": {
    "src": LO,
    "alt": "Bandera de La Rioja"
  },
  "CE": {
    "src": CE,
    "alt": "Bandera de Ceuta"
  },
  "ML": {
    "src": ML,
    "alt": "Bandera de Melilla"
  }
};

const Card = ({ data }) => {
  const regionAbbreviation = data && data.regionAbbreviation ? data.regionAbbreviation.toUpperCase() : null;
  const flagObject = regionAbbreviation ? flagData[regionAbbreviation] : null;
  const flagImagePath = flagObject ? flagObject.src : null;
  const flagAltText = flagObject ? flagObject.alt : null;

  console.log('Flag Image Path:', flagImagePath); //testing muchos problemas

  return (
    <div className="card">
      <div className="card-content">
        {flagImagePath && (
          <div className="flag-image">
            <img src={flagImagePath} alt={flagAltText} />
          </div>
        )}
        <div className="card-details">
          <h4>Ciudad: {data && data.city}</h4>
          <h4>Comunidad: {data && data.region}</h4>
        </div>
      </div>
    </div>
  );
};

export default Card;
