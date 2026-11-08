registerCalculator({
  id: "abc2",
  icon: "◉",
  title: "ABC/2 Hematoma Volume",
  short: "ABC/2",
  description:
    "Estimates intracerebral hematoma volume from CT dimensions. It offers a rapid bedside volume estimate used in ICH severity assessment and the ICH Score.",
  workflows: ["ich-spontaneous"],
  fields: [
    {
      key: "a",
      label: "A · largest diameter",
      unit: "cm",
      type: "number",
      step: 0.1,
      placeholder: "0.0",
    },
    {
      key: "b",
      label: "B · perpendicular diameter",
      unit: "cm",
      type: "number",
      step: 0.1,
      placeholder: "0.0",
    },
    {
      key: "slices",
      label: "Slices containing hemorrhage",
      type: "number",
      step: 1,
      placeholder: "0",
    },
    {
      key: "thickness",
      label: "Slice thickness",
      unit: "cm",
      type: "number",
      step: 0.1,
      placeholder: "0.5",
    },
  ],
  calculate(v) {
    const a = +v.a || 0,
      b = +v.b || 0,
      slices = +v.slices || 0,
      thickness = +v.thickness || 0;
      
      const valid = a > 0 && b > 0 && slices > 0 && thickness > 0

      const c = slices * thickness

      const volume = valid ? ((a * b * c) / 2) : null;

    CALC_CONTEXT.volume = volume;

    return {
      score: volume > 0 ? volume.toFixed(1) : "—",
      unit: "mL",
      label: volume > 0 ? `C = ${c.toFixed(1)} cm` : "Enter all four measurements",
      interpretation: "Estimated intraparenchymal hematoma volume.",
      details: [
        "Calculated as A × B × C ÷ 2.",
        "Commonly used as the hematoma-volume variable in the ICH Score.",
      ],
      note: "ABC/2 is a rapid estimate, not planimetric measurement; irregular or multilobar hematomas can reduce accuracy.",
    };
  },
});
