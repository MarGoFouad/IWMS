import React from 'react'
import Cards from './Cards'
import Charts from './Charts'
import Request from './Request'
import Recent from './Recent'
export default function Dashboard() {
  return (
    <div className="Container">
      <div className="containers">
        <div className="ca"><Cards /></div>

        <div className="ch"><Charts /></div>

        <div className="re"><Request /></div>

        <div className="ac"><Recent /></div>
      </div>
    </div>
  );
}
