import SwiftUI

private struct Particle: Identifiable {
    let id = UUID()
    var x: CGFloat
    var y: CGFloat
    let size: CGFloat
    let opacity: Double
    let speed: Double
    let drift: CGFloat
}

struct UnderwaterParticlesView: View {
    @State private var particles: [Particle] = []
    @State private var animating = false

    private let count = 30

    var body: some View {
        GeometryReader { geo in
            ZStack {
                ForEach(particles) { p in
                    Circle()
                        .fill(Color.depthCyan.opacity(p.opacity))
                        .frame(width: p.size, height: p.size)
                        .position(
                            x: p.x * geo.size.width + (animating ? p.drift : 0),
                            y: animating
                                ? -20
                                : p.y * geo.size.height
                        )
                        .animation(
                            .linear(duration: p.speed)
                            .repeatForever(autoreverses: false)
                            .delay(p.speed * p.y * 0.5),
                            value: animating
                        )
                }
            }
        }
        .allowsHitTesting(false)
        .onAppear {
            particles = (0..<count).map { _ in
                Particle(
                    x: CGFloat.random(in: 0...1),
                    y: CGFloat.random(in: 0...1),
                    size: CGFloat.random(in: 1...3),
                    opacity: Double.random(in: 0.03...0.15),
                    speed: Double.random(in: 6...18),
                    drift: CGFloat.random(in: -20...20)
                )
            }
            animating = true
        }
    }
}
