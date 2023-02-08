import fetch from 'node-fetch';

import flightList from '../resource/flightList';

if (typeof window !== "undefined") {
  localStorage.setItem('flight', JSON.stringify(flightList));
}

export function getFlight(filterBy = {}) {
  //filterBy에 condition이 들어감
  //condition = {departure: 'ICN',destination:"BKK"}
  // 필터된 departure, destination 조건에 맞는 airline정보를 fetch로 AJAX 요청
  // 해당 주소에서 데이터를 받아 json화 시키고 리턴
  return fetch(`http://ec2-13-124-90-231.ap-northeast-2.compute.amazonaws.com:81/flight?departure=ICN&destination=${filterBy.destination}`)
  .then(response => response.json())
}