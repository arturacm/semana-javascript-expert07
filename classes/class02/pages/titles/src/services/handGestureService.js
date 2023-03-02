import { knownGestures, gestureStrings } from "../utils/gestures.js";

export default class HandGestureService {
  #gestureEstimator;
  #fingerPose;
  #handPoseDetection;
  #handsVersion;
  #detector = null;
  constructor({ fingerPose, handPoseDetection, handsVersion }) {
    this.#gestureEstimator = new fingerPose.GestureEstimator(knownGestures);
    this.#fingerPose = fingerPose;
    this.#handPoseDetection = handPoseDetection;
    this.#handsVersion = handsVersion;
  }

  async estimate(keypoints3D) {
    const predictions = await this.#gestureEstimator.estimate(
      this.#getLandMarksFromKeypoints(keypoints3D),
      9 // 90% de confiança no gesto
    );
    return predictions.gestures;
  }

  async *detectGestures(predictions) {
    for (const hands of predictions) {
      if (!hands.keypoints3D) continue;

      const gestures = await this.estimate(hands.keypoints3D);
      if (!gestures.length) continue;

      const result = gestures.reduce((prev, current) =>
        prev.score > current.score ? prev : current
      );

      const { x, y } = hands.keypoints.find(
        (keypoint) => keypoint.name === "index_finger_tip"
      );

      yield { event: result.name, x, y };

      console.log("detected", gestureStrings[result.name]);
    }
  }

  #getLandMarksFromKeypoints(keypoints3D) {
    return keypoints3D.map((keypoint) => [keypoint.x, keypoint.y, keypoint.z]);
  }

  async estimateHands(video) {
    return this.#detector.estimateHands(video, {
      flipHorizontal: true,
    });
  }

  async initializeDetector() {
    if (this.#detector) return;
    const detectorConfig = {
      runtime: "mediapipe", // or 'tfjs',
      solutionPath: `https://cdn.jsdelivr.net/npm/@mediapipe/hands@${
        this.#handsVersion
      }`,
      modelType: "lite",
      maxHands: 2,
    };
    this.#detector = await this.#handPoseDetection.createDetector(
      this.#handPoseDetection.SupportedModels.MediaPipeHands,
      detectorConfig
    );
    return this.#detector;
  }
}
