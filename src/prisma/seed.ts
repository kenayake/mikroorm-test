import { PrismaClient } from "@prisma/client";
import { data } from "autoprefixer";

const prisma = new PrismaClient();

async function main() {
  const user = prisma.user.create({
    data: {
      fullName: "surya",
      email: "admin@gmail.com",
      password: "$2y$10$CrQizrH.E7glqAVCTzdfru57lhlNxxZOztnOUPqYWwXQvncIHQbaC",
      role: "STAFF",
    },
  });
  console.log({ user });
}

main()
  .then(() => prisma.$disconnect())
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit();
  });
