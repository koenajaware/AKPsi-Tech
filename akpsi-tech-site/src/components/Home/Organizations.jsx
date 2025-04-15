import React from 'react';
import '../../styles/Home/Organizations.css';
import LogoPhysics from '../LogoPhysics';

import accenture from '../../assets/organization_logos/accenture.jpeg';
import amazon from '../../assets/organization_logos/amazon.jpeg';
import appian from '../../assets/organization_logos/appian.png';
import apple from '../../assets/organization_logos/apple.jpeg';
import bloomberg from '../../assets/organization_logos/bloomberg.jpeg';
import bofa from '../../assets/organization_logos/bofa.jpeg';
import capitalOne from '../../assets/organization_logos/capital_one.jpeg';
import coinbase from '../../assets/organization_logos/coinbase.jpeg';
import comcast from '../../assets/organization_logos/comcast.jpeg';
import deloitte from '../../assets/organization_logos/deloitte.jpeg';
import dod from '../../assets/organization_logos/dod.jpeg';
import ey from '../../assets/organization_logos/ey.jpeg';
import fannieMae from '../../assets/organization_logos/fannie_mae.jpeg';
import fti from '../../assets/organization_logos/fti.jpeg';
import goldmanSachs from '../../assets/organization_logos/goldman_sachs.jpeg';
import google from '../../assets/organization_logos/google.jpeg';
import guggenheim from '../../assets/organization_logos/guggenheim.jpeg';
import ibm from '../../assets/organization_logos/ibm.jpeg';
import jpMorgan from '../../assets/organization_logos/jp_morgan.jpeg';
import kpmg from '../../assets/organization_logos/kpmg.jpeg';
import leidos from '../../assets/organization_logos/leidos.jpeg';
import mathworks from '../../assets/organization_logos/mathworks.gif';
import meta from '../../assets/organization_logos/meta.jpeg';
import morganStanley from '../../assets/organization_logos/morgan_stanley.jpeg';
import northropGrumman from '../../assets/organization_logos/northrop_grumman.jpeg';
import pwc from '../../assets/organization_logos/pwc.jpeg';
import salesforce from '../../assets/organization_logos/salesforce.jpeg';
import spotify from '../../assets/organization_logos/spotify.jpeg';
import stripe from '../../assets/organization_logos/stripe.jpeg';
import trillium from '../../assets/organization_logos/trillium.jpeg';
import uber from '../../assets/organization_logos/uber.jpeg';
import walkerDunlop from '../../assets/organization_logos/walker_dunlop.jpeg';
import walmart from '../../assets/organization_logos/walmart.jpeg';
import wellsFargo from '../../assets/organization_logos/wells_fargo.jpeg';

const Organizations = () => {
  const orgLogos = [
    accenture,
    amazon,
    appian,
    apple,
    bloomberg,
    bofa,
    capitalOne,
    coinbase,
    comcast,
    deloitte,
    dod,
    ey,
    fannieMae,
    fti,
    goldmanSachs,
    google,
    guggenheim,
    ibm,
    jpMorgan,
    kpmg,
    leidos,
    mathworks,
    meta,
    morganStanley,
    northropGrumman,
    pwc,
    salesforce,
    spotify,
    stripe,
    trillium,
    uber,
    walkerDunlop,
    walmart,
    wellsFargo,
  ];
  return (
    <section className="organizations">
      <LogoPhysics logos={orgLogos} />
    </section>
  );
};

export default Organizations;