import AVFoundation
import SwiftUI

final class CameraManager: NSObject, ObservableObject {
    let session = AVCaptureSession()

    @Published var isRecording = false
    @Published var recordingTime: TimeInterval = 0

    private var videoOutput: AVCaptureMovieFileOutput?
    private var timer: Timer?

    override init() {
        super.init()
        configure()
    }

    // MARK: - Session setup

    private func configure() {
        session.beginConfiguration()
        session.sessionPreset = .hd4K3840x2160

        guard
            let device = AVCaptureDevice.default(.builtInWideAngleCamera, for: .video, position: .back),
            let videoInput = try? AVCaptureDeviceInput(device: device),
            session.canAddInput(videoInput)
        else { session.commitConfiguration(); return }

        session.addInput(videoInput)

        if let micDevice = AVCaptureDevice.default(for: .audio),
           let audioInput = try? AVCaptureDeviceInput(device: micDevice),
           session.canAddInput(audioInput) {
            session.addInput(audioInput)
        }

        let movieOutput = AVCaptureMovieFileOutput()
        if session.canAddOutput(movieOutput) {
            session.addOutput(movieOutput)
            self.videoOutput = movieOutput
        }

        session.commitConfiguration()
    }

    func startSession() {
        guard !session.isRunning else { return }
        DispatchQueue.global(qos: .userInitiated).async { [weak self] in
            self?.session.startRunning()
        }
    }

    func stopSession() {
        guard session.isRunning else { return }
        session.stopRunning()
    }

    // MARK: - Recording

    func startRecording() {
        guard let output = videoOutput, !output.isRecording else { return }

        let fileName = "depth_\(Int(Date().timeIntervalSince1970)).mov"
        let url = FileManager.default.temporaryDirectory.appendingPathComponent(fileName)

        output.startRecording(to: url, recordingDelegate: self)

        DispatchQueue.main.async { [weak self] in
            self?.isRecording = true
            self?.recordingTime = 0
            self?.timer = Timer.scheduledTimer(withTimeInterval: 1, repeats: true) { [weak self] _ in
                self?.recordingTime += 1
            }
        }
    }

    func stopRecording() {
        videoOutput?.stopRecording()
        timer?.invalidate()
        timer = nil
        DispatchQueue.main.async { [weak self] in
            self?.isRecording = false
        }
    }

    // MARK: - Torch

    func setTorch(_ on: Bool) {
        guard let device = AVCaptureDevice.default(for: .video), device.hasTorch else { return }
        try? device.lockForConfiguration()
        device.torchMode = on ? .on : .off
        device.unlockForConfiguration()
    }
}

// MARK: - AVCaptureFileOutputRecordingDelegate

extension CameraManager: AVCaptureFileOutputRecordingDelegate {
    func fileOutput(_ output: AVCaptureFileOutput,
                    didFinishRecordingTo outputFileURL: URL,
                    from connections: [AVCaptureConnection],
                    error: Error?) {
        guard error == nil else { return }
        UISaveVideoAtPathToSavedPhotosAlbum(outputFileURL.path, nil, nil, nil)
    }
}
