// import {
//     detectAllFaces,
//     draw,
//     matchDimensions,
//     resizeResults,
// } from 'face-api.js';

// const loadRecognizedFaces = async () => {
//     const resultsQuery = await detectAllFaces(queryImageElement.current)
//         .withFaceLandmarks()
//         .withFaceDescriptors();

//     await matchDimensions(
//         queryCanvasElement.current,
//         queryImageElement.current
//     );

//     const results = await resizeResults(resultsQuery, {
//         width: (queryImageElement.current as HTMLImageElement).width,
//         height: (queryImageElement.current as HTMLImageElement).height,
//     });

//     const queryDrawBoxes = results.map((res) => {
//         const bestMatch = faceMatcher.findBestMatch(res.descriptor);
//         return new draw.DrawBox(res.detection.box, {
//             label: bestMatch.toString(),
//         });
//     });

//     queryDrawBoxes.forEach((drawBox) =>
//         drawBox.draw(queryCanvasElement.current as unknown as HTMLCanvasElement)
//     );
// };