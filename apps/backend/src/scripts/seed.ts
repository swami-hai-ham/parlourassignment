import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

async function main() {
  await prisma.user.createMany({
    data: [
      {
        name: "Super Admin",
        email: "super@parlour.com",
        password: "$2a$12$x/OJyPZAy5HMirT7rfTNc.V1slKEUouETZ/JFBJnZZTiiPN9lro9a", // super123
        role: "SUPER_ADMIN"
      },
      {
        name: "Admin 1",
        email: "admin@parlour.com",
        password: "$2a$12$z1qvF9sGvWy7RUwr6YzREuX3a60LJrfDgh6DuEb1rVeOeMxO3YnXy", // admin123
        role: "ADMIN"
      }
    ],
  })

  console.log("Users seeded ✅")
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect())
