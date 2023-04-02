import React from 'react';
import './PrintButton.css';

export function PrintButton() {
  const handlePrint = () => {
    window.print();
  }

  return (
    <div className='container'>
      <button className="print-button" onClick={handlePrint}>
        <b>Print</b>
      </button>
    </div>
  );
}

export default PrintButton;

// import React, { useRef } from 'react';
// import './PrintButton.css';

// export function PrintButton({ dataTableRef }) {
//   const handlePrint = () => {
//     window.print(dataTableRef.current);
//   }

//   return (
//     <div className='container'>
//       <button className="print-button" onClick={handlePrint}>
//         <b>Print Table</b>
//       </button>
//     </div>
//   );
// }

// export default PrintButton;
