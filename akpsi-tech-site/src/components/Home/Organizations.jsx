import React from 'react';
import '../../styles/Home/Organizations.css';
import LogoPhysics from '../LogoPhysics';
import accenture from '../../assets/organization_logos/accenture.svg.png';
import amazon from '../../assets/organization_logos/amazon.png';
import capitalOne from '../../assets/organization_logos/capital_one.png';
import coinbase from '../../assets/organization_logos/coinbase.png';
import deloitte from '../../assets/organization_logos/deloitte.png';
import ey from '../../assets/organization_logos/ey.png';
import flagship from '../../assets/organization_logos/flagship.png';
import girlsWhoInvest from '../../assets/organization_logos/girls_who_invest.png';
import jpMorgan from '../../assets/organization_logos/jp_morgan.png';
import kpmg from '../../assets/organization_logos/kpmg.svg';
import leidos from '../../assets/organization_logos/leidos.svg.png';
import meta from '../../assets/organization_logos/meta.png';
import northropGrumman from '../../assets/organization_logos/northrop_grumman.png';
import trillium from '../../assets/organization_logos/trillium.png';
import uber from '../../assets/organization_logos/uber.jpg';
import walkerDunlop from '../../assets/organization_logos/walker_dunlop.png';
import wellsFargo from '../../assets/organization_logos/wells_fargo.png';
const Organizations = () => {
  const orgLogos = [
    accenture,
    amazon,
    capitalOne,
    coinbase,
    deloitte,
    ey,
    flagship,
    girlsWhoInvest,
    jpMorgan,
    kpmg,
    leidos,
    meta,
    northropGrumman,
    trillium,
    uber,
    walkerDunlop,
    wellsFargo,
  ];
  return (
    <section className="organizations">
      <LogoPhysics logos={orgLogos} />
    </section>
  );
};
export default Organizations;









