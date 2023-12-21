//eslint-disable-next-line
//@ts-nocheck
import React, { useRef } from 'react';

import SignatureCanvas from 'react-signature-canvas';
import { FaArrowLeft } from 'react-icons/fa';
import { useAuth } from '@/hooks/useAuth';
import url from '@/utils/url';

const Signature = () => {
  const student_id = sessionStorage.getItem('student_id');
  const { getToken } = useAuth();

  const sigCanvasRef = useRef(null);

  const handleSubmit = async () => {
    if (sigCanvasRef.current) {
      const signature = sigCanvasRef.current.getTrimmedCanvas().toDataURL();

      const formData = new FormData();
      formData.append('file', signature);
      formData.append('upload_preset', 'h9l8qww3');
      formData.append('cloud_name', 'dtx6mxhty');

      try {
        fetch('https://api.cloudinary.com/v1_1/dtx6mxhty/image/upload', {
          method: 'POST',
          body: formData
        }).then(async (res) => {
          if (res.ok) {
            const data = await res.json();

            if (data.url) {
              fetch(url(`/attendance/signature/${student_id}`), {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                  Accept: 'application/json',
                  Authorization: `Bearer ${getToken()}`
                },
                body: JSON.stringify({
                  digital_sig_url: data.url
                })
              }).then(async (res) => {
                if (res.ok) {
                  sessionStorage.removeItem('student_id');
                  setTimeout(() => {
                    window.location.href = '/dashboard';
                  }, 1000);
                }
              });
            }
          }
        });
      } catch (err) {
        console.log(err);
      }
    }
  };

  return (
    <div className="sigCanvas font-main p-4">
      <SignatureCanvas
        penColor="black"
        canvasProps={{ width: 500, height: 1000, className: 'sigCanvas' }}
        ref={sigCanvasRef}
        clearOnResize={false}
      />
      <div className="flex gap-2 items-center absolute z-10 top-4 right-4">
        <button
          onClick={() => {
            window.location.href = '/scan';
          }}
        >
          <FaArrowLeft size={20} className="mx-4" />
        </button>
        <button
          className="bg-primary px-2 py-1 rounded-md font-bold text-white"
          onClick={() => {
            if (sigCanvasRef.current) {
              sigCanvasRef.current.clear();
            }
          }}
        >
          Clear Signature
        </button>
        <button
          className="border border-primary px-2 py-1 rounded-md font-bold text-primary"
          onClick={handleSubmit}
        >
          Submit
        </button>
      </div>
      <h1 className="absolute bottom-8 left-8">
        Draw your signature on the screen
      </h1>
    </div>
  );
};

export default Signature;
