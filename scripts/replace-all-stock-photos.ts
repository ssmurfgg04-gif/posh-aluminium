// Replace ALL remaining Unsplash stock photos with Pinterest-quality architecture photos
// Also remove fake testimonial avatar photos (use initials instead — more honest)
import { db } from "../src/lib/db";

async function main() {
  console.log("Replacing all Unsplash stock photos with Pinterest-quality images...");

  // ===== PROJECTS — all use sfile.chatglm.cn (web-sourced, Pinterest-quality) =====
  const projectImages: Record<string, { cover: string; gallery: string[] }> = {
    "westlands-commercial-tower": {
      cover: "https://sfile.chatglm.cn/images-ppt/cae6ff5ddc5c.jpg",
      gallery: JSON.stringify([
        "https://sfile.chatglm.cn/images-ppt/cae6ff5ddc5c.jpg",
        "https://sfile.chatglm.cn/images-ppt/cae6ff5ddc5c.jpg",
        "https://sfile.chatglm.cn/images-ppt/7e42ed57f175.jpg",
      ]),
    },
    "karen-luxury-villa": {
      cover: "https://sfile.chatglm.cn/images-ppt/0024c6d74d40.jpg",
      gallery: JSON.stringify([
        "https://sfile.chatglm.cn/images-ppt/0024c6d74d40.jpg",
        "https://sfile.chatglm.cn/images-ppt/16c0f2275b34.jpg",
        "https://sfile.chatglm.cn/images-ppt/16c0f2275b34.png",
      ]),
    },
    "aga-khan-hospital-wing": {
      cover: "https://sfile.chatglm.cn/images-ppt/7c5d190eeeb0.jpg",
      gallery: JSON.stringify([
        "https://sfile.chatglm.cn/images-ppt/7c5d190eeeb0.jpg",
        "https://sfile.chatglm.cn/images-ppt/7c5d190eeeb0.jpg",
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
        "https://sfile.chatglm.cn/images-ppt/16b7bf54028c.jpg",
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
      data: { coverImage: imgs.cover, gallery: imgs.gallery },
    });
    console.log(`  Updated project: ${slug}`);
  }

  // ===== SERVICES — all use sfile.chatglm.cn =====
  const serviceImages: Record<string, { cover: string; gallery: string[] }> = {
    "curtain-walling": {
      cover: "https://sfile.chatglm.cn/images-ppt/cae6ff5ddc5c.jpg",
      gallery: JSON.stringify([
        "https://sfile.chatglm.cn/images-ppt/cae6ff5ddc5c.jpg",
        "https://sfile.chatglm.cn/images-ppt/cae6ff5ddc5c.jpg",
      ]),
    },
    "sliding-doors": {
      cover: "https://sfile.chatglm.cn/images-ppt/16c0f2275b34.jpg",
      gallery: JSON.stringify([
        "https://sfile.chatglm.cn/images-ppt/16c0f2275b34.jpg",
        "https://sfile.chatglm.cn/images-ppt/0024c6d74d40.jpg",
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
      cover: "https://sfile.chatglm.cn/images-ppt/7e42ed57f175.jpg",
      gallery: JSON.stringify([
        "https://sfile.chatglm.cn/images-ppt/7e42ed57f175.jpg",
        "https://sfile.chatglm.cn/images-ppt/d8c2d7a22cf1.jpg",
      ]),
    },
    railings: {
      cover: "https://sfile.chatglm.cn/images-ppt/d0e13f2c2f9e.jpg",
      gallery: JSON.stringify([
        "https://sfile.chatglm.cn/images-ppt/d0e13f2c2f9e.jpg",
        "https://sfile.chatglm.cn/images-ppt/bd68a75edbb7.jpg",
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
      data: { coverImage: imgs.cover, gallery: imgs.gallery },
    });
    console.log(`  Updated service: ${slug}`);
  }

  // ===== TESTIMONIALS — remove stock avatar photos, use null (initials-based avatar) =====
  // Using stock photos of people for fake testimonials is dishonest.
  // The Testimonials component already handles null avatars with a colored circle + initial.
  const testimonials = await db.testimonial.findMany();
  for (const t of testimonials) {
    await db.testimonial.update({
      where: { id: t.id },
      data: { avatar: null },
    });
  }
  console.log(`  Updated ${testimonials.length} testimonials: removed stock avatar photos`);

  console.log("Done. All Unsplash stock photos replaced.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await db.$disconnect();
  });
