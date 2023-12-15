/* eslint-disable react-hooks/exhaustive-deps */
//eslint-disable-next-line
//@ts-nocheck
import React, { useState, useEffect, useRef, useCallback } from 'react';
import beep from '@/assets/beep.mp3';
import QrScanner from 'qr-scanner';

const IdScanner: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const scannerRef = useRef<HTMLVideoElement>(null);
  const [studentId, setStudentId] = useState('');

  useEffect(() => {
    let scanner: QrScanner;

    const startScanner = async () => {
      try {
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
              const heightRegionSize = Math.round(
                0.7 * Math.min(v.videoWidth, v.videoHeight)
              );
              const widthRegionSize = Math.round(0.4 * v.videoWidth);

              const region: QrScanner.ScanRegion = {
                x: Math.round((v.videoWidth - widthRegionSize) / 2),
                y: Math.round((v.videoHeight - heightRegionSize) / 2),
                width: widthRegionSize,
                height: heightRegionSize
              };

              return region;
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
    if (/\d{3}-\d{5}/.test(result.data)) {
      setStudentId(result.data);
      timeInOrOut();
    }
    setStudentId(result);
  }, []);

  const timeInOrOut = useCallback(async () => {
    const audio = new Audio(beep);
    audio.play();
    //logic for time in or time out
    setLoading(true);
  }, [studentId]);

  return (
    <div className="h-screen">
      <video
        className="rounded-md border-2 border-slate-800 aspect-video"
        style={{
          height: '100%',
          width: '100%',
          cursor: 'pointer',
          objectFit: 'contain'
        }}
        ref={scannerRef}
      />
      <p className="text-center font-bold">{studentId}</p>
    </div>
  );
};

export default IdScanner;
