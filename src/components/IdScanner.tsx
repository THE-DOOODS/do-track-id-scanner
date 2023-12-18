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
import { getCreds } from '@/utils/getCreds';
import logo from '@/assets/logo.png';

const IdScanner: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const scannerRef = useRef<HTMLVideoElement>(null);
  const [studentId, setStudentId] = useState<string | null>(null);
  const { admin_id } = getCreds();

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

    console.log(admin_id);
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
          admin_id: admin_id
        },
        {
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json'
          }
        }
      );

      if (res.data || res.status === 200) {
        toast.success(res?.data?.message);
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
      <div className="flex gap-2 items-center my-4">
        <button
          onClick={() => {
            window.location.href = '/dashboard';
          }}
        >
          <FaArrowLeft size={20} className="mx-4" />
        </button>
        <img src={logo} alt="Logo" className="h-4" />
      </div>
      <div>
        <video
          className="rounded-md aspect-video"
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%'
          }}
          ref={scannerRef}
        />
        <div className="mt-4 grid place-items-center justify-center">
          {loading && (
            <span className="flex gap-4 items-center bg-primary p-4 rounded-md">
              <motion.div
                animate={{
                  rotate: 360
                }}
                transition={{ repeat: Infinity, duration: 0.4, ease: 'linear' }}
              >
                <AiOutlineLoading3Quarters size={15} className="text-white" />
              </motion.div>
              <p className="text-white">{studentId}</p>
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default IdScanner;
