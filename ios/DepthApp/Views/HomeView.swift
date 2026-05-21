import SwiftUI

struct HomeView: View {
    let navigate: (AppRoute) -> Void

    @StateObject private var camera = CameraManager()
    @State private var pulse = false

    var body: some View {
        ZStack {
            // Fullscreen camera
            CameraPreviewView(session: camera.session, blurred: true)
                .ignoresSafeArea()

            // Underwater particles
            UnderwaterParticlesView()

            // Dark gradient overlay
            LinearGradient(
                colors: [.black.opacity(0.5), .clear, .black.opacity(0.6)],
                startPoint: .top,
                endPoint: .bottom
            )
            .ignoresSafeArea()

            VStack(spacing: 0) {
                // Top status bar
                HStack {
                    statusChip(icon: "hand.raised", label: "GESTURES")
                    Spacer()
                    statusChip(icon: "internaldrive", label: "58 GB")
                    statusChip(icon: "battery.75", label: "87%")
                }
                .padding(.horizontal, 20)
                .padding(.top, 56)

                Spacer()

                // Center branding
                depthBranding

                Spacer()

                // Start Dive button
                Button {
                    navigate(to: .preparation)
                } label: {
                    HStack(spacing: 12) {
                        Circle()
                            .fill(Color.depthCyan)
                            .frame(width: 8, height: 8)
                            .scaleEffect(pulse ? 1.4 : 1.0)
                            .animation(.easeInOut(duration: 1.1).repeatForever(autoreverses: true), value: pulse)

                        Text("START DIVE")
                            .font(.system(size: 14, weight: .medium))
                            .tracking(4)
                            .foregroundColor(.white)
                    }
                    .frame(maxWidth: 260)
                    .padding(.vertical, 18)
                    .background(
                        ZStack {
                            Color.depthCyan.opacity(0.12)
                            RoundedRectangle(cornerRadius: 14, style: .continuous)
                                .stroke(Color.depthCyan.opacity(0.4), lineWidth: 1)
                        }
                    )
                    .clipShape(RoundedRectangle(cornerRadius: 14, style: .continuous))
                }
                .onAppear { pulse = true }

                // Bottom nav icons
                HStack(spacing: 40) {
                    navButton(icon: "gearshape", label: "SETTINGS") {}
                    navButton(icon: "photo.stack", label: "GALLERY") { navigate(to: .gallery) }
                }
                .padding(.top, 24)
                .padding(.bottom, 40)
            }
        }
        .onAppear { camera.startSession() }
        .onDisappear { camera.stopSession() }
    }

    // MARK: - Branding

    private var depthBranding: some View {
        VStack(spacing: 12) {
            ZStack {
                Circle().stroke(Color.white.opacity(0.08), lineWidth: 1).frame(width: 72, height: 72)
                Circle().stroke(Color.white.opacity(0.14), lineWidth: 1).frame(width: 52, height: 52)
                Circle().stroke(Color.white.opacity(0.25), lineWidth: 1).frame(width: 32, height: 32)
                Circle().fill(Color.white.opacity(0.8)).frame(width: 8, height: 8)
                Circle().fill(Color.depthCyan.opacity(0.12)).frame(width: 100, height: 100).blur(radius: 20)
            }

            Text("DEPTH")
                .font(.system(size: 32, weight: .thin))
                .tracking(16)
                .foregroundColor(.white.opacity(0.92))

            Text("UNDERWATER RECORDING")
                .font(.depthMono(9))
                .tracking(4)
                .foregroundColor(.white.opacity(0.28))
        }
    }

    // MARK: - Helpers

    private func statusChip(icon: String, label: String) -> some View {
        HStack(spacing: 5) {
            Image(systemName: icon)
                .font(.system(size: 10))
                .foregroundColor(.depthCyan.opacity(0.7))
            Text(label)
                .font(.depthMono(9))
                .foregroundColor(.white.opacity(0.45))
                .tracking(1)
        }
        .padding(.horizontal, 10)
        .padding(.vertical, 5)
        .glassCapsule()
    }

    private func navButton(icon: String, label: String, action: @escaping () -> Void) -> some View {
        Button(action: action) {
            VStack(spacing: 4) {
                Image(systemName: icon)
                    .font(.system(size: 18, weight: .light))
                    .foregroundColor(.white.opacity(0.45))
                Text(label)
                    .font(.depthMono(7))
                    .foregroundColor(.white.opacity(0.25))
                    .tracking(1.5)
            }
        }
    }
}
