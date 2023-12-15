import React from 'react';
import { MdOutlineQrCodeScanner } from 'react-icons/md';

const NavBar: React.FC = () => {
  const qrScan = () => {
    window.location.href = '/scan';
  };

  return (
    <div className="fixed bottom-0 w-full rounded-t-[40px] bg-primary h-14">
      <div className="grid place-items-center">
        <button onClick={qrScan}>
          <MdOutlineQrCodeScanner
            className="bg-primary text-white border-[8px] border-white rounded-full p-3 relative bottom-10"
            size={80}
          />
        </button>
      </div>
    </div>
  );
};

export default NavBar;
