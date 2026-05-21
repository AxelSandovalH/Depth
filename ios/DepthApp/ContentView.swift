import SwiftUI

enum AppRoute: Hashable {
    case home
    case preparation
    case calibration
    case recording
    case gallery
    case videoPreview(id: Int)
}

struct ContentView: View {
    @State private var route: AppRoute = .home

    var body: some View {
        ZStack {
            Color.depthBackground.ignoresSafeArea()

            switch route {
            case .home:
                HomeView(navigate: navigate)
            case .preparation:
                PreparationView(navigate: navigate)
            case .calibration:
                CalibrationView(navigate: navigate)
            case .recording:
                RecordingView(navigate: navigate)
            case .gallery:
                GalleryView(navigate: navigate)
            case .videoPreview(let id):
                VideoPreviewView(diveId: id, navigate: navigate)
            }
        }
        .ignoresSafeArea()
        .persistentSystemOverlays(.hidden)
    }

    func navigate(to newRoute: AppRoute) {
        withAnimation(.easeInOut(duration: 0.4)) {
            route = newRoute
        }
    }
}
