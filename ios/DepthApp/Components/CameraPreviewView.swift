import SwiftUI
import AVFoundation

struct CameraPreviewView: UIViewRepresentable {
    let session: AVCaptureSession
    var blurred: Bool = false

    func makeUIView(context: Context) -> PreviewUIView {
        let view = PreviewUIView()
        view.session = session
        return view
    }

    func updateUIView(_ uiView: PreviewUIView, context: Context) {
        uiView.previewLayer.connection?.isEnabled = true
        if blurred {
            uiView.blurView.isHidden = false
        } else {
            uiView.blurView.isHidden = true
        }
    }

    // MARK: - UIView subclass

    final class PreviewUIView: UIView {
        var session: AVCaptureSession? {
            didSet { previewLayer.session = session }
        }

        var previewLayer: AVCaptureVideoPreviewLayer {
            layer as! AVCaptureVideoPreviewLayer
        }

        lazy var blurView: UIVisualEffectView = {
            let v = UIVisualEffectView(effect: UIBlurEffect(style: .systemUltraThinMaterialDark))
            v.autoresizingMask = [.flexibleWidth, .flexibleHeight]
            addSubview(v)
            return v
        }()

        override class var layerClass: AnyClass {
            AVCaptureVideoPreviewLayer.self
        }

        override func layoutSubviews() {
            super.layoutSubviews()
            previewLayer.videoGravity = .resizeAspectFill
            blurView.frame = bounds
        }
    }
}
