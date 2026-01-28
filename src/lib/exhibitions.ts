// src/lib/exhibition.ts

export interface Exhibition {
  id: string;
  title: string;
  gallery: string;
  location: string;
  startDate: string;
  endDate: string;
  image: string;
  description: string;
}

export const exhibitions: Exhibition[] = [
  {
    id: "journey-to-nibru",
    title: "The Journey To Nibru",
    gallery: "Studio 1.6",
    location: "Nairobi, Kenya",
    startDate: "2024-01-01",
    endDate: "2024-12-31",
    image: "/images/exhibitions/The_Journey_To_Nibru_60cm_x_75cm_vp76kp.jpg",
    description:
      "The Journey To Nibru explores movement, myth, and transcendence through layered cosmological symbolism. Created in 2024.",
  },
  {
    id: "damus-vision",
    title: "Damu's Vision",
    gallery: "Studio 1.6",
    location: "Nairobi, Kenya",
    startDate: "2024-01-01",
    endDate: "2024-12-31",
    image: "/images/exhibitions/Damus_Vision75cm_x_77cm_uxul4e.jpg",
    description:
      "A visionary work rooted in ancestral foresight and spiritual inheritance. Created in 2024.",
  },
  {
    id: "rise-of-marduk",
    title: "The Rise Of Marduk",
    gallery: "Studio 1.6",
    location: "Nairobi, Kenya",
    startDate: "2025-01-01",
    endDate: "2025-12-31",
    image: "/images/exhibitions/The_Rise_Of_Marduk_60cm_x_75cm_j3s5zt.jpg",
    description:
      "A powerful meditation on authority, emergence, and divine order. Created in 2025.",
  },
  {
    id: "visitation-of-utu",
    title: "Visitation Of Utu",
    gallery: "Studio 1.6",
    location: "Nairobi, Kenya",
    startDate: "2024-01-01",
    endDate: "2024-12-31",
    image: "/images/exhibitions/Visitation_Of_Utu_33cm_x_38cm_buta55.jpg",
    description:
      "A quiet yet radiant encounter with the solar presence of Utu. Created in 2024.",
  },
  {
    id: "half-enki",
    title: "Half Enki",
    gallery: "Studio 1.6",
    location: "Nairobi, Kenya",
    startDate: "2024-01-01",
    endDate: "2024-12-31",
    image: "/images/exhibitions/Half_Enki_32cm_x_38cm_dvz32o.jpg",
    description:
      "An introspective fragmentation of Enki, balancing wisdom and incompletion. Created in 2024.",
  },
];