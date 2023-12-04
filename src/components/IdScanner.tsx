//eslint-disable-next-line
//@ts-nocheck
import React, { useState, useEffect, useRef, useCallback } from 'react';
import QrScanner from 'qr-scanner';

const IdScanner: React.FC = () => {
  const scannerRef = useRef<HTMLVideoElement>(null);
  const [studentId, setStudentId] = useState('');

  useEffect(() => {
    let scanner: QrScanner;

    const startScanner = async () => {
      try {
        await QrScanner.hasCamera();

        if (scannerRef.current) {
          scanner = new QrScanner(scannerRef.current, result, {
            preferredCamera: 'environment',
            returnDetailedScanResult: true,
            highlightScanRegion: true,
            maxScansPerSecond: 3,
            /**
             *
             * @param v HTMLVideoElement
             * TODO - Need to fix the scanner region base on the video size which is a full mobile screen
             */
            calculateScanRegion: (v: HTMLVideoElement) => {
              const width = v.offsetWidth;
              const height = v.offsetHeight;
              const scanRegionSize = Math.min(width, height) * 0.2;
              const scanRegion = {
                x: (width - scanRegionSize) / 2,
                y: (height - scanRegionSize) / 2,
                width: scanRegionSize,
                height: scanRegionSize
              };

              return scanRegion;
            }
          });

          scanner.start();
        }
      } catch (err) {
        console.log(err);
        throw new Error('Failed to start scanner');
      }

      return () => {
        if (scanner) scanner.destroy();
      };
    };

    startScanner();
  }, []);

  const result = useCallback((result: string) => {
    setStudentId(result);
  }, []);

  return (
    <div className="w-full h-screen flex justify-center items-center">
      <video
        ref={scannerRef}
        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
        playsInline
      />
    </div>
  );
};

export default IdScanner;
