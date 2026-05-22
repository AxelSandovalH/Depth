import SwiftUI

struct VideoPreviewView: View {
    let diveId: Int
    let navigate: (AppRoute) -> Void

    @State private var isPlaying = false
    @State private var currentTime: Double = 0
    @State private var showActions = false
    @State private var timer: Timer?

    private let duration: Double = 847 // 14:07
    private var dive: Dive { Dive.samples.first { $0.id == diveId } ?? Dive.samples[0] }

    var body: some View {
        ZStack {
            Color.depthBackground.ignoresSafeArea()
            UnderwaterParticlesView()

            // Cinematic vignette
            ZStack {
                LinearGradient(
                    colors: [Color.depthBackground, .clear, Color.depthBackground.opacity(0.5)],
                    startPoint: .top, endPoint: .bottom
                )
                LinearGradient(
                    colors: [Color.depthBackground.opacity(0.4), .clear, Color.depthBackground.opacity(0.4)],
                    startPoint: .leading, endPoint: .trailing
                )
            }
            .ignoresSafeArea()
            .allowsHitTesting(false)

            // Video placeholder (mid area)
            RoundedRectangle(cornerRadius: 16, style: .continuous)
                .fill(
                    LinearGradient(
                        colors: [Color(hex: "#0a2540"), Color(hex: "#041520")],
                        startPoint: .topLeading, endPoint: .bottomTrailing
                    )
                )
                .overlay(
                    Button { togglePlay() } label: {
                        Image(systemName: isPlaying ? "pause.fill" : "play.fill")
                            .font(.system(size: 32, weight: .light))
                            .foregroundColor(.white.opacity(0.7))
                            .frame(width: 64, height: 64)
                            .background(Color.white.opacity(0.08))
                            .clipShape(Circle())
                    }
                )
                .padding(.horizontal, 20)
                .frame(maxHeight: 260)

            VStack(spacing: 0) {
                // Header
                HStack {
                    Button { navigate(.gallery) } label: {
                        Image(systemName: "chevron.left")
                            .font(.system(size: 16, weight: .light))
                            .foregroundColor(.white.opacity(0.7))
                            .frame(width: 40, height: 40)
                            .background(Color.white.opacity(0.05))
                            .clipShape(Circle())
                    }

                    Spacer()

                    VStack(spacing: 3) {
                        Text(dive.location)
                            .font(.system(size: 13, weight: .medium))
                            .tracking(2)
                            .foregroundColor(.white.opacity(0.9))
                        Text(dive.date)
                            .font(.depthMono(9))
                            .foregroundColor(.white.opacity(0.30))
                    }

                    Spacer()

                    Button { showActions.toggle() } label: {
                        Image(systemName: "square.and.arrow.up")
                            .font(.system(size: 16, weight: .light))
                            .foregroundColor(.white.opacity(0.7))
                            .frame(width: 40, height: 40)
                            .background(Color.white.opacity(0.05))
                            .clipShape(Circle())
                    }
                }
                .padding(.horizontal, 20)
                .padding(.top, 56)

                // Dive meta chips
                HStack(spacing: 8) {
                    metaChip(icon: "arrow.down", value: dive.depth > 0 ? "\(dive.depth)m" : "--")
                    metaChip(icon: "clock", value: dive.duration)
                    metaChip(icon: "internaldrive", value: dive.fileSize)
                }
                .padding(.horizontal, 20)
                .padding(.top, 10)

                Spacer()

                // Enhancement suggestion
                HStack(spacing: 8) {
                    Image(systemName: "wand.and.stars")
                        .font(.system(size: 11))
                        .foregroundColor(.depthCyan)
                    Text("Underwater color enhancement available")
                        .font(.system(size: 10))
                        .foregroundColor(.white.opacity(0.55))
                    Spacer()
                    Text("APPLY")
                        .font(.depthMono(8))
                        .foregroundColor(.depthCyan)
                        .tracking(2)
                }
                .padding(.horizontal, 16)
                .padding(.vertical, 10)
                .background(Color.depthCyan.opacity(0.06))
                .clipShape(RoundedRectangle(cornerRadius: 12, style: .continuous))
                .overlay(RoundedRectangle(cornerRadius: 12, style: .continuous).stroke(Color.depthCyan.opacity(0.18), lineWidth: 0.5))
                .padding(.horizontal, 20)
                .padding(.bottom, 12)

                // Playback controls
                VStack(spacing: 16) {
                    // Timeline
                    VStack(spacing: 6) {
                        Slider(value: $currentTime, in: 0...duration, onEditingChanged: { _ in })
                            .accentColor(.depthCyan)
                            .tint(.depthCyan)

                        HStack {
                            Text(formatTime(currentTime))
                                .font(.depthMono(9))
                                .foregroundColor(.white.opacity(0.35))
                            Spacer()
                            Text(formatTime(duration))
                                .font(.depthMono(9))
                                .foregroundColor(.white.opacity(0.35))
                        }
                    }
                    .padding(.horizontal, 20)

                    // Controls row
                    HStack(spacing: 40) {
                        Button { currentTime = max(0, currentTime - 15) } label: {
                            Image(systemName: "gobackward.15")
                                .font(.system(size: 20, weight: .light))
                                .foregroundColor(.white.opacity(0.6))
                        }

                        Button { togglePlay() } label: {
                            Image(systemName: isPlaying ? "pause.circle.fill" : "play.circle.fill")
                                .font(.system(size: 48, weight: .light))
                                .foregroundColor(.white.opacity(0.9))
                        }

                        Button { currentTime = min(duration, currentTime + 15) } label: {
                            Image(systemName: "goforward.15")
                                .font(.system(size: 20, weight: .light))
                                .foregroundColor(.white.opacity(0.6))
                        }
                    }
                }
                .padding(.bottom, 44)
            }

            // Export actions panel
            if showActions {
                actionsPanel
            }
        }
        .onChange(of: isPlaying) { _, playing in
            if playing {
                timer = Timer.scheduledTimer(withTimeInterval: 1, repeats: true) { _ in
                    if currentTime < duration { currentTime += 1 } else { isPlaying = false }
                }
            } else {
                timer?.invalidate()
            }
        }
    }

    // MARK: - Actions panel

    private var actionsPanel: some View {
        VStack {
            Spacer()
            VStack(spacing: 0) {
                RoundedRectangle(cornerRadius: 2.5)
                    .fill(Color.white.opacity(0.2))
                    .frame(width: 36, height: 4)
                    .padding(.top, 12)
                    .padding(.bottom, 20)

                Text("EXPORT")
                    .font(.depthMono(10))
                    .foregroundColor(.white.opacity(0.4))
                    .tracking(4)
                    .padding(.bottom, 16)

                VStack(spacing: 1) {
                    exportRow(icon: "photo.on.rectangle", label: "Save to Photos")
                    exportRow(icon: "airplayaudio", label: "AirDrop")
                    exportRow(icon: "square.and.arrow.up", label: "Share")
                    exportRow(icon: "trash", label: "Delete", color: .red)
                }
                .clipShape(RoundedRectangle(cornerRadius: 14, style: .continuous))

                Button { showActions = false } label: {
                    Text("Cancel")
                        .font(.system(size: 15, weight: .medium))
                        .foregroundColor(.white.opacity(0.7))
                        .frame(maxWidth: .infinity)
                        .padding(.vertical, 16)
                        .background(Color.white.opacity(0.06))
                        .clipShape(RoundedRectangle(cornerRadius: 14, style: .continuous))
                }
                .padding(.top, 10)
                .padding(.bottom, 34)
            }
            .padding(.horizontal, 16)
            .background(.ultraThinMaterial)
            .clipShape(RoundedRectangle(cornerRadius: 24, style: .continuous))
        }
        .ignoresSafeArea()
        .background(Color.black.opacity(0.5).ignoresSafeArea().onTapGesture { showActions = false })
        .transition(.move(edge: .bottom).combined(with: .opacity))
    }

    private func exportRow(icon: String, label: String, color: Color = .white) -> some View {
        HStack {
            Image(systemName: icon)
                .font(.system(size: 16, weight: .light))
                .foregroundColor(color.opacity(0.7))
                .frame(width: 28)
            Text(label)
                .font(.system(size: 15))
                .foregroundColor(color.opacity(0.9))
            Spacer()
        }
        .padding(.horizontal, 16)
        .padding(.vertical, 14)
        .background(Color.white.opacity(0.04))
    }

    private func metaChip(icon: String, value: String) -> some View {
        HStack(spacing: 5) {
            Image(systemName: icon).font(.system(size: 9)).foregroundColor(.depthCyan.opacity(0.6))
            Text(value).font(.depthMono(9)).foregroundColor(.white.opacity(0.45))
        }
        .padding(.horizontal, 10).padding(.vertical, 5).glassCapsule()
    }

    private func togglePlay() { isPlaying.toggle() }

    private func formatTime(_ t: Double) -> String {
        let m = Int(t) / 60; let s = Int(t) % 60
        return String(format: "%02d:%02d", m, s)
    }
}
