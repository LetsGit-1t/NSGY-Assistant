function calculateABC2Volume(a, b, slices, thickness) {
  const valid =
    Number.isFinite(a) &&
    a > 0 &&
    Number.isFinite(b) &&
    b > 0 &&
    Number.isInteger(slices) &&
    slices > 0 &&
    Number.isFinite(thickness) &&
    thickness > 0;

  if (!valid) {
    return null;
  }

  const c = slices * thickness;

  const volume = (a * b * c) / 2;

  return volume;
}
