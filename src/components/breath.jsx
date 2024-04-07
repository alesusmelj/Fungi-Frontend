import React, { useState, useEffect } from 'react';
import './bot.css';
import './breath.scss';

function Breath() {

 return (
    <>
    <div class="wrapper">
  <div class="directions">
    <div class="message">Inhale</div>
    <div class="message">Hold</div>
    <div class="message">Exhale</div>
    <div class="message">Hold</div>
  </div>
  <div class="timer inhale">
    <div class="progress"></div>
    <div class="indicators">
      <div class="indicator"></div>
      <div class="indicator"></div>
      <div class="indicator"></div>
      <div class="indicator"></div>
    </div>
  </div>
  <div class="timer inhale-hold">
    <div class="indicators">
      <div class="indicator"></div>
      <div class="indicator"></div>
      <div class="indicator"></div>
      <div class="indicator"></div>
    </div>
  </div>
  <div class="timer exhale">
    <div class="indicators">
      <div class="indicator"></div>
      <div class="indicator"></div>
      <div class="indicator"></div>
      <div class="indicator"></div>
    </div>
  </div>
  <div class="timer exhale-hold">
    <div class="indicators">
      <div class="indicator"></div>
      <div class="indicator"></div>
      <div class="indicator"></div>
      <div class="indicator"></div>
    </div>
  </div>
</div>
    </>
 );
}

export default Breath;
