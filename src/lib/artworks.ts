// src/lib/artworks.ts

export interface Artwork {
  id: string;
  title: string;
  year: number;
  dimensions: string;
  medium: string;
  image: string;
  series?: string;
  description: string;
  forSale?: boolean;
}

export const artworks: Artwork[] = [
  {
    id: "studio-photo-session",
    title: "Studio Photo Session",
    year: 2025,
    dimensions: "—",
    medium: "Photography",
    image: "/images/artworks/Mwass_Upload_wsruik.png",
    series: "Studio Archives",
    description:
      "A rare glimpse into the working environment of Studio 1.6, capturing process, presence, and atmosphere.",
    forSale: true,
  },

  {
    id: "journey-to-nibru",
    title: "The Journey to Nibiru",
    year: 2024,
    dimensions: "60 × 75 cm",
    medium: "Oil Pastels",
    image: "/images/artworks/The_Journey_To_Nibru_60cm_x_75cm_vp76kp.jpg",
    series: "Human Nature",
    description:
      "Nibiru, a mythical planet in Mesopotamian lore, allegedly passes Earth every 3,600 years. Sitchin linked it to ancient astronauts mining gold in Africa, later fueling doomsday prophecies and extraterrestrial origin theories.<span class='flag-icon'><img src='/images/kenyan-flag.png' alt='Kenyan Flag' style='width: 20px; height: 14px; display: inline-block; vertical-align: middle; margin-left: 8px;'/></span>",
    forSale: true,
  },

  {
    id: "damus-vision",
    title: "Damu's Vision",
    year: 2024,
    dimensions: "75 × 77 cm",
    medium: "Oil Pastels",
    image: "/images/artworks/Damus_Vision75cm_x_77cm_uxul4e.jpg",
    series: "Human Nature",
    description:
      "Damu, once a vegetation god tied to seasonal cycles, later became a healing deity invoked in rituals. In Swahili, 'Damu' means blood, symbolizing lineage, life force, and kinship, often used as a powerful given name.<span class='flag-icon'><img src='/images/kenyan-flag.png' alt='Kenyan Flag' style='width: 20px; height: 14px; display: inline-block; vertical-align: middle; margin-left: 8px;'/></span>",
    forSale: true,
  },

  {
    id: "rise-of-marduk",
    title: "The Rise of Marduk",
    year: 2025,
    dimensions: "60 × 75 cm",
    medium: "Oil Pastels",
    image: "/images/artworks/The_Rise_Of_Marduk_60cm_x_75cm_j3s5zt.jpg",
    series: "Human Nature",
    description:
      "Marduk's ascent mirrored Babylon's rise, shaping empire theology. Afrocentric scholars, like Cheikh Anta Diop, reinterpret Mesopotamian deities as part of pan-African heritage, reframing Marduk's supremacy within broader African cultural and historical traditions.<span class='flag-icon'><img src='/images/kenyan-flag.png' alt='Kenyan Flag' style='width: 20px; height: 14px; display: inline-block; vertical-align: middle; margin-left: 8px;'/></span>",
    forSale: true,
  },

  {
    id: "visitation-of-utu",
    title: "Visitation of Utu",
    year: 2024,
    dimensions: "33 × 38 cm",
    medium: "Oil Pastels",
    image: "/images/artworks/Visitation_Of_Utu_33cm_x_38cm_buta55.jpg",
    series: "Human Nature",
    description:
      "Utu, the sun god and divine judge, upheld moral order. His role parallels Egyptian cosmology and African traditions. Afrocentric reclamation emphasizes Utu's African origins, linking Mesopotamian theology to African spiritual frameworks.<span class='flag-icon'><img src='/images/kenyan-flag.png' alt='Kenyan Flag' style='width: 20px; height: 14px; display: inline-block; vertical-align: middle; margin-left: 8px;'/></span>",
    forSale: true,
  },

  {
    id: "half-enki",
    title: "Half Enki",
    year: 2024,
    dimensions: "32 × 38 cm",
    medium: "Oil Pastels",
    image: "/images/artworks/Half_Enki_32cm_x_38cm_dvz32o.jpg",
    series: "Human Nature",
    description:
      "Enki, master of wisdom, creation, magic, and water, balanced Anu and Enlil's powers. His role resembles Egyptian Ptah. Afrocentric scholarship reclaims Enki as part of African intellectual traditions, humanity's benefactor and cosmic engineer.<span class='flag-icon'><img src='/images/kenyan-flag.png' alt='Kenyan Flag' style='width: 20px; height: 14px; display: inline-block; vertical-align: middle; margin-left: 8px;'/></span>",
    forSale: true,
  },

  {
    id: "enkis-throne",
    title: "Enki's Throne",
    year: 2024,
    dimensions: "65 × 85 cm",
    medium: "Oil Pastels",
    image: "/images/artworks/Enkis_Throne_65cm_x_85cm_cwjpx1.jpg",
    series: "Human Nature",
    description:
      "Enki, 'Lord of the Earth,' embodied wisdom, magic, fertility, and creation. Parallels with Egyptian Ptah highlight his craftsman role. Afrocentric reclamation positions Enki as a foundational African deity, gifting civilization through benevolence and clever protection.<span class='flag-icon'><img src='/images/kenyan-flag.png' alt='Kenyan Flag' style='width: 20px; height: 14px; display: inline-block; vertical-align: middle; margin-left: 8px;'/></span>",
    forSale: true,
  },

  {
    id: "damkina-at-dawn",
    title: "Damkina at Dawn",
    year: 2024,
    dimensions: "33 × 38 cm",
    medium: "Oil Pastels",
    image: "/images/artworks/Damkina_At_Dawn_33cm_x_38cm_zc1sy1.jpg",
    series: "Human Nature",
    description:
      "Damkina, consort of Enki and mother of Marduk, symbolized divine motherhood and queenship. Paralleled with Egyptian Mut, Afrocentric reclamation reframes her as an African matriarchal figure, primordial source of civilization later claimed by Babylon.<span class='flag-icon'><img src='/images/kenyan-flag.png' alt='Kenyan Flag' style='width: 20px; height: 14px; display: inline-block; vertical-align: middle; margin-left: 8px;'/></span>",
    forSale: true,
  },

  {
    id: "ninmahs-entry",
    title: "Ninmah's Entry",
    year: 2025,
    dimensions: "33 × 38 cm",
    medium: "Oil Pastels",
    image: "/images/artworks/Ninmahs_Entry_33cm_x_38cm_whtolw.jpg",
    series: "Human Nature",
    description:
      "Ninmah, 'Mother of All Living,' presided over childbirth, fertility, and nursing. Partner and rival to Enki, sister to Enlil, she parallels African Earth Mother figures and Egyptian Hathor, embodying protection and creative power.<span class='flag-icon'><img src='/images/kenyan-flag.png' alt='Kenyan Flag' style='width: 20px; height: 14px; display: inline-block; vertical-align: middle; margin-left: 8px;'/></span>",
    forSale: true,
  },

  {
    id: "iskur-and-his-son",
    title: "Iskur and His Son",
    year: 2025,
    dimensions: "33 × 45 cm",
    medium: "Oil Pastels",
    image: "/images/artworks/Iskur_and_His_Son_afqw99.jpg",
    series: "Human Nature",
    description:
      "Iskur, storm god of thunder, rain, and chaos, embodied fertility and danger. His son Nimgir personified lightning, serving as his weapon. Together they reflect universal storm archetypes, echoed in Egyptian and Yoruba traditions.<span class='flag-icon'><img src='/images/kenyan-flag.png' alt='Kenyan Flag' style='width: 20px; height: 14px; display: inline-block; vertical-align: middle; margin-left: 8px;'/></span>",
    forSale: true,
  },

  {
    id: "enlils-kingdom",
    title: "Enlil's Kingdom",
    year: 2024,
    dimensions: "60 × 74 cm",
    medium: "Oil Pastels",
    image: "/images/artworks/Enlils_Kingdom_60cm_x_74cm_hebqqk.jpg",
    series: "Human Nature",
    description:
      "Enlil, chief Mesopotamian deity, ruled divine assemblies and granted kings authority. He embodied inscrutable cosmic power. Despite his dominance, myths recount his banishment for violating Ninlil, later his consort, reflecting complex divine morality.<span class='flag-icon'><img src='/images/kenyan-flag.png' alt='Kenyan Flag' style='width: 20px; height: 14px; display: inline-block; vertical-align: middle; margin-left: 8px;'/></span>",
    forSale: true,
  },

  {
    id: "beasts-and-petals",
    title: "Beasts & Petals",
    year: 2025,
    dimensions: "113 × 142 cm",
    medium: "Oil Pastels",
    image: "/images/artworks/Beasts_and_Petals_113cm_x_142cm_cuclau.jpg",
    series: "Human Nature",
    description:
      "Mwass Githinji's 2025 oil painting contrasts primal resilience ('beasts') with fragile beauty ('petals'). Part of the Human Nature series, it explores instinct versus tenderness, reflecting humanity's duality between survival drives and delicate vulnerability.<span class='flag-icon'><img src='/images/kenyan-flag.png' alt='Kenyan Flag' style='width: 20px; height: 14px; display: inline-block; vertical-align: middle; margin-left: 8px;'/></span>",
    forSale: true,
  },
];

export const getFeaturedArtworks = () => {
  return artworks.slice(0, 6);
};