import SwiftUI

private enum GalleryFilter: String, CaseIterable {
    case all     = "ALL"
    case recent  = "RECENT"
    case longest = "LONGEST"
}

struct GalleryView: View {
    let navigate: (AppRoute) -> Void

    @State private var filter: GalleryFilter = .all

    private var dives: [Dive] {
        switch filter {
        case .all:     return Dive.samples
        case .recent:  return Array(Dive.samples.prefix(3))
        case .longest: return Dive.samples.sorted { $0.duration > $1.duration }
        }
    }

    // Cinematic underwater thumbnail gradients
    private let gradients: [(Color, Color)] = [
        (Color(hex: "#0a2540"), Color(hex: "#041520")),
        (Color(hex: "#071826"), Color(hex: "#051a2a")),
        (Color(hex: "#0B2239"), Color(hex: "#061525")),
        (Color(hex: "#082030"), Color(hex: "#040f18")),
        (Color(hex: "#0a2845"), Color(hex: "#051820")),
        (Color(hex: "#061525"), Color(hex: "#031015")),
    ]

    var body: some View {
        ZStack {
            Color.depthBackground.ignoresSafeArea()
            UnderwaterParticlesView()

            // Gradient fade top/bottom
            VStack {
                LinearGradient(colors: [Color.depthBackground, .clear], startPoint: .top, endPoint: .bottom)
                    .frame(height: 120)
                Spacer()
                LinearGradient(colors: [.clear, Color.depthBackground], startPoint: .top, endPoint: .bottom)
                    .frame(height: 100)
            }
            .ignoresSafeArea()
            .allowsHitTesting(false)

            VStack(spacing: 0) {
                // Header
                VStack(spacing: 12) {
                    HStack {
                        VStack(alignment: .leading, spacing: 3) {
                            Text("DIVES")
                                .font(.system(size: 22, weight: .thin))
                                .tracking(8)
                                .foregroundColor(.white.opacity(0.9))
                            Text("\(Dive.samples.count) SESSIONS")
                                .font(.depthMono(9))
                                .foregroundColor(.white.opacity(0.28))
                                .tracking(2)
                        }
                        Spacer()
                        Button { navigate(to: .home) } label: {
                            Image(systemName: "house")
                                .font(.system(size: 18, weight: .light))
                                .foregroundColor(.white.opacity(0.45))
                                .frame(width: 40, height: 40)
                                .background(Color.white.opacity(0.05))
                                .clipShape(Circle())
                        }
                    }

                    // Filter tabs
                    HStack(spacing: 6) {
                        ForEach(GalleryFilter.allCases, id: \.self) { tab in
                            Button { withAnimation(.spring()) { filter = tab } } label: {
                                Text(tab.rawValue)
                                    .font(.depthMono(9))
                                    .tracking(2)
                                    .foregroundColor(filter == tab ? .depthBackground : .white.opacity(0.35))
                                    .padding(.horizontal, 14)
                                    .padding(.vertical, 7)
                                    .background(filter == tab ? Color.depthCyan : Color.white.opacity(0.05))
                                    .clipShape(Capsule())
                            }
                        }
                        Spacer()
                    }
                }
                .padding(.horizontal, 20)
                .padding(.top, 56)
                .padding(.bottom, 16)

                // Grid
                ScrollView(showsIndicators: false) {
                    LazyVGrid(columns: [GridItem(.flexible(), spacing: 10), GridItem(.flexible(), spacing: 10)], spacing: 10) {
                        ForEach(Array(dives.enumerated()), id: \.element.id) { i, dive in
                            DiveCard(dive: dive, gradient: gradients[i % gradients.count]) {
                                navigate(to: .videoPreview(id: dive.id))
                            }
                        }
                    }
                    .padding(.horizontal, 16)
                    .padding(.bottom, 100)
                }
            }
        }
    }
}

// MARK: - Dive card

private struct DiveCard: View {
    let dive: Dive
    let gradient: (Color, Color)
    let onTap: () -> Void

    @State private var isPressed = false

    var body: some View {
        Button(action: onTap) {
            ZStack {
                // Gradient background
                LinearGradient(colors: [gradient.0, gradient.1], startPoint: .topLeading, endPoint: .bottomTrailing)

                // Caustic shimmer
                Circle()
                    .fill(Color.depthCyan.opacity(0.12))
                    .frame(width: 80, height: 80)
                    .blur(radius: 20)
                    .offset(x: -20, y: -30)

                // Bottom fade
                LinearGradient(colors: [.clear, .black.opacity(0.7)], startPoint: .center, endPoint: .bottom)

                VStack(alignment: .leading, spacing: 0) {
                    // Top badges
                    HStack {
                        // Depth
                        HStack(spacing: 4) {
                            Circle().fill(Color.depthCyan.opacity(0.6)).frame(width: 5, height: 5)
                            Text("\(dive.depth)m")
                                .font(.depthMono(8))
                                .foregroundColor(.depthCyan.opacity(0.8))
                        }
                        Spacer()
                        // Duration
                        Text(dive.duration)
                            .font(.depthMono(9))
                            .foregroundColor(.white.opacity(0.8))
                            .padding(.horizontal, 7)
                            .padding(.vertical, 4)
                            .background(Color.white.opacity(0.08))
                            .clipShape(RoundedRectangle(cornerRadius: 5, style: .continuous))
                    }
                    .padding(10)

                    Spacer()

                    // Play button center
                    Image(systemName: "play.fill")
                        .font(.system(size: 16, weight: .light))
                        .foregroundColor(.white.opacity(0.8))
                        .frame(maxWidth: .infinity)
                        .opacity(isPressed ? 1 : 0)

                    Spacer()

                    // Bottom info
                    VStack(alignment: .leading, spacing: 2) {
                        Text(dive.location)
                            .font(.system(size: 11, weight: .medium))
                            .foregroundColor(.white.opacity(0.9))
                        Text(dive.date)
                            .font(.depthMono(8))
                            .foregroundColor(.white.opacity(0.38))
                    }
                    .padding(10)
                }
            }
            .aspectRatio(4/3, contentMode: .fit)
            .clipShape(RoundedRectangle(cornerRadius: 14, style: .continuous))
            .overlay(
                RoundedRectangle(cornerRadius: 14, style: .continuous)
                    .stroke(Color.white.opacity(0.06), lineWidth: 0.5)
            )
            .scaleEffect(isPressed ? 0.97 : 1.0)
        }
        .buttonStyle(.plain)
        .onLongPressGesture(minimumDuration: 0, pressing: { pressing in
            withAnimation(.spring(response: 0.2)) { isPressed = pressing }
        }, perform: {})
    }
}
