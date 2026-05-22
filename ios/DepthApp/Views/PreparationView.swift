import SwiftUI

struct PreparationView: View {
    let navigate: (AppRoute) -> Void

    @StateObject private var camera = CameraManager()
    @State private var checks = SystemCheck.defaultChecks()
    @State private var allReady = false

    var body: some View {
        ZStack {
            CameraPreviewView(session: camera.session, blurred: true).ignoresSafeArea()
            UnderwaterParticlesView()

            LinearGradient(
                colors: [.black.opacity(0.65), .black.opacity(0.40), .black.opacity(0.72)],
                startPoint: .top,
                endPoint: .bottom
            ).ignoresSafeArea()

            VStack(spacing: 0) {
                // Header
                VStack(spacing: 4) {
                    Text("DIVE PREP")
                        .font(.system(size: 13, weight: .medium))
                        .tracking(6)
                        .foregroundColor(.white.opacity(0.9))

                    Text("System readiness check")
                        .font(.depthMono(10))
                        .foregroundColor(.white.opacity(0.30))
                }
                .padding(.top, 64)

                Spacer()

                // Checks list
                VStack(spacing: 0) {
                    ForEach(checks) { check in
                        CheckRow(check: check)
                        if check.id != checks.last?.id {
                            Divider().background(Color.white.opacity(0.05))
                        }
                    }
                }
                .padding(.horizontal, 32)

                Spacer()

                // Enter Dive Mode button
                Button {
                    navigate(.recording)
                } label: {
                    Text("ENTER DIVE MODE")
                        .font(.system(size: 13, weight: .medium))
                        .tracking(4)
                        .foregroundColor(allReady ? .depthBackground : .white.opacity(0.25))
                        .frame(maxWidth: 280)
                        .padding(.vertical, 18)
                        .background(allReady ? Color.depthCyan : Color.white.opacity(0.04))
                        .clipShape(RoundedRectangle(cornerRadius: 14, style: .continuous))
                }
                .disabled(!allReady)
                .animation(.easeInOut(duration: 0.3), value: allReady)

                // Recalibrate link
                Button { navigate(.calibration) } label: {
                    Text("Recalibrate Gestures")
                        .font(.depthMono(10))
                        .foregroundColor(.white.opacity(0.25))
                        .tracking(2)
                }
                .padding(.top, 16)
                .padding(.bottom, 40)
            }
        }
        .onAppear {
            camera.startSession()
            runChecks()
        }
        .onDisappear { camera.stopSession() }
    }

    private func runChecks() {
        for (i, _) in checks.enumerated() {
            DispatchQueue.main.asyncAfter(deadline: .now() + Double(i) * 0.35 + 0.4) {
                checks[i].status = .ready
            }
        }
        let total = Double(checks.count) * 0.35 + 0.6
        DispatchQueue.main.asyncAfter(deadline: .now() + total) {
            allReady = true
        }
    }
}

// MARK: - Check row

private struct CheckRow: View {
    let check: SystemCheck

    var body: some View {
        HStack {
            Circle()
                .fill(dotColor)
                .frame(width: 6, height: 6)
                .opacity(check.status == .checking ? 0 : 1)
                .overlay(
                    Circle().fill(Color.white.opacity(0.2))
                        .opacity(check.status == .checking ? 1 : 0)
                        .animation(.easeInOut(duration: 0.8).repeatForever(autoreverses: true), value: check.status)
                )

            Image(systemName: iconName)
                .font(.system(size: 13, weight: .light))
                .foregroundColor(labelColor)
                .frame(width: 20)

            Text(check.label)
                .font(.system(size: 11))
                .tracking(1.5)
                .foregroundColor(labelColor)

            Spacer()

            Text(check.status == .checking ? "..." : check.value)
                .font(.depthMono(10))
                .foregroundColor(labelColor.opacity(0.7))
        }
        .padding(.vertical, 11)
        .animation(.easeInOut(duration: 0.4), value: check.status)
    }

    private var dotColor: Color {
        switch check.status {
        case .ready:    return Color(hex: "#34D399")
        case .warning:  return Color(hex: "#FBBF24")
        case .checking: return .clear
        }
    }

    private var labelColor: Color {
        switch check.status {
        case .ready:    return .white.opacity(0.70)
        case .warning:  return Color(hex: "#FBBF24").opacity(0.80)
        case .checking: return .white.opacity(0.25)
        }
    }

    private var iconName: String {
        switch check.id {
        case "battery":       return "battery.75"
        case "storage":       return "internaldrive"
        case "brightness":    return "sun.max"
        case "gesture":       return "hand.raised"
        case "seal":          return "shield.checkered"
        case "temperature":   return "thermometer.medium"
        case "stabilization": return "bolt.fill"
        default:              return "checkmark"
        }
    }
}
