"use client";

import { useEffect, useRef } from "react";
import * as faceapi from "face-api.js";

export default function FaceDetection() {
    const videoRef = useRef<HTMLVideoElement>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        async function loadModels() {
            try {
                const MODEL_URL = "/models";
                await Promise.all([
                    faceapi.nets.tinyFaceDetector.loadFromUri(MODEL_URL),
                    faceapi.nets.faceLandmark68Net.loadFromUri(MODEL_URL),
                    faceapi.nets.faceRecognitionNet.loadFromUri(MODEL_URL),
                    faceapi.nets.faceExpressionNet.loadFromUri(MODEL_URL),
                    faceapi.nets.ssdMobilenetv1.loadFromUri(MODEL_URL),
                    faceapi.nets.ageGenderNet.loadFromUri(MODEL_URL)
                ]);
                startVideo();
            } catch (error) {
                console.error("Erro ao carregar modelos:", error);
            }
        }
        loadModels();
    }, []);

    const getDominantExpression = (expressions: faceapi.FaceExpressions) => {
        if (!expressions) return 'unknown';
        const expressionsArray = Object.entries(expressions.asSortedArray());
        const dominantExpression = expressionsArray[0][1];
        return `${dominantExpression?.expression}`;
    };


    const startVideo = () => {
        navigator.mediaDevices
            .getUserMedia({ video: true })
            .then((stream) => {
                if (videoRef.current) {
                    videoRef.current.srcObject = stream;
                }
            })
            .catch((err) => console.error("Erro ao acessar a câmera:", err));
    };


    useEffect(() => {
        const detectFaces = async () => {
            if (!videoRef.current || !canvasRef.current) return;

            const video = videoRef.current;
            const canvas = canvasRef.current;
            const displaySize = { width: video.width, height: video.height };

            faceapi.matchDimensions(canvas, displaySize);

            setInterval(async () => {
                const detections: any = await faceapi
                    .detectAllFaces(video, new faceapi.TinyFaceDetectorOptions())
                    .withFaceLandmarks()
                    .withFaceDescriptors()
                    .withFaceExpressions()
                    .withAgeAndGender();

                const distances = detections.map((detection: any) => {
                    const box = detection.detection.box;
                    const faceWidth = box.width;
                    return Math.round((1000 / faceWidth) * 10);
                });

                const resizedDetections = faceapi.resizeResults(detections, displaySize);
                canvas.getContext("2d")?.clearRect(0, 0, canvas.width, canvas.height);
                faceapi.draw.drawDetections(canvas, resizedDetections);

                resizedDetections.forEach((det: any, i: any) => {
                    const box = det.detection.box;
                    const faceDetail = {
                        age: Math.round(det.age || 0),
                        gender: det.gender,
                        expressions: det.expressions
                    }
                    const textFields = [
                        `Person ${(i + 1).toString().padStart(2, '0')}`,
                        `Distance: ${distances[i]}cm`,
                        `Age: ${faceDetail?.age || '?'}`,
                        `Gender: ${faceDetail?.gender || '?'}`,
                        `Expression: ${getDominantExpression(faceDetail?.expressions) ?? '?'}`
                    ];
                    new faceapi.draw.DrawTextField(
                        textFields,
                        box.bottomLeft
                    ).draw(canvas);
                });
            }, 100);
        };

        detectFaces();
    }, []);

    return (
        <div className="relative w-full h-96">
            <video
                ref={videoRef}
                width={640}
                height={480}
                autoPlay
                muted
                className="w-full h-full object-cover rounded-lg"
            />
            <canvas
                ref={canvasRef}
                width={640}
                height={480}
                className="absolute top-0 left-0 w-full h-full"
            />
        </div>
    );
}

