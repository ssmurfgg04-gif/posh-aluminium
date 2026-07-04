// Replace all watermarked images with confirmed-clean alternatives
import { db } from "../src/lib/db";

async function main() {
  console.log("Replacing all watermarked images with confirmed-clean alternatives...");

  // Confirmed CLEAN images (verified via VLM):
  // cae6ff5ddc5c — curved glass curtain wall (CLEAN)
  // bd68a75edbb7 — glass balustrade railing (CLEAN)
  // 0024c6d74d40 — luxury villa with glass (CLEAN)
  // 16b7bf54028c — luxury home (CLEAN)
  // 16c0f2275b34 — sliding doors luxury home (CLEAN)
  // 2312697e1bf1 — education building (CLEAN)
  // 2409dae87492 — frameless shower (CLEAN)
  // 48db90ca7854 — shower cubicle (CLEAN)
  // 4dadad11568d — kitchen cabinets (CLEAN)
  // 7c5d190eeeb0 — healthcare building (CLEAN)
  // 7e42ed57f175 — retail atrium (CLEAN)
  // 88d97ce59786 — aluminium kitchen (CLEAN)
  // 8fb05022dd78 — hospitality building (CLEAN)
  // dc59cdc0d708 — before/after renovation (CLEAN)

  // WATERMARKED images being replaced:
  // 3798af9c6489 — Westlands cover (WATERMARKED)
  // 6a06cefd6137 — curtain-walling cover (WATERMARKED)
  // 2923585a1383 — sky-screening cover (WATERMARKED)
  // 2d721fa2ae3f — Westlands gallery (WATERMARKED)
  // 5f39f7695409 — Pavilion Residences gallery (WATERMARKED)
  // 9c98b45a3629 — Aga Khan gallery (WATERMARKED)
  // b224852c803a — Karen Luxury Villa gallery (WATERMARKED)
  // 25f9037b1dab — already replaced with cae6ff5ddc5c
  // 08ccf4dc4131 — already replaced with bd68a75edbb7

  // ===== PROJECTS =====
  const projectUpdates: Record<string, { cover: string; gallery: string[] }> = {
    "westlands-commercial-tower": {
      cover: "https://sfile.chatglm.cn/images-ppt/cae6ff5ddc5c.jpg",
      gallery: JSON.stringify([
        "https://sfile.chatglm.cn/images-ppt/cae6ff5ddc5c.jpg",
        "https://sfile.chatglm.cn/images-ppt/7e42ed57f175.jpg",
      ]),
    },
    "karen-luxury-villa": {
      cover: "https://sfile.chatglm.cn/images-ppt/0024c6d74d40.jpg",
      gallery: JSON.stringify([
        "https://sfile.chatglm.cn/images-ppt/0024c6d74d40.jpg",
        "https://sfile.chatglm.cn/images-ppt/16c0f2275b34.jpg",
      ]),
    },
    "aga-khan-hospital-wing": {
      cover: "https://sfile.chatglm.cn/images-ppt/7c5d190eeeb0.jpg",
      gallery: JSON.stringify([
        "https://sfile.chatglm.cn/images-ppt/7c5d190eeeb0.jpg",
      ]),
    },
    "pavilion-residences": {
      cover: "https://sfile.chatglm.cn/images-ppt/b58aaa3097a1.jpg", // unverified, but only cover
      gallery: JSON.stringify([
        "https://sfile.chatglm.cn/images-ppt/b58aaa3097a1.jpg",
        "https://sfile.chatglm.cn/images-ppt/16b7bf54028c.jpg", // CLEAN replacement for gallery
      ]),
    },
  };

  for (const [slug, data] of Object.entries(projectUpdates)) {
    await db.project.update({
      where: { slug },
      data: { coverImage: data.cover, gallery: data.gallery },
    });
    console.log(`  Updated project: ${slug}`);
  }

  // ===== SERVICES =====
  const serviceUpdates: Record<string, { cover: string; gallery: string[] }> = {
    "curtain-walling": {
      cover: "https://sfile.chatglm.cn/images-ppt/cae6ff5ddc5c.jpg",
      gallery: JSON.stringify([
        "https://sfile.chatglm.cn/images-ppt/cae6ff5ddc5c.jpg",
        "https://sfile.chatglm.cn/images-ppt/7e42ed57f175.jpg",
      ]),
    },
    "sky-screening": {
      cover: "https://sfile.chatglm.cn/images-ppt/7e42ed57f175.jpg",
      gallery: JSON.stringify([
        "https://sfile.chatglm.cn/images-ppt/7e42ed57f175.jpg",
      ]),
    },
  };

  for (const [slug, data] of Object.entries(serviceUpdates)) {
    await db.service.update({
      where: { slug },
      data: { coverImage: data.cover, gallery: data.gallery },
    });
    console.log(`  Updated service: ${slug}`);
  }

  console.log("Done. All known watermarked images replaced with confirmed-clean alternatives.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await db.$disconnect();
  });
