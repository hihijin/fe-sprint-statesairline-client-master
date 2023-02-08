import Flight from './Flight';

//list 인자가 들어오지 않았을 경우, undefined가 되므로 default value로 빈배열을 부여, 값이 없으므로 length=0
function FlightList({ list = [] }) {
  if (list.length === 0) {
    return <div className="merge-col">목록이 없습니다</div>;
  }

  return list.map(
    ({ uuid, departure, destination, departure_times, arrival_times }) => {
      return (
        <Flight
          key={uuid}
          departure={departure}
          destination={destination}
          departureTimes={departure_times}
          arrivalTimes={arrival_times}
        />
      );
    }
  );
}

export default FlightList;
