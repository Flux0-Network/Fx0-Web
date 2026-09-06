/**
 * Canonical parameter table copied from front/fft-ocean-1 DEFAULT_SETTINGS,
 * settings constants, uniform-packing, and bloom-pass.
 */
export const OCEAN_TUNING = {
  simulation: {
    oceanSize: 200,
    worldSize: 400,
    timeScale: 0.6,
    spectrumTimeScale: 0.5,
    windSpeed: 14.0,
    windAngle: 4.83,
    amplitude: 2.2,
    choppiness: 1.6,
    displacementScale: 0.005,
    foamThreshold: 0,
  },
  particles: {
    pointSize: 2.0,
    fadeNear: 40,
    fadeFar: 280,
    fadePower: 2.0,
    oceanColor: [0.005, 0.045, 0.16, 0] as const,
    neonColor: [0.35, 0.85, 1.0, 0] as const,
    foamColor: [0.8, 0.95, 1.0, 0] as const,
  },
  camera: {
    eye: [0, 30, 90] as const,
    target: [0, 5, 55] as const,
    pitchDegrees: -10,
    fovDegrees: 90,
    near: 0.1,
    far: 2000,
  },
  bloom: {
    threshold: 0.08,
    smoothWidth: 0.01,
    strength: 0.55,
    radius: 0.55,
    levels: 5,
    kernelRadii: [6, 10, 14, 18, 22] as const,
  },
} as const;

/** Matches front's `gaussianCoefficients`: sigma=radius/3, no normalization pass. */
export function gaussianCoefficients(kernelRadius: number): readonly number[] {
  return Array.from({ length: 24 }, (_, index) =>
    index < kernelRadius
      ? (0.39894 * Math.exp((-0.5 * index * index) / (kernelRadius / 3) ** 2)) /
        (kernelRadius / 3)
      : 0
  );
}
