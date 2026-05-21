import SwiftUI

enum GestureStatus {
    case active, detected, locked
}

struct GestureFeedbackView: View {
    let status: GestureStatus
    var holdProgress: Double = 0   // 0.0 → 1.0, drives the progress arc

    @State private var pulseRing = false
    @State private var confirmed = false

    var body: some View {
        VStack(spacing: 8) {
            ZStack {
                // Ambient pulse ring (active state only)
                if status == .active {
                    Circle()
                        .stroke(ringColor.opacity(0.25), lineWidth: 1)
                        .frame(width: 88, height: 88)
                        .scaleEffect(pulseRing ? 1.7 : 1.0)
                        .opacity(pulseRing ? 0 : 0.5)
                        .animation(
                            .easeOut(duration: 1.4).repeatForever(autoreverses: false),
                            value: pulseRing
                        )
                }

                // Hold-to-confirm progress arc
                if holdProgress > 0 {
                    // Background track
                    Circle()
                        .stroke(ringColor.opacity(0.12), lineWidth: 3)
                        .frame(width: 72, height: 72)

                    // Filled arc — rotated so it starts at the top
                    Circle()
                        .trim(from: 0, to: holdProgress)
                        .stroke(
                            holdProgress >= 1.0 ? Color.green : ringColor,
                            style: StrokeStyle(lineWidth: 3, lineCap: .round)
                        )
                        .frame(width: 72, height: 72)
                        .rotationEffect(.degrees(-90))
                        .animation(.linear(duration: 0.05), value: holdProgress)

                    // Countdown label inside arc
                    let secondsLeft = max(0, Int(ceil(2.0 * (1.0 - holdProgress))))
                    if secondsLeft > 0 {
                        Text("\(secondsLeft)")
                            .font(.depthMono(10))
                            .foregroundColor(ringColor.opacity(0.6))
                            .offset(y: 34)
                    }
                }

                // Flash ring on confirm
                if confirmed {
                    Circle()
                        .stroke(Color.green.opacity(0.6), lineWidth: 2)
                        .frame(width: 72, height: 72)
                        .scaleEffect(confirmed ? 1.5 : 1.0)
                        .opacity(confirmed ? 0 : 0.8)
                        .animation(.easeOut(duration: 0.5), value: confirmed)
                }

                // Icon circle
                Circle()
                    .fill(ringColor.opacity(holdProgress > 0 ? 0.14 : 0.08))
                    .frame(width: 52, height: 52)
                    .overlay(Circle().stroke(ringColor.opacity(0.4), lineWidth: 1))

                Image(systemName: statusSymbol)
                    .font(.system(size: 18, weight: .light))
                    .foregroundColor(ringColor)
                    .scaleEffect(confirmed ? 1.2 : 1.0)
                    .animation(.spring(response: 0.2), value: confirmed)
            }
            .frame(width: 88, height: 88)

            // Label
            Text(statusLabel)
                .font(.depthMono(9))
                .foregroundColor(ringColor.opacity(0.7))
                .tracking(2)
        }
        .onAppear { pulseRing = true }
        .onChange(of: holdProgress) { _, newVal in
            if newVal >= 1.0 {
                withAnimation { confirmed = true }
                DispatchQueue.main.asyncAfter(deadline: .now() + 0.5) {
                    confirmed = false
                }
            }
        }
    }

    // MARK: - Style helpers

    private var ringColor: Color {
        if holdProgress >= 1.0     { return .green }
        switch status {
        case .active:              return .depthCyan
        case .detected:            return .depthCyan
        case .locked:              return Color(hex: "#FBBF24")
        }
    }

    private var statusSymbol: String {
        switch status {
        case .active:   return "hand.raised"
        case .detected: return "hand.raised.fill"
        case .locked:   return "lock.fill"
        }
    }

    private var statusLabel: String {
        if holdProgress > 0 && holdProgress < 1.0 { return "HOLD TO CONFIRM" }
        if holdProgress >= 1.0                    { return "CONFIRMED" }
        switch status {
        case .active:   return "GESTURE READY"
        case .detected: return "HOLD TO CONFIRM"
        case .locked:   return "CONTROLS LOCKED"
        }
    }
}
