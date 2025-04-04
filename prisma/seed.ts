import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  await prisma.product.create({
    data: {
      title: "Red Chilli Powder",
      slug: "red-chilli-powder",
      description:
        "Fiery and pure, sourced from the best farms. Add bold heat and color to your recipes.",
      imageFront: "/red-chilli-front.png",
      imageBack: "/red-chilli-back.png",
      sizes: "50g,100g,250g,500g",
      prices: "20,40,90,180",
    },
  });

  await prisma.product.create({
    data: {
      title: "Turmeric Powder",
      slug: "turmeric-powder",
      description:
        "Rich, vibrant, and full of health benefits. Brings color and earthy flavor to your dishes.",
      imageFront: "/turmeric-front.png",
      imageBack: "/turmeric-back.png",
      sizes: "50g,100g,250g,500g",
      prices: "15,30,75,150",
    },
  });
  await prisma.product.create({
    data: {
      title: "Coriander Powder",
      slug: "coriander-powder",
      description:
        "Rich, vibrant, and full of health benefits. Brings color and earthy flavor to your dishes.",
      imageFront: "/coriander-front.png",
      imageBack: "/coriander-back.png",
      sizes: "50g,100g,250g,500g",
      prices: "13,25,60,120",
    },
  });
  await prisma.product.create({
    data: {
      title: "Whole Garam Masala Powder",
      slug: "garam-masala-powder",
      description:
        "Rich, vibrant, and full of health benefits. Brings color and earthy flavor to your dishes.",
      imageFront: "/garam-front.png",
      imageBack: "/garam-back.png",
      sizes: "50g,100g",
      prices: "60,120,60,120",
    },
  });

  // Add other products similarly!
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
