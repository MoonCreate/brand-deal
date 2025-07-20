import { z } from 'zod';

// 1. Definisikan skema untuk setiap jenis atribut secara terpisah
const roleAttribute = z.object({
  trait_type: z.literal("Role"),
  value: z.string(),
});

const emailAttribute = z.object({
  trait_type: z.literal("Email"),
  value: z.string().email("Format email pada atribut tidak valid"),
});

const locationAttribute = z.object({
  trait_type: z.literal("location Address"),
  value: z.string(),
});

const socialLinksAttribute = z.object({
  trait_type: z.literal("Social Links"),
  value: z.array(
    z.object({
      type: z.string(),
      link: z.string(),
    })
  ),
});

const joinedPlatformAttribute = z.object({
  trait_type: z.literal("Joined Platform"),
  value: z.number().int("Value harus berupa angka integer"),
});

const creatorAddressAttribute = z.object({
  trait_type: z.literal("Creator Address"),
  value: z.string(), // Bisa ditambahkan .regex() untuk validasi alamat wallet
});

// 2. Gabungkan semua skema atribut menggunakan discriminatedUnion
const attributeSchema = z.discriminatedUnion("trait_type", [
  roleAttribute,
  emailAttribute,
  locationAttribute,
  socialLinksAttribute,
  joinedPlatformAttribute,
  creatorAddressAttribute,
]);

// 3. Buat skema utama
export const creatorProfileDto = z.object({
  name: z.string(),
  description: z.string(),
  image: z.string(),
  attributes: z.array(attributeSchema),
});

// Contoh Penggunaan
const data = {
  "name": "test name",
  "description": "test desc",
  "image": "test.jpg",
  "attributes": [
    { "trait_type": "Role", "value": "Creator" },
    { "trait_type": "Email", "value": "test@testcreator.com" },
    { "trait_type": "location Address", "value": "test alamat" },
    { "trait_type": "Social Links", "value": [{ "type": "facebook", "link": "facebook.com" }] },
    { "trait_type": "Joined Platform", "value": 583 },
    { "trait_type": "Creator Address", "value": "0x70997970C51812dc3A010C7d01b50e0d17dc79C8" }
  ]
};

try {
    const validatedData = creatorProfileDto.parse(data);
    console.log("Data valid:", validatedData);
} catch (e) {
    console.error("Kesalahan validasi:", e);
}