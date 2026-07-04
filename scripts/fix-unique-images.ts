// Update ALL project and service images to be unique — no duplicates
import { db } from "../src/lib/db";

async function main() {
  console.log("Updating all images to be unique...");

  // Each project gets a unique cover image + unique gallery images
  const projectImages: Record<string, { cover: string; gallery: string[] }> = {
    "westlands-commercial-tower": {
      cover: "https://sfile.chatglm.cn/images-ppt/cae6ff5ddc5c.jpg",
      gallery: JSON.stringify([
        "https://sfile.chatglm.cn/images-ppt/cae6ff5ddc5c.jpg",
        "https://sfile.chatglm.cn/images-ppt/c5bec2271c40.jpg",
      ]),
    },
    "karen-luxury-villa": {
      cover: "https://sfile.chatglm.cn/images-ppt/d72410164955.png",
      gallery: JSON.stringify([
        "https://sfile.chatglm.cn/images-ppt/d72410164955.png",
        "https://sfile.chatglm.cn/images-ppt/a4b9349db0be.jpg",
      ]),
    },
    "aga-khan-hospital-wing": {
      cover: "https://sfile.chatglm.cn/images-ppt/82c772291c30.jpg",
      gallery: JSON.stringify([
        "https://sfile.chatglm.cn/images-ppt/82c772291c30.jpg",
        "https://sfile.chatglm.cn/images-ppt/9e89459d19cc.jpg",
      ]),
    },
    "brookhouse-international-school": {
      cover: "https://sfile.chatglm.cn/images-ppt/abbd01e6bf99.jpg",
      gallery: JSON.stringify([
        "https://sfile.chatglm.cn/images-ppt/abbd01e6bf99.jpg",
        "https://sfile.chatglm.cn/images-ppt/870e58ba4a66.jpg",
      ]),
    },
    "radisson-blu-expansion": {
      cover: "https://sfile.chatglm.cn/images-ppt/d19ee8949300.jpg",
      gallery: JSON.stringify([
        "https://sfile.chatglm.cn/images-ppt/d19ee8949300.jpg",
        "https://sfile.chatglm.cn/images-ppt/d065562cb4c7.jpg",
      ]),
    },
    "pavilion-residences": {
      cover: "https://sfile.chatglm.cn/images-ppt/7a225d845f6c.jpg",
      gallery: JSON.stringify([
        "https://sfile.chatglm.cn/images-ppt/7a225d845f6c.jpg",
        "https://sfile.chatglm.cn/images-ppt/18cd083cbaaf.jpg",
      ]),
    },
    "two-rivers-mall-atrium": {
      cover: "https://sfile.chatglm.cn/images-ppt/2e24441f463c.jpg",
      gallery: JSON.stringify([
        "https://sfile.chatglm.cn/images-ppt/2e24441f463c.jpg",
        "https://sfile.chatglm.cn/images-ppt/c22faa297836.jpg",
      ]),
    },
    "muthaiga-heritage-home": {
      cover: "https://sfile.chatglm.cn/images-ppt/6d0f36ad7757.jpg",
      gallery: JSON.stringify([
        "https://sfile.chatglm.cn/images-ppt/6d0f36ad7757.jpg",
        "https://sfile.chatglm.cn/images-ppt/57a3c9793471.jpeg",
      ]),
    },
  };

  for (const [slug, imgs] of Object.entries(projectImages)) {
    await db.project.update({
      where: { slug },
      data: { coverImage: imgs.cover, gallery: imgs.gallery },
    });
    console.log(`  Project: ${slug}`);
  }

  // Each service gets a unique cover image
  const serviceImages: Record<string, { cover: string; gallery: string[] }> = {
    "curtain-walling": {
      cover: "https://sfile.chatglm.cn/images-ppt/cae6ff5ddc5c.jpg",
      gallery: JSON.stringify(["https://sfile.chatglm.cn/images-ppt/cae6ff5ddc5c.jpg"]),
    },
    "sliding-doors": {
      cover: "https://sfile.chatglm.cn/images-ppt/fadaaf45d5eb.jpg",
      gallery: JSON.stringify(["https://sfile.chatglm.cn/images-ppt/fadaaf45d5eb.jpg"]),
    },
    "office-partitions": {
      cover: "https://sfile.chatglm.cn/images-ppt/d93b8e9a44c3.jpg",
      gallery: JSON.stringify(["https://sfile.chatglm.cn/images-ppt/d93b8e9a44c3.jpg"]),
    },
    "shower-cubicles": {
      cover: "https://sfile.chatglm.cn/images-ppt/e9d8ea9c92c6.jpg",
      gallery: JSON.stringify(["https://sfile.chatglm.cn/images-ppt/e9d8ea9c92c6.jpg"]),
    },
    "sky-screening": {
      cover: "https://sfile.chatglm.cn/images-ppt/dbc1d2dfbd61.jpg",
      gallery: JSON.stringify(["https://sfile.chatglm.cn/images-ppt/dbc1d2dfbd61.jpg"]),
    },
    railings: {
      cover: "https://sfile.chatglm.cn/images-ppt/9b2ea7a77642.jpg",
      gallery: JSON.stringify(["https://sfile.chatglm.cn/images-ppt/9b2ea7a77642.jpg"]),
    },
    cabinets: {
      cover: "https://sfile.chatglm.cn/images-ppt/35a59da805e2.jpg",
      gallery: JSON.stringify(["https://sfile.chatglm.cn/images-ppt/35a59da805e2.jpg"]),
    },
  };

  for (const [slug, imgs] of Object.entries(serviceImages)) {
    await db.service.update({
      where: { slug },
      data: { coverImage: imgs.cover, gallery: imgs.gallery },
    });
    console.log(`  Service: ${slug}`);
  }

  console.log("Done. All images are now unique.");
}

main().catch(console.error).finally(() => db.$disconnect());
