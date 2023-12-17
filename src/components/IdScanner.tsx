/* eslint-disable react-hooks/exhaustive-deps */
// eslint-disable-next-line
// @ts-nocheck
import React, { useState, useEffect, useRef, useCallback } from 'react';
import beep from '@/assets/beep.mp3';
import QrScanner from 'qr-scanner';
import url from '@/utils/url';
import { toast, Toaster } from 'react-hot-toast';
import axios from 'axios';
import { motion } from 'framer-motion';
import { AiOutlineLoading3Quarters } from 'react-icons/ai';
import { FaArrowLeft } from 'react-icons/fa';

const IdScanner: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const scannerRef = useRef<HTMLVideoElement>(null);
  const [studentId, setStudentId] = useState<string | null>(null);

  useEffect(() => {
    let scanner: QrScanner;

    const startScanner = async () => {
      try {
        if (scannerRef.current) {
          scanner = new QrScanner(scannerRef.current, handleScannedIdResult, {
            preferredCamera: 'environment',
            returnDetailedScanResult: true,
            highlightScanRegion: true,
            maxScansPerSecond: 3,
            calculateScanRegion: (v: HTMLVideoElement) => {
              const heightRegionSize = Math.round(
                0.5 * Math.min(v.videoWidth, v.videoHeight)
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

  const handleScannedIdResult = (result: { data: string }) => {
    if (typeof result.data === 'string') {
      setStudentId(result.data);
    }
  };

  const timeInOrOut = useCallback(async () => {
    const audio = new Audio(beep);
    audio.play();
    setLoading(true);

    // Check regex first
    const regex = /^[0-9]{3}-[0-9]{5}$/;
    if (!regex.test(studentId || '')) {
      setStudentId(null);
      toast.error('Invalid Student ID');
      return;
    }

    try {
      const res = await axios.post(
        url('/attendance/record-time'),
        {
          student_id: studentId,
          admin_id: '211-00111'
        },
        {
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json'
          }
        }
      );

      if (res.data || res.status === 200) {
        toast.success('Successfully recorded time!');
        setLoading(false);
        setTimeout(() => {
          window.location.href = '/dashboard';
        }, 1000);
      }
    } catch (err) {
      toast.error(err?.response?.data?.message);
    } finally {
      setLoading(false);
    }
  }, [studentId]);

  useEffect(() => {
    if (studentId) {
      timeInOrOut();
    }
  }, [studentId, timeInOrOut]);

  return (
    <div className="h-screen">
      <Toaster />
      <div className="h-full w-full">
        <FaArrowLeft className="p-4" />
        <video
          className="rounded-md aspect-video"
          style={{
            height: '100%',
            width: '100%',
            cursor: 'pointer',
            objectFit: 'contain'
          }}
          ref={scannerRef}
        />
        {loading && (
          <span className="flex gap-4 items-center text-black bg-black">
            <motion.div
              animate={{
                rotate: 360
              }}
              transition={{ repeat: Infinity, duration: 0.4, ease: 'linear' }}
            >
              <AiOutlineLoading3Quarters size={15} className="text-black" />
            </motion.div>
          </span>
        )}
      </div>
    </div>
  );
};

export default IdScanner;
