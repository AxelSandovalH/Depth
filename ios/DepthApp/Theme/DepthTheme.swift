import SwiftUI

// MARK: - Colors

extension Color {
    static let depthBackground = Color(hex: "#040B14")
    static let depthCyan = Color(hex: "#4FD1FF")
    static let depthSurface = Color.white.opacity(0.05)
    static let depthBorder = Color.white.opacity(0.10)

    init(hex: String) {
        let hex = hex.trimmingCharacters(in: CharacterSet.alphanumerics.inverted)
        var int: UInt64 = 0
        Scanner(string: hex).scanHexInt64(&int)
        let a, r, g, b: UInt64
        switch hex.count {
        case 3:  (a, r, g, b) = (255, (int >> 8) * 17, (int >> 4 & 0xF) * 17, (int & 0xF) * 17)
        case 6:  (a, r, g, b) = (255, int >> 16, int >> 8 & 0xFF, int & 0xFF)
        case 8:  (a, r, g, b) = (int >> 24, int >> 16 & 0xFF, int >> 8 & 0xFF, int & 0xFF)
        default: (a, r, g, b) = (255, 0, 0, 0)
        }
        self.init(.sRGB,
                  red: Double(r) / 255,
                  green: Double(g) / 255,
                  blue: Double(b) / 255,
                  opacity: Double(a) / 255)
    }
}

// MARK: - Glass modifier

struct GlassCard: ViewModifier {
    var opacity: Double = 0.08

    func body(content: Content) -> some View {
        content
            .background(Color.white.opacity(opacity))
            .background(.ultraThinMaterial)
            .clipShape(RoundedRectangle(cornerRadius: 16, style: .continuous))
            .overlay(
                RoundedRectangle(cornerRadius: 16, style: .continuous)
                    .stroke(Color.white.opacity(0.10), lineWidth: 0.5)
            )
    }
}

extension View {
    func glassCard(opacity: Double = 0.08) -> some View {
        modifier(GlassCard(opacity: opacity))
    }

    func glassCapsule() -> some View {
        self
            .background(Color.white.opacity(0.06))
            .background(.ultraThinMaterial)
            .clipShape(Capsule())
            .overlay(Capsule().stroke(Color.white.opacity(0.10), lineWidth: 0.5))
    }
}

// MARK: - Typography helpers

extension Font {
    static func depthMono(_ size: CGFloat) -> Font {
        .system(size: size, weight: .regular, design: .monospaced)
    }

    static func depthLight(_ size: CGFloat) -> Font {
        .system(size: size, weight: .light, design: .default)
    }
}
