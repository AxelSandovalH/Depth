import SwiftUI

struct RecordingView: View {
    let navigate: (AppRoute) -> Void

    @StateObject private var camera  = CameraManager()
    @StateObject private var gesture = GestureManager()

    @State private var batteryLevel      = 87
    @State private var storageRemaining  = 42
    @State private var currentDepth: Double = 12.4
    @State private var isLocked          = false
    @State private var flashlightOn      = false
    @State private var recPulse          = false

    // Short cooldown after confirmation fires (GestureManager handles hold protection)
    @State private var gestureCooldown   = false

    // MARK: - Body

    var body: some View {
        ZStack {
            CameraPreviewView(session: camera.session).ignoresSafeArea()
            UnderwaterParticlesView()

            VStack(spacing: 0) {

                // ── Top status bar ──────────────────────────────────────
                HStack(alignment: .center) {
                    recChip
                    Spacer()
                    depthChip
                }
                .padding(.horizontal, 16)
                .padding(.top, 52)

                HStack(spacing: 8) {
                    statChip(icon: "battery.75",   value: "\(batteryLevel)%")
                    statChip(icon: "internaldrive", value: "\(storageRemaining) GB")
                    Spacer()
                    statChip(icon: "hand.raised",  value: gestureStatusLabel)
                }
                .padding(.horizontal, 16)
                .padding(.top, 8)

                Spacer()

                // ── Center gesture feedback ─────────────────────────────
                GestureFeedbackView(
                    status: gestureUIStatus,
                    holdProgress: gesture.holdProgress
                )

                Spacer()

                // ── Bottom controls ─────────────────────────────────────
                if isLocked {
                    lockedBar
                } else {
                    controlsBar
                }
            }
        }
        // Wire camera frames → gesture manager
        .onAppear {
            camera.onFrame = { [weak gesture] buffer in
                gesture?.process(sampleBuffer: buffer)
            }
            camera.startSession()
            recPulse = true
            startDepthSimulation()
        }
        .onDisappear {
            camera.onFrame = nil
            camera.stopRecording()
            camera.stopSession()
        }
        // React only when hold is fully confirmed (not on raw frame-by-frame changes)
        .onChange(of: gesture.confirmedGesture) { _, confirmed in
            guard confirmed != .none else { return }
            handleGesture(confirmed)
        }
    }

    // MARK: - Gesture logic

    private func handleGesture(_ confirmed: DetectedGesture) {
        // Hold-to-confirm already provides the 2s protection.
        // gestureCooldown is just a short guard against the GestureManager
        // firing twice during its own reset window (0.4s).
        guard !gestureCooldown else { return }

        switch confirmed {

        case .openHand:
            // ✋ Start recording (only when stopped and unlocked)
            guard !isLocked, !camera.isRecording else { return }
            camera.startRecording()
            triggerCooldown()

        case .fist:
            // ✊ Stop recording (only when recording and unlocked)
            guard !isLocked, camera.isRecording else { return }
            camera.stopRecording()
            triggerCooldown()

        case .ok:
            // 👌 Toggle lock (always works, even when locked)
            withAnimation(.spring(response: 0.3)) { isLocked.toggle() }
            triggerCooldown()

        case .none:
            break
        }
    }

    private func triggerCooldown() {
        gestureCooldown = true
        DispatchQueue.main.asyncAfter(deadline: .now() + 0.5) {
            gestureCooldown = false
        }
    }

    // MARK: - Derived state

    private var gestureUIStatus: GestureStatus {
        if isLocked                  { return .locked }
        if gesture.holdProgress > 0  { return .detected }   // hold in progress
        return .active
    }

    private var gestureStatusLabel: String {
        if isLocked                     { return "LOCKED" }
        if gesture.holdProgress > 0     { return "HOLDING..." }
        switch gesture.detectedGesture {
        case .openHand: return "OPEN HAND"
        case .fist:     return "FIST"
        case .ok:       return "OK"
        case .none:     return "READY"
        }
    }

    private var formattedTime: String {
        let t = Int(camera.recordingTime)
        return String(format: "%02d:%02d", t / 60, t % 60)
    }

    // MARK: - Sub-views

    private var recChip: some View {
        HStack(spacing: 6) {
            Circle()
                .fill(Color.red)
                .frame(width: 7, height: 7)
                .opacity(recPulse ? 0.3 : 1.0)
                .animation(.easeInOut(duration: 0.8).repeatForever(autoreverses: true), value: recPulse)

            Text(camera.isRecording ? formattedTime : "STANDBY")
                .font(.depthMono(13))
                .foregroundColor(.white.opacity(0.9))
        }
        .padding(.horizontal, 12)
        .padding(.vertical, 7)
        .glassCapsule()
    }

    private var depthChip: some View {
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

    private var controlsBar: some View {
        HStack(spacing: 32) {
            // Lock
            controlButton(icon: "lock.open", color: .white.opacity(0.45), size: 44) {
                withAnimation(.spring(response: 0.3)) { isLocked = true }
            }

            // Start / Stop recording button (manual fallback)
            Button {
                if camera.isRecording { camera.stopRecording() }
                else                  { camera.startRecording() }
            } label: {
                ZStack {
                    Circle()
                        .stroke(Color.red.opacity(0.5), lineWidth: 1.5)
                        .frame(width: 64, height: 64)
                    if camera.isRecording {
                        RoundedRectangle(cornerRadius: 5)
                            .fill(Color.red)
                            .frame(width: 22, height: 22)
                    } else {
                        Circle()
                            .fill(Color.red)
                            .frame(width: 38, height: 38)
                    }
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
    }

    private var lockedBar: some View {
        Button {
            withAnimation(.spring(response: 0.3)) { isLocked = false }
        } label: {
            HStack(spacing: 8) {
                Image(systemName: "lock.fill")
                    .font(.system(size: 12))
                    .foregroundColor(Color(hex: "#FBBF24"))
                Text("CONTROLS LOCKED  —  TAP OR 👌 TO UNLOCK")
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

    // MARK: - Helpers

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

    private func controlButton(icon: String, color: Color, size: CGFloat,
                               action: @escaping () -> Void) -> some View {
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

    private func startDepthSimulation() {
        Timer.scheduledTimer(withTimeInterval: 2, repeats: true) { _ in
            currentDepth = max(0, min(60, currentDepth + Double.random(in: -0.4...0.4)))
        }
    }
}
