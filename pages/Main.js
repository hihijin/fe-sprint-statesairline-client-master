import {
  useEffect,
  useState,
} from 'react';

import Head from 'next/head';

import { getFlight } from '../api/FlightDataApi';
import Debug from './component/Debug';
import FlightList from './component/FlightList';
import LoadingIndicator from './component/LoadingIndicator';
import Search from './component/Search';

export default function Main() {
  // 항공편 검색 조건을 담고 있는 상태
  const [condition, setCondition] = useState({
    departure: 'ICN',
  });
  const [flightList, setFlightList] = useState(""); //보여지는 항공편목록

  // 주어진 검색 키워드에 따라 condition 상태를 변경시켜주는 함수
  const search = ({ departure, destination }) => {
    if (
      condition.departure !== departure ||
      condition.destination !== destination
    ) {
      console.log('condition 상태를 변경시킵니다');

      // TODO: search 함수가 전달 받아온 '항공편 검색 조건' 인자를 condition 상태에 적절하게 담아보세요.
      setCondition({departure, destination});
    }
  };

/*원래 항공편검색조건에 따른 필터된 항공편목록을 보여줄 필터 함수
  const filterByCondition = (flight) => {
    let pass = true;
    if (condition.departure) {
      pass = pass && flight.departure === condition.departure;
    }
    if (condition.destination) {
      pass = pass && flight.destination === condition.destination;
    }
    return pass;
  };*/

  global.search = search; // 실행에는 전혀 지장이 없지만, 테스트를 위해 필요한 코드입니다. 이 코드는 지우지 마세요!

  // TODO: 더불어, 네트워크 요청이 진행됨을 보여주는 로딩 컴포넌트(<LoadingIndicator/>)를 제공해보세요.
  const [isLoading, setIsLoding] = useState(false);
  
  // TODO: Effeck Hook을 이용해 AJAX 요청을 보내보세요.
  // react 밖에 존재하는 FlightDataAPi서버를 받아야 하니 SideEffect인 useEffect를 사용
  useEffect(() => {
    setIsLoding(true) // list를 받아오기전까지 로딩
    getFlight(condition) // FlightDataApi 서버에서 데이터를 받아옴, 필터가 되고 난 후 json파싱된 값을 받음
    .then(res => {
      setFlightList(res) // setFlightList에 넣어서 flightList를 바꿔줌(필터된 항공편목록을 보여준다)
      //후에 <FlightList list={flightList} />로 자식 컴포넌트(함수)FlightList에게 props로 flightList(항공편목록)을 보낸다.
      setIsLoding(false) // FlightList에서 항공편목록을 보여주면 로딩 중지
    })
  }, [condition])//항공편검색조건이 업데이트될 때마다 함수실행

  // TODO: 테스트 케이스의 지시에 따라 search 함수를 Search 컴포넌트로 내려주세요.
  return (
    <div>
      <Head>
        <title>States Airline</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <h1>여행가고 싶을 땐, States Airline</h1>
        <Search onSearch={search}/>
        <div className="table">
          <div className="row-header">
            <div className="col">출발</div>
            <div className="col">도착</div>
            <div className="col">출발 시각</div>
            <div className="col">도착 시각</div>
            <div className="col"></div>
          </div>
          {isLoading ? <LoadingIndicator /> : <FlightList list={flightList} />}
        </div>

        <div className="debug-area">
          <Debug condition={condition} />
        </div>
        <img id="logo" alt="logo" src="codestates-logo.png" />
      </main>
    </div>
  );
}
