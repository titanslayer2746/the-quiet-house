export type Service = {
  name: string;
  duration: string;
  price: string;
  description: string;
};

export type ServiceCategory = {
  name: string;
  note?: string;
  services: Service[];
};

export const SERVICE_CATEGORIES: ServiceCategory[] = [
  {
    name: "Hair",
    note: "Cut, colour and finish — never rushed.",
    services: [
      {
        name: "Signature Cut & Style",
        duration: "60 min",
        price: "$95",
        description:
          "A consultation, a considered cut shaped to how you actually wear your hair, and a finish to leave in.",
      },
      {
        name: "Colour & Gloss",
        duration: "120 min",
        price: "$180",
        description:
          "Single-process colour or root refresh, sealed with a glossing treatment for depth and shine.",
      },
      {
        name: "Balayage",
        duration: "180 min",
        price: "$285",
        description:
          "Hand-painted, soft-grown-out lightness, toned and finished with a cut-in blowout.",
      },
      {
        name: "Blowout & Finish",
        duration: "45 min",
        price: "$65",
        description:
          "A wash, a slow blow-dry, and styling — smooth, waved, or set for an evening.",
      },
      {
        name: "Bridal & Occasion Updo",
        duration: "75 min",
        price: "$150",
        description:
          "Softly structured updos and braids, trialled beforehand so the day itself feels calm.",
      },
    ],
  },
  {
    name: "Nails",
    note: "Clean, quiet, long-wearing.",
    services: [
      {
        name: "Classic Manicure",
        duration: "40 min",
        price: "$45",
        description:
          "Shape, cuticle care, a hand massage, and polish in a considered palette.",
      },
      {
        name: "Gel Pedicure",
        duration: "60 min",
        price: "$75",
        description:
          "A warm soak, exfoliation, and a gel finish that holds for weeks.",
      },
    ],
  },
  {
    name: "Skin & Brows",
    note: "Botanical, low-intervention.",
    services: [
      {
        name: "Botanical Facial",
        duration: "50 min",
        price: "$165",
        description:
          "Cold-pressed oils, a gentle gua sha sequence, and a mask drawn from what's in season.",
      },
      {
        name: "Candlelight Facial",
        duration: "75 min",
        price: "$210",
        description:
          "An evening-length ritual: cleanse, steam, extraction if needed, and a long facial massage by candlelight.",
      },
      {
        name: "Brow Shape & Tint",
        duration: "30 min",
        price: "$55",
        description:
          "Mapped, shaped and softly tinted to frame the face without overdoing it.",
      },
    ],
  },
  {
    name: "Massage & Body",
    note: "Slow, pressure-led work.",
    services: [
      {
        name: "Quiet Hands Massage",
        duration: "60 min",
        price: "$180",
        description:
          "A restrained, full-body massage built entirely around your breath and pace, not a fixed sequence.",
      },
      {
        name: "Warm Stone Ritual",
        duration: "75 min",
        price: "$220",
        description:
          "Heated basalt stones and long strokes to draw tension out of the shoulders, back, and legs.",
      },
      {
        name: "Deep Tissue Restore",
        duration: "90 min",
        price: "$250",
        description:
          "Firm, targeted work for chronic tightness — for bodies that carry their week in their shoulders.",
      },
    ],
  },
  {
    name: "Enhancements",
    note: "Added to any booking.",
    services: [
      {
        name: "Scalp Ritual",
        duration: "15 min",
        price: "$45",
        description: "Warm oil and slow pressure across the scalp and temples.",
      },
      {
        name: "Deep Conditioning Treatment",
        duration: "20 min",
        price: "$40",
        description: "A restorative mask worked through, left to sit under gentle heat.",
      },
      {
        name: "Aromatic Steam",
        duration: "20 min",
        price: "$40",
        description: "A short cedar steam session to open the morning or close the evening.",
      },
    ],
  },
];
