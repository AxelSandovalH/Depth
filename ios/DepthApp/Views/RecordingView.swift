import SwiftUI

struct RecordingView: View {
    let navigate: (AppRoute) -> Void

    @StateObject private var camera = CameraManager()
    @State private var batteryLevel = 87
    @State private var storageRemaining = 42
    @State private var currentDepth: Double = 12.4
    @State private var gestureStatus: GestureStatus = .active
    @State private var isLocked = false
    @State private var flashlightOn = false
    @State private var recPulse = false

    var body: some View {
        ZStack {
            // Fullscreen live camera
            CameraPreviewView(session: camera.session).ignoresSafeArea()
            UnderwaterParticlesView()

            VStack(spacing: 0) {
                // Top status bar
                HStack(alignment: .center) {
                    // REC + timer
                    HStack(spacing: 6) {
                        Circle()
                            .fill(Color.red)
                            .frame(width: 7, height: 7)
                            .opacity(recPulse ? 0.3 : 1.0)
                            .animation(.easeInOut(duration: 0.8).repeatForever(autoreverses: true), value: recPulse)

                        Text(formattedTime)
                            .font(.depthMono(13))
                            .foregroundColor(.white.opacity(0.9))
                    }
                    .padding(.horizontal, 12)
                    .padding(.vertical, 7)
                    .glassCapsule()

                    Spacer()

                    // Depth
                    HStack(spacing: 4) {
                        Image(systemName: "arrow.down")
                            .font(.system(size: 9, weight: .light))
                            .foregroundColor(.depthCyan.opacity(0.7))
                        Text(String(format: "%.1fm", currentDepth))
                            .font(.depthMono(11))
                            .foregroundColor(.depthCyan.opacity(0.85))
                    }
                    .padding(.horizontal, 10)
                    .padding(.vertical, 6)
                    .glassCapsule()
                }
                .padding(.horizontal, 16)
                .padding(.top, 52)

                // Secondary stats
                HStack(spacing: 8) {
                    statChip(icon: "battery.75", value: "\(batteryLevel)%")
                    statChip(icon: "internaldrive", value: "\(storageRemaining) GB")
                    Spacer()
                    statChip(icon: "hand.raised", value: gestureLabel)
                }
                .padding(.horizontal, 16)
                .padding(.top, 8)

                Spacer()

                // Center gesture feedback
                GestureFeedbackView(status: gestureStatus)

                Spacer()

                // Bottom controls
                if !isLocked {
                    HStack(spacing: 32) {
                        // Lock
                        controlButton(
                            icon: "lock.open",
                            color: .white.opacity(0.45),
                            size: 44
                        ) { isLocked = true }

                        // Emergency stop
                        Button { navigate(to: .home) } label: {
                            ZStack {
                                Circle()
                                    .stroke(Color.red.opacity(0.5), lineWidth: 1.5)
                                    .frame(width: 64, height: 64)
                                RoundedRectangle(cornerRadius: 5)
                                    .fill(Color.red)
                                    .frame(width: 22, height: 22)
                            }
                        }

                        // Flashlight
                        controlButton(
                            icon: flashlightOn ? "flashlight.on.fill" : "flashlight.off.fill",
                            color: flashlightOn ? .depthCyan : .white.opacity(0.45),
                            size: 44
                        ) {
                            flashlightOn.toggle()
                            camera.setTorch(flashlightOn)
                        }
                    }
                    .padding(.bottom, 44)
                } else {
                    // Locked state
                    Button { isLocked = false } label: {
                        HStack(spacing: 8) {
                            Image(systemName: "lock.fill")
                                .font(.system(size: 12))
                                .foregroundColor(Color(hex: "#FBBF24"))
                            Text("CONTROLS LOCKED — HOLD TO UNLOCK")
                                .font(.depthMono(9))
                                .foregroundColor(Color(hex: "#FBBF24").opacity(0.8))
                                .tracking(1.5)
                        }
                        .padding(.horizontal, 16)
                        .padding(.vertical, 10)
                        .glassCapsule()
                    }
                    .padding(.bottom, 44)
                }
            }
        }
        .onAppear {
            camera.startSession()
            camera.startRecording()
            recPulse = true
            startSimulations()
        }
        .onDisappear {
            camera.stopRecording()
            camera.stopSession()
        }
    }

    // MARK: - Helpers

    private var formattedTime: String {
        let t = Int(camera.recordingTime)
        let m = t / 60
        let s = t % 60
        return String(format: "%02d:%02d", m, s)
    }

    private var gestureLabel: String {
        switch gestureStatus {
        case .active:   return "READY"
        case .detected: return "DETECTED"
        case .locked:   return "LOCKED"
        }
    }

    private func statChip(icon: String, value: String) -> some View {
        HStack(spacing: 5) {
            Image(systemName: icon)
                .font(.system(size: 9, weight: .light))
                .foregroundColor(.white.opacity(0.35))
            Text(value)
                .font(.depthMono(9))
                .foregroundColor(.white.opacity(0.40))
        }
        .padding(.horizontal, 9)
        .padding(.vertical, 5)
        .glassCapsule()
    }

    private func controlButton(icon: String, color: Color, size: CGFloat, action: @escaping () -> Void) -> some View {
        Button(action: action) {
            Image(systemName: icon)
                .font(.system(size: 18, weight: .light))
                .foregroundColor(color)
                .frame(width: size, height: size)
                .background(Color.white.opacity(0.05))
                .clipShape(Circle())
                .overlay(Circle().stroke(Color.white.opacity(0.10), lineWidth: 1))
        }
    }

    private func startSimulations() {
        Timer.scheduledTimer(withTimeInterval: 2, repeats: true) { _ in
            currentDepth = max(0, min(60, currentDepth + Double.random(in: -0.4...0.4)))
        }
        Timer.scheduledTimer(withTimeInterval: 5, repeats: true) { _ in
            let statuses: [GestureStatus] = [.active, .detected, .active, .active]
            gestureStatus = statuses.randomElement() ?? .active
        }
    }
}
