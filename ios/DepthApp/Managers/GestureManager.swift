import Vision
import AVFoundation
import Combine

enum DetectedGesture {
    case none
    case openHand
    case fist
    case ok
}

final class GestureManager: ObservableObject {
    @Published var detectedGesture: DetectedGesture = .none
    @Published var confidence: Float = 0

    private let request = VNDetectHumanHandPoseRequest()
    private let sequenceHandler = VNSequenceRequestHandler()

    init() {
        request.maximumHandCount = 1
    }

    // MARK: - Process frame

    func process(sampleBuffer: CMSampleBuffer) {
        guard let pixelBuffer = CMSampleBufferGetImageBuffer(sampleBuffer) else { return }
        try? sequenceHandler.perform([request], on: pixelBuffer, orientation: .up)

        guard let observation = request.results?.first else {
            DispatchQueue.main.async { self.detectedGesture = .none; self.confidence = 0 }
            return
        }

        let gesture = classify(observation: observation)
        let conf = observation.confidence

        DispatchQueue.main.async {
            self.detectedGesture = conf > 0.7 ? gesture : .none
            self.confidence = conf
        }
    }

    // MARK: - Classification

    private func classify(observation: VNHumanHandPoseObservation) -> DetectedGesture {
        guard
            let points = try? observation.recognizedPoints(.all)
        else { return .none }

        let extended = extendedFingers(points: points)

        switch extended {
        case 5:       return .openHand
        case 0, 1:    return .fist
        default:
            if isOKGesture(points: points) { return .ok }
            return .none
        }
    }

    private func extendedFingers(points: [VNHumanHandPoseObservation.JointName: VNRecognizedPoint]) -> Int {
        let tips: [VNHumanHandPoseObservation.JointName] = [.indexTip, .middleTip, .ringTip, .littleTip]
        let mcps: [VNHumanHandPoseObservation.JointName] = [.indexMCP, .middleMCP, .ringMCP, .littleMCP]

        var count = 0
        for (tip, mcp) in zip(tips, mcps) {
            if let t = points[tip], let m = points[mcp], t.confidence > 0.5, m.confidence > 0.5 {
                if t.location.y > m.location.y { count += 1 }
            }
        }
        return count
    }

    private func isOKGesture(points: [VNHumanHandPoseObservation.JointName: VNRecognizedPoint]) -> Bool {
        guard
            let thumbTip   = points[.thumbTip],
            let indexTip   = points[.indexTip],
            let middleTip  = points[.middleTip],
            let middleMCP  = points[.middleMCP]
        else { return false }

        let pinchDist = distance(thumbTip.location, indexTip.location)
        let middleExt = middleTip.location.y > middleMCP.location.y

        return pinchDist < 0.08 && middleExt
    }

    private func distance(_ a: CGPoint, _ b: CGPoint) -> CGFloat {
        sqrt(pow(a.x - b.x, 2) + pow(a.y - b.y, 2))
    }
}
