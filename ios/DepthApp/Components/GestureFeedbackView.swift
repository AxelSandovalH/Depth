import SwiftUI

enum GestureStatus {
    case active, detected, locked
}

struct GestureFeedbackView: View {
    let status: GestureStatus

    @State private var ring = false

    var body: some View {
        VStack(spacing: 8) {
            ZStack {
                // Pulse ring
                Circle()
                    .stroke(ringColor.opacity(0.3), lineWidth: 1)
                    .frame(width: 80, height: 80)
                    .scaleEffect(ring ? 1.6 : 1.0)
                    .opacity(ring ? 0 : 0.6)
                    .animation(.easeOut(duration: 1.2).repeatForever(autoreverses: false), value: ring)

                Circle()
                    .fill(ringColor.opacity(0.08))
                    .frame(width: 52, height: 52)
                    .overlay(
                        Circle().stroke(ringColor.opacity(0.4), lineWidth: 1)
                    )

                Image(systemName: statusSymbol)
                    .font(.system(size: 18, weight: .light))
                    .foregroundColor(ringColor)
            }

            Text(statusLabel)
                .font(.depthMono(9))
                .foregroundColor(ringColor.opacity(0.7))
                .tracking(2)
        }
        .onAppear { ring = true }
    }

    private var ringColor: Color {
        switch status {
        case .active:   return .depthCyan
        case .detected: return .green
        case .locked:   return Color(hex: "#FBBF24")
        }
    }

    private var statusSymbol: String {
        switch status {
        case .active:   return "hand.raised"
        case .detected: return "checkmark.circle"
        case .locked:   return "lock.fill"
        }
    }

    private var statusLabel: String {
        switch status {
        case .active:   return "GESTURE ACTIVE"
        case .detected: return "GESTURE DETECTED"
        case .locked:   return "CONTROLS LOCKED"
        }
    }
}
