import SwiftUI

struct CalibrationView: View {
    let navigate: (AppRoute) -> Void

    @StateObject private var camera = CameraManager()
    @State private var currentStep = 0
    @State private var confidence: Double = 0
    @State private var isCalibrating = false
    @State private var completedSteps: Set<Int> = []

    private let steps = GestureStep.steps
    private var isStepComplete: Bool { completedSteps.contains(currentStep) }
    private var allComplete: Bool { completedSteps.count == steps.count }

    var body: some View {
        ZStack {
            CameraPreviewView(session: camera.session).ignoresSafeArea()
            UnderwaterParticlesView()

            // Hand tracking overlay center
            HandTrackingOverlayView(
                gesture: steps[currentStep].gesture,
                isCalibrating: isCalibrating,
                confidence: confidence
            )

            VStack(spacing: 0) {
                // Header
                VStack(spacing: 4) {
                    Text("GESTURE CALIBRATION")
                        .font(.system(size: 12, weight: .medium))
                        .tracking(5)
                        .foregroundColor(.white.opacity(0.85))
                    Text("Train your underwater gestures")
                        .font(.depthMono(10))
                        .foregroundColor(.white.opacity(0.28))
                }
                .padding(.top, 60)

                // Step dots
                HStack(spacing: 10) {
                    ForEach(steps) { step in
                        stepDot(index: step.id)
                    }
                }
                .padding(.top, 16)

                Spacer()

                // Current gesture info
                VStack(spacing: 6) {
                    Image(systemName: steps[currentStep].symbol)
                        .font(.system(size: 28, weight: .thin))
                        .foregroundColor(.white.opacity(0.7))

                    Text(steps[currentStep].label.uppercased())
                        .font(.system(size: 16, weight: .light))
                        .tracking(4)
                        .foregroundColor(.white.opacity(0.9))

                    Text(steps[currentStep].action)
                        .font(.depthMono(10))
                        .foregroundColor(.depthCyan.opacity(0.6))
                        .tracking(2)
                }
                .padding(.bottom, 8)

                Spacer()

                // Confidence bar
                if isCalibrating || isStepComplete {
                    confidenceBar
                        .padding(.horizontal, 48)
                        .padding(.bottom, 16)
                }

                // Footer buttons
                footerButtons
                    .padding(.horizontal, 32)
                    .padding(.bottom, 44)
            }
        }
        .onAppear { camera.startSession() }
        .onDisappear { camera.stopSession() }
    }

    // MARK: - Confidence bar

    private var confidenceBar: some View {
        VStack(spacing: 6) {
            GeometryReader { geo in
                ZStack(alignment: .leading) {
                    Capsule().fill(Color.white.opacity(0.08)).frame(height: 3)
                    Capsule()
                        .fill(confidence >= 100 ? Color(hex: "#34D399") : Color.depthCyan)
                        .frame(width: geo.size.width * min(confidence / 100, 1), height: 3)
                        .animation(.easeOut(duration: 0.15), value: confidence)
                }
            }
            .frame(height: 3)

            Text(String(format: "%.0f%%", min(confidence, 100)))
                .font(.depthMono(9))
                .foregroundColor(.white.opacity(0.35))
        }
    }

    // MARK: - Footer buttons

    @ViewBuilder
    private var footerButtons: some View {
        if allComplete {
            Button { navigate(to: .preparation) } label: {
                primaryLabel("ALL GESTURES CALIBRATED  →")
            }
        } else if isStepComplete {
            HStack(spacing: 12) {
                Button { handleRetry() } label: {
                    secondaryLabel("RETRY")
                }
                Button { handleContinue() } label: {
                    primaryLabel(currentStep == steps.count - 1 ? "FINISH" : "NEXT GESTURE")
                }
            }
        } else if isCalibrating {
            Button { } label: {
                secondaryLabel("SCANNING...")
            }
            .disabled(true)
        } else {
            Button { handleStart() } label: {
                primaryLabel("START CALIBRATION")
            }
        }
    }

    private func primaryLabel(_ text: String) -> some View {
        Text(text)
            .font(.system(size: 12, weight: .medium))
            .tracking(3)
            .foregroundColor(.depthBackground)
            .frame(maxWidth: .infinity)
            .padding(.vertical, 16)
            .background(Color.depthCyan)
            .clipShape(RoundedRectangle(cornerRadius: 12, style: .continuous))
    }

    private func secondaryLabel(_ text: String) -> some View {
        Text(text)
            .font(.system(size: 12, weight: .medium))
            .tracking(3)
            .foregroundColor(.white.opacity(0.5))
            .frame(maxWidth: .infinity)
            .padding(.vertical, 16)
            .background(Color.white.opacity(0.05))
            .clipShape(RoundedRectangle(cornerRadius: 12, style: .continuous))
    }

    private func stepDot(index: Int) -> some View {
        let done = completedSteps.contains(index)
        let current = index == currentStep
        return Circle()
            .fill(done ? Color(hex: "#34D399") : (current ? Color.depthCyan : Color.white.opacity(0.15)))
            .frame(width: current ? 8 : 6, height: current ? 8 : 6)
            .animation(.spring(), value: currentStep)
    }

    // MARK: - Actions

    private func handleStart() {
        isCalibrating = true
        confidence = 0
        simulateCalibration()
    }

    private func handleContinue() {
        guard currentStep < steps.count - 1 else { return }
        currentStep += 1
        confidence = 0
    }

    private func handleRetry() {
        completedSteps.remove(currentStep)
        confidence = 0
    }

    private func simulateCalibration() {
        Timer.scheduledTimer(withTimeInterval: 0.2, repeats: true) { timer in
            confidence = min(confidence + Double.random(in: 5...15), 100)
            if confidence >= 100 {
                timer.invalidate()
                completedSteps.insert(currentStep)
                isCalibrating = false
            }
        }
    }
}
