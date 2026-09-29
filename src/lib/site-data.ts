import {
  BadgeCheck,
  Gem,
  HeartHandshake,
  Leaf,
  PackageCheck,
  Sparkles,
} from "lucide-react"
import { publicAsset } from "@/lib/utils"

export const brand = {
  name: "Two And Half Meters",
  tagline: "Handcrafted in India · Limited pieces · Timeless elegance",
  whatsapp: "+918425080250",
  phone: "+91 8425080250",
  email: "info@twoandhalfmeters.com",
  instagram: "@twoandhalfmeters",
  city: "India",
}

export const trustPoints = [
  {
    title: "Handcrafted",
    text: "Skilled hands",
    subText: "Timeless techniques",
    icon: Sparkles,
  },
  {
    title: "Limited Pieces",
    text: "Made in small numbers",
    subText: "for exclusivity",
    icon: PackageCheck,
  },
  {
    title: "Quality Fabrics",
    text: "Carefully chosen",
    subText: "Beautifully made",
    icon: Leaf,
  },
  {
    title: "Made with Love",
    text: "Every piece is a reflection",
    subText: "of our passsion",
    icon: HeartHandshake,
  },
]

export const products = [
  {
    id: 1,
    slug: "noor-mukaish-edit",
    name: "Noor",
    title: "Noor - Mukaish Edit",
    collection: "Mukaish Edit",
    category: "Festive",
    badge: "Limited Pieces",
    priceLabel: "Price on Request",
    availability: "Limited Pieces",
    description:
      "A timeless handcrafted mukaish piece designed for elegant celebrations and cherished moments.",
    short: "Timeless shimmer in every detail.",
    image: publicAsset("/images/model-1.jpg"),
    gallery: [publicAsset("/images/model-1.jpg"), publicAsset("/images/model-2.jpg"), publicAsset("/images/model-3.jpg")],
    fabric: "Premium cotton",
    work: "Handcrafted mukaish",
    colour: "Ivory",
    occasion: "Festive / Elegant daywear",
    sizes: ["S", "M", "L", "XL", "Custom"],
  },
  {
    id: 2,
    slug: "zareen-mukaish-edit",
    name: "Zareen",
    title: "Zareen - Mukaish Edit",
    collection: "Mukaish Edit",
    category: "Classic",
    badge: "New Arrival",
    priceLabel: "Price on Request",
    availability: "Limited Pieces",
    description:
      "Graceful craftsmanship with an heirloom mood, made for slow celebrations and quiet refinement.",
    short: "Graceful craftsmanship. Made to be remembered.",
    image: publicAsset("/images/model-2.jpg"),
    gallery: [publicAsset("/images/model-2.jpg"), publicAsset("/images/model-4.jpg"), publicAsset("/images/model-1.jpg")],
    fabric: "Soft chanderi",
    work: "Mukaish and thread accents",
    colour: "Pearl ivory",
    occasion: "Intimate festivities",
    sizes: ["S", "M", "L", "XL", "Custom"],
  },
  {
    id: 3,
    slug: "haya-mukaish-edit",
    name: "Haya",
    title: "Haya - Mukaish Edit",
    collection: "Mukaish Edit",
    category: "New Arrivals",
    badge: "Limited Pieces",
    priceLabel: "Price on Request",
    availability: "Limited Pieces",
    description:
      "Subtle details and effortless grace come together in a versatile piece for festive days.",
    short: "Subtle details. Timeless beauty.",
    image: publicAsset("/images/model-3.jpg"),
    gallery: [publicAsset("/images/model-3.jpg"), publicAsset("/images/model-1.jpg"), publicAsset("/images/model-4.jpg")],
    fabric: "Cotton silk",
    work: "Hand mukaish highlights",
    colour: "Warm ivory",
    occasion: "Festive brunches",
    sizes: ["S", "M", "L", "XL", "Custom"],
  },
  {
    id: 4,
    slug: "rubaab-mukaish-edit",
    name: "Rubaab",
    title: "Rubaab - Mukaish Edit",
    collection: "Mukaish Edit",
    category: "Limited Pieces",
    badge: "Limited Pieces",
    priceLabel: "Price on Request",
    availability: "Limited Pieces",
    description:
      "Understated elegance with unmatched charm, crafted for moments that ask for restraint and radiance.",
    short: "Understated elegance. Unmatched charm.",
    image: publicAsset("/images/model-4.jpg"),
    gallery: [publicAsset("/images/model-4.jpg"), publicAsset("/images/model-2.jpg"), publicAsset("/images/model-3.jpg")],
    fabric: "Fine cotton",
    work: "Mukaish embroidery",
    colour: "Ivory blush",
    occasion: "Elegant eveningwear",
    sizes: ["S", "M", "L", "XL", "Custom"],
  },
]

export const collectionTabs = ["All", "New Arrivals", "Festive", "Classic", "Limited Pieces"]

export const story = {
  eyebrow: "Our Story",
  title: "Crafted with purpose. Made to last.",
  body: [
    "Two friends. Twenty-six years of friendship. A shared love for timeless craftsmanship inspired the creation of Two And Half Meters.",
    "Founded by Debrina Naik and Rafia Kulkarni, the brand celebrates traditional embroidery through thoughtfully curated handcrafted pieces.",
  ],
  founders: ["Dabira Naik", "Rafia Kulkarni"],
  milestones: [
    { year: "1999", label: "Friendship begins" },
    { year: "2025", label: "Brand concept" },
    { year: "2026", label: "Launch of Two And Half Meters" },
  ],
}

export const journalPosts = [
  {
    slug: "styling-ivory-mukaish",
    title: "Styling Ivory Mukaish for Day Celebrations",
    category: "Styling Guides",
    image: publicAsset("/images/model-1.jpg"),
  },
  {
    slug: "mukaish-craft-story",
    title: "The Quiet Beauty of Handcrafted Mukaish",
    category: "Craft Stories",
    image: publicAsset("/images/model-4.jpg"),
  },
  {
    slug: "festive-edit-notes",
    title: "Notes from the Festive Edit",
    category: "Festive Edit",
    image: publicAsset("/images/model-2.jpg"),
  },
  {
    slug: "fabric-care",
    title: "Caring for Handcrafted Fabrics",
    category: "Fabric Notes",
    image: publicAsset("/images/model-3.jpg"),
  },
]

export const contactCards = [
  { label: "Phone", value: brand.phone, href: `tel:${brand.phone}` },
  { label: "Instagram", value: brand.instagram, href: "https://instagram.com/twoandhalfmeters" },
  { label: "Email", value: brand.email, href: `mailto:${brand.email}` },
  { label: "Location", value: brand.city, href: "#" },
]

export const detailFacts = [
  { label: "Fabric", key: "fabric", icon: Gem },
  { label: "Work", key: "work", icon: BadgeCheck },
  { label: "Colour", key: "colour", icon: Sparkles },
  { label: "Occasion", key: "occasion", icon: HeartHandshake },
] as const
