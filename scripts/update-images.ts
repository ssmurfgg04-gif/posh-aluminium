// Update seed data with premium Pinterest-quality architecture photos
import { db } from "../src/lib/db";

async function main() {
  console.log("Updating image URLs to premium architecture photos...");

  // Map of project slug -> new cover image + gallery
  const projectImages: Record<string, { cover: string; gallery: string[] }> = {
    "westlands-commercial-tower": {
      cover: "https://sfile.chatglm.cn/images-ppt/c5bec2271c40.jpg",
      gallery: JSON.stringify([
        "https://sfile.chatglm.cn/images-ppt/c5bec2271c40.jpg",
        "https://sfile.chatglm.cn/images-ppt/8fb05022dd78.jpg",
        "https://sfile.chatglm.cn/images-ppt/2312697e1bf1.jpg",
      ]),
    },
    "karen-luxury-villa": {
      cover: "https://sfile.chatglm.cn/images-ppt/0024c6d74d40.jpg",
      gallery: JSON.stringify([
        "https://sfile.chatglm.cn/images-ppt/0024c6d74d40.jpg",
        "https://sfile.chatglm.cn/images-ppt/16c0f2275b34.jpg",
        "https://sfile.chatglm.cn/images-ppt/b224852c803a.png",
      ]),
    },
    "aga-khan-hospital-wing": {
      cover: "https://sfile.chatglm.cn/images-ppt/7c5d190eeeb0.jpg",
      gallery: JSON.stringify([
        "https://sfile.chatglm.cn/images-ppt/7c5d190eeeb0.jpg",
        "https://sfile.chatglm.cn/images-ppt/9c98b45a3629.jpg",
      ]),
    },
    "brookhouse-international-school": {
      cover: "https://sfile.chatglm.cn/images-ppt/2312697e1bf1.jpg",
      gallery: JSON.stringify([
        "https://sfile.chatglm.cn/images-ppt/2312697e1bf1.jpg",
        "https://sfile.chatglm.cn/images-ppt/c2a22867029d.jpg",
      ]),
    },
    "radisson-blu-expansion": {
      cover: "https://sfile.chatglm.cn/images-ppt/8fb05022dd78.jpg",
      gallery: JSON.stringify([
        "https://sfile.chatglm.cn/images-ppt/8fb05022dd78.jpg",
        "https://sfile.chatglm.cn/images-ppt/7e42ed57f175.jpg",
        "https://sfile.chatglm.cn/images-ppt/be97eb1927e8.jpg",
      ]),
    },
    "pavilion-residences": {
      cover: "https://sfile.chatglm.cn/images-ppt/b58aaa3097a1.jpg",
      gallery: JSON.stringify([
        "https://sfile.chatglm.cn/images-ppt/b58aaa3097a1.jpg",
        "https://sfile.chatglm.cn/images-ppt/5f39f7695409.jpg",
      ]),
    },
    "two-rivers-mall-atrium": {
      cover: "https://sfile.chatglm.cn/images-ppt/7e42ed57f175.jpg",
      gallery: JSON.stringify([
        "https://sfile.chatglm.cn/images-ppt/7e42ed57f175.jpg",
        "https://sfile.chatglm.cn/images-ppt/be97eb1927e8.jpg",
      ]),
    },
    "muthaiga-heritage-home": {
      cover: "https://sfile.chatglm.cn/images-ppt/d58f925cbb33.jpg",
      gallery: JSON.stringify([
        "https://sfile.chatglm.cn/images-ppt/d58f925cbb33.jpg",
        "https://sfile.chatglm.cn/images-ppt/16b7bf54028c.jpg",
      ]),
    },
  };

  for (const [slug, imgs] of Object.entries(projectImages)) {
    await db.project.update({
      where: { slug },
      data: {
        coverImage: imgs.cover,
        gallery: imgs.gallery,
      },
    });
    console.log(`  Updated project: ${slug}`);
  }

  // Map of service slug -> new cover image + gallery
  const serviceImages: Record<string, { cover: string; gallery: string[] }> = {
    "curtain-walling": {
      cover: "https://sfile.chatglm.cn/images-ppt/c5bec2271c40.jpg",
      gallery: JSON.stringify([
        "https://sfile.chatglm.cn/images-ppt/c5bec2271c40.jpg",
        "https://sfile.chatglm.cn/images-ppt/8fb05022dd78.jpg",
      ]),
    },
    "sliding-doors": {
      cover: "https://sfile.chatglm.cn/images-ppt/0024c6d74d40.jpg",
      gallery: JSON.stringify([
        "https://sfile.chatglm.cn/images-ppt/0024c6d74d40.jpg",
        "https://sfile.chatglm.cn/images-ppt/16c0f2275b34.jpg",
      ]),
    },
    "office-partitions": {
      cover: "https://sfile.chatglm.cn/images-ppt/d93b8e9a44c3.jpg",
      gallery: JSON.stringify([
        "https://sfile.chatglm.cn/images-ppt/d93b8e9a44c3.jpg",
        "https://sfile.chatglm.cn/images-ppt/ff11f824e171.jpg",
      ]),
    },
    "shower-cubicles": {
      cover: "https://sfile.chatglm.cn/images-ppt/2409dae87492.jpg",
      gallery: JSON.stringify([
        "https://sfile.chatglm.cn/images-ppt/2409dae87492.jpg",
        "https://sfile.chatglm.cn/images-ppt/48db90ca7854.jpg",
      ]),
    },
    "sky-screening": {
      cover: "https://sfile.chatglm.cn/images-ppt/2923585a1383.jpg",
      gallery: JSON.stringify([
        "https://sfile.chatglm.cn/images-ppt/2923585a1383.jpg",
      ]),
    },
    railings: {
      cover: "https://sfile.chatglm.cn/images-ppt/d0e13f2c2f9e.jpg",
      gallery: JSON.stringify([
        "https://sfile.chatglm.cn/images-ppt/d0e13f2c2f9e.jpg",
        "https://sfile.chatglm.cn/images-ppt/08ccf4dc4131.jpg",
      ]),
    },
    cabinets: {
      cover: "https://sfile.chatglm.cn/images-ppt/88d97ce59786.jpg",
      gallery: JSON.stringify([
        "https://sfile.chatglm.cn/images-ppt/88d97ce59786.jpg",
        "https://sfile.chatglm.cn/images-ppt/4dadad11568d.jpg",
      ]),
    },
  };

  for (const [slug, imgs] of Object.entries(serviceImages)) {
    await db.service.update({
      where: { slug },
      data: {
        coverImage: imgs.cover,
        gallery: imgs.gallery,
      },
    });
    console.log(`  Updated service: ${slug}`);
  }

  console.log("Done.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await db.$disconnect();
  });
