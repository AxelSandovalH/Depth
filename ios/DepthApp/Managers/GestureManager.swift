import Vision
import AVFoundation

enum DetectedGesture: Equatable {
    case none
    case openHand
    case fist
    case ok
}

final class GestureManager: ObservableObject {

    // Raw — updates every frame (used for UI status indicator)
    @Published var detectedGesture: DetectedGesture = .none
    @Published var confidence: Float = 0

    // Hold progress (0.0 → 1.0) — drives the progress arc
    @Published var holdProgress: Double = 0

    // Confirmed — fires once when hold completes, resets to .none automatically
    @Published var confirmedGesture: DetectedGesture = .none

    /// Seconds the user must hold a gesture to confirm it
    var holdDuration: Double = 2.0

    private let request = VNDetectHumanHandPoseRequest()
    private let sequenceHandler = VNSequenceRequestHandler()

    // Hold tracking (accessed only on main thread)
    private var holdingGesture: DetectedGesture = .none
    private var holdStartTime: Date?
    private var hasConfirmed = false

    init() {
        request.maximumHandCount = 1
    }

    // MARK: - Process frame (called on background queue by CameraManager)

    func process(sampleBuffer: CMSampleBuffer) {
        guard let pixelBuffer = CMSampleBufferGetImageBuffer(sampleBuffer) else { return }
        try? sequenceHandler.perform([request], on: pixelBuffer, orientation: .up)

        let observation = request.results?.first
        let rawGesture: DetectedGesture
        let conf: Float

        if let obs = observation {
            conf = obs.confidence
            rawGesture = conf > 0.7 ? classify(observation: obs) : .none
        } else {
            conf = 0
            rawGesture = .none
        }

        DispatchQueue.main.async { [weak self] in
            self?.updateHold(rawGesture: rawGesture, conf: conf)
        }
    }

    // MARK: - Hold state machine (runs on main thread)

    private func updateHold(rawGesture: DetectedGesture, conf: Float) {
        detectedGesture = rawGesture
        confidence = conf

        if rawGesture == .none {
            // Hand dropped — reset hold
            resetHold()
            return
        }

        if rawGesture != holdingGesture {
            // Different gesture — restart hold
            holdingGesture = rawGesture
            holdStartTime  = Date()
            holdProgress   = 0
            hasConfirmed   = false
            confirmedGesture = .none
            return
        }

        // Same gesture continuing — advance progress
        guard !hasConfirmed, let start = holdStartTime else { return }

        let elapsed = Date().timeIntervalSince(start)
        holdProgress = min(elapsed / holdDuration, 1.0)

        if holdProgress >= 1.0 {
            hasConfirmed     = true
            confirmedGesture = holdingGesture

            // Reset confirmedGesture after a brief moment so onChange can re-trigger next time
            DispatchQueue.main.asyncAfter(deadline: .now() + 0.4) { [weak self] in
                self?.confirmedGesture = .none
                self?.resetHold()
            }
        }
    }

    private func resetHold() {
        holdingGesture = .none
        holdStartTime  = nil
        holdProgress   = 0
        hasConfirmed   = false
    }

    // MARK: - Classification

    private func classify(observation: VNHumanHandPoseObservation) -> DetectedGesture {
        guard let points = try? observation.recognizedPoints(.all) else { return .none }

        let extended = extendedFingers(points: points)

        switch extended {
        case 5:    return .openHand
        case 0, 1: return .fist
        default:
            return isOKGesture(points: points) ? .ok : .none
        }
    }

    private func extendedFingers(
        points: [VNHumanHandPoseObservation.JointName: VNRecognizedPoint]
    ) -> Int {
        let tips: [VNHumanHandPoseObservation.JointName] = [.indexTip, .middleTip, .ringTip, .littleTip]
        let mcps: [VNHumanHandPoseObservation.JointName] = [.indexMCP, .middleMCP, .ringMCP, .littleMCP]
        return zip(tips, mcps).filter { tip, mcp in
            guard let t = points[tip], let m = points[mcp],
                  t.confidence > 0.5, m.confidence > 0.5 else { return false }
            return t.location.y > m.location.y
        }.count
    }

    private func isOKGesture(
        points: [VNHumanHandPoseObservation.JointName: VNRecognizedPoint]
    ) -> Bool {
        guard
            let thumbTip  = points[.thumbTip],
            let indexTip  = points[.indexTip],
            let middleTip = points[.middleTip],
            let middleMCP = points[.middleMCP]
        else { return false }

        let pinchDist = hypot(thumbTip.location.x - indexTip.location.x,
                              thumbTip.location.y - indexTip.location.y)
        return pinchDist < 0.08 && middleTip.location.y > middleMCP.location.y
    }
}
