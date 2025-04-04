import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

async function main() {
  const supplier = await prisma.supplier.create({
    data: {
      name: 'Denis Haus Bergh',
      phone: '11999999999',
      email: 'denis@example.com',
      address: '123 Supplier St',
      city: 'Jaraguá do Sul',
      state: 'SC',
    },
  })

  const products = await prisma.product.createManyAndReturn({
    data: [
      {
        name: 'Lâmina de barbear',
        price: 0.5,
        reference: 'REF123',
        supplierId: supplier.id,
        stock: 10,
      },
      {
        name: 'Gola higiênica',
        price: 0.1,
        reference: 'REF123',
        supplierId: supplier.id,
        stock: 10,
      },
    ],
  })

  const servant = await prisma.servant.create({
    data: {
      name: 'Servant 1',
      profitPercent: 10,
      workForcePrice: 20,
      price: ((0.6 + 20) * 10) / 100,
    },
  })

  await prisma.servantProducts.createMany({
    data: [
      {
        productId: products[0].id,
        servantId: servant.id,
      },
      {
        productId: products[1].id,
        servantId: servant.id,
      },
    ],
  })
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
