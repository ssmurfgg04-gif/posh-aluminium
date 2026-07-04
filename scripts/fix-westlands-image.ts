// Update Westlands project image + fix location references
import { db } from "../src/lib/db";

async function main() {
  console.log("Updating Westlands image and location...");

  // Update Westlands Commercial Tower to use a different curtain wall image
  await db.project.update({
    where: { slug: "westlands-commercial-tower" },
    data: {
      coverImage: "https://sfile.chatglm.cn/images-ppt/3798af9c6489.jpg",
      gallery: JSON.stringify([
        "https://sfile.chatglm.cn/images-ppt/3798af9c6489.jpg",
        "https://sfile.chatglm.cn/images-ppt/6a06cefd6137.jpg",
        "https://sfile.chatglm.cn/images-ppt/2d721fa2ae3f.jpg",
      ]),
    },
  });
  console.log("  Updated Westlands Commercial Tower image");

  // Update curtain-walling service to use a different image (not the hero)
  await db.service.update({
    where: { slug: "curtain-walling" },
    data: {
      coverImage: "https://sfile.chatglm.cn/images-ppt/6a06cefd6137.jpg",
      gallery: JSON.stringify([
        "https://sfile.chatglm.cn/images-ppt/6a06cefd6137.jpg",
        "https://sfile.chatglm.cn/images-ppt/cae6ff5ddc5c.jpg",
      ]),
    },
  });
  console.log("  Updated curtain-walling service image");

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
